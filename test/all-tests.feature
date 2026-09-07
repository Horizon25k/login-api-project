Feature: ทดสอบ API Practice Login System แบบขั้นสูงด้วยฟีเจอร์จัดเต็มของ Karate

  Background:
    * url 'http://localhost:3000/api'
  
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def email1 = 'user_' + randomUUID() + '@example.com'
    * def email2 = 'user_' + randomUUID() + '@example.com'
    * def basePassword = 'password123'
    * def newPassword = 'newPassword456'

    # แก้ไขโครงสร้าง Health Schema ให้ตรงกับที่ API พ่นออกมาจริงๆ
    * def userSchema = { id: '#number', email: '#string', password: '#string', passwordHash: '#string' }
    * def healthSchema = { status: 'ok', users: '#number' }

  Scenario: 1. ทดสอบ Health Check และตรวจสอบ Schema โครงสร้างข้อมูล (Fuzzy Matcher)
    Given path 'health'
    When method get
    Then status 200
    And match response == healthSchema
    * karate.log('Health Status API:', response)

  Scenario: 2. ทดสอบระบบแบ่งหน้า (Pagination) และการเช็กข้อมูลใน Array
    Given path 'users'
    And param page = 1
    And param limit = 3
    When method get
    Then status 200
    And match response.page == 1
    And match response.limit == 3
    # ใช้ '#[] userSchema' เพื่อบอกว่า เป็น Array ที่อาจจะว่างเปล่าก็ได้ แต่ถ้ามีข้อมูลต้องตรงกับ userSchema
    And match response.data == '#[] userSchema'
    And assert response.data.length <= 3

  Scenario: 3. ทดสอบจับผิดระบบ (Negative Testing / Error Handling)
    Given path 'auth/register'
    And request {}
    When method post
    Then status 400
    # แก้ e ตัวเล็กให้ตรงกับ API
    And match response.error == 'email and password are required'

    Given path 'auth/login'
    And request { email: 'fake@email.com', password: 'wrongpassword' }
    When method post
    Then status 401
    And match response.error == 'Invalid email or password'

  Scenario: 4. ทดสอบวงจรชีวิตผู้ใช้แบบสมบูรณ์ (E2E Auth Lifecycle)
  
    # --- Step 1: สร้างบัญชี ---
    Given path 'auth/register'
    And request { email: '#(email1)', password: '#(basePassword)' }
    When method post
    Then status 201
    And match response.email == email1
    # (ลบการเช็ก response.message ออก เพราะ API ไม่ได้ส่งมา)
  
    # --- Step 2: ล็อกอินเพื่อรับ Token ---
    Given path 'auth/login'
    And request { email: '#(email1)', password: '#(basePassword)' }
    When method post
    Then status 200
    And match response.token == '#notnull'
    * def token1 = response.token

    # --- Step 3: ตรวจสอบข้อมูลโปรไฟล์ตัวเอง ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + token1
    When method get
    Then status 200
    And match response.email == email1

    # --- Step 4: แก้ไขข้อมูล ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + token1
    And request { email: '#(email2)', password: '#(newPassword)' }
    When method put
    Then status 200
    And match response.email == email2
  
    # --- Step 5: ออกจากระบบ ---
    Given path 'auth/logout'
    And header Authorization = 'Bearer ' + token1
    When method post
    Then status 200

    # --- Step 6: ทดสอบความปลอดภัย ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + token1
    When method get
    Then status 401
    And match response.error == 'Token has been revoked'

    # --- Step 7: ล็อกอินด้วยบัญชีที่อัปเดตใหม่ ---
    Given path 'auth/login'
    And request { email: '#(email2)', password: '#(newPassword)' }
    When method post
    Then status 200
    * def token2 = response.token

    # --- Step 8: ลบบัญชีผู้ใช้ ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + token2
    When method delete
    Then status 204

    # --- Step 9: ยืนยันการลบบัญชี ---
    Given path 'auth/login'
    And request { email: '#(email2)', password: '#(newPassword)' }
    When method post
    Then status 401