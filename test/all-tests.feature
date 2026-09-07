Feature: ทดสอบ API Practice Login System แบบขั้นสูงด้วยฟีเจอร์จัดเต็มของ Karate

  Background:
    # 1. กำหนด Base URL เป็นตัวแปรหลัก
    * url 'http://localhost:3000/api'
  
    # 2. ฟังก์ชันสุ่มข้อมูลเพื่อไม่ให้ข้อมูลซ้ำกันในแต่ละรอบ
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def email1 = 'user_' + randomUUID() + '@example.com'
    * def email2 = 'user_' + randomUUID() + '@example.com'
    * def basePassword = 'password123'
    * def newPassword = 'newPassword456'

    # 3. นิยามโครงสร้างข้อมูล (Schema Validation) ที่คาดหวัง
    * def userSchema = { id: '#number', email: '#string', password: '#string', passwordHash: '#string' }
    * def healthSchema = { status: 'ok', users: '#number', message: '#string', version: '#ignore' }

  Scenario: 1. ทดสอบ Health Check และตรวจสอบ Schema โครงสร้างข้อมูล (Fuzzy Matcher)
    Given path 'health'
    When method get
    Then status 200
    # ตรวจสอบว่ารูปแบบ JSON ตรงตาม healthSchema ที่ตั้งไว้หรือไม่
    And match response == healthSchema
    # พิมพ์ค่าในคอนโซล (Log) เพื่อดูค่าระหว่างรันเทส
    * karate.log('Health Status API:', response)

  Scenario: 2. ทดสอบระบบแบ่งหน้า (Pagination) และการเช็กข้อมูลใน Array (Match Each)
    Given path 'users'
    And param page = 1
    And param limit = 3
    When method get
    Then status 200
    And match response.page == 1
    And match response.limit == 3
    # ตรวจสอบว่าข้อมูลใน array "data" ทุกตัว ต้องมีโครงสร้างตรงตาม userSchema
    And match each response.data == userSchema
    # ตรวจสอบว่า array มีขนาดไม่เกิน 3 ตาม limit
    And assert response.data.length <= 3

  Scenario: 3. ทดสอบจับผิดระบบ (Negative Testing / Error Handling)
    # 3.1 ลองสมัครสมาชิกโดยไม่ส่งข้อมูล (ต้องโดนดัก 400 Bad Request)
    Given path 'auth/register'
    And request {}
    When method post
    Then status 400
    And match response.error == 'Email and password are required'

    # 3.2 ลองล็อกอินด้วยรหัสผิด
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
    And match response.message contains 'User registered'
  
    # --- Step 2: ล็อกอินเพื่อรับ Token ---
    Given path 'auth/login'
    And request { email: '#(email1)', password: '#(basePassword)' }
    When method post
    Then status 200
    # ยืนยันว่าต้องมี Token ส่งกลับมาและห้ามเป็นค่าว่าง
    And match response.token == '#notnull'
    * def token1 = response.token

    # --- Step 3: ตรวจสอบข้อมูลโปรไฟล์ตัวเอง ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + token1
    When method get
    Then status 200
    And match response.email == email1

    # --- Step 4: แก้ไขข้อมูล (เปลี่ยนทั้ง Email และ Password เพื่อแก้ปัญหา JWT Timestamp) ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + token1
    And request { email: '#(email2)', password: '#(newPassword)' }
    When method put
    Then status 200
    And match response.email == email2
    And match response.message == 'Profile updated successfully'

    # --- Step 5: ออกจากระบบ (ยัด token1 ลง Blacklist) ---
    Given path 'auth/logout'
    And header Authorization = 'Bearer ' + token1
    When method post
    Then status 200

    # --- Step 6: ทดสอบความปลอดภัย (นำ Token ที่ Logout แล้วมาใช้ ต้องถูกบล็อก) ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + token1
    When method get
    Then status 401
    And match response.error == 'Token has been revoked'

    # --- Step 7: ล็อกอินด้วยบัญชีที่อัปเดตใหม่ เพื่อเอา Token ล่าสุด ---
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

    # --- Step 9: ยืนยันการลบบัญชี (ต้องล็อกอินไม่ผ่านแล้ว) ---
    Given path 'auth/login'
    And request { email: '#(email2)', password: '#(newPassword)' }
    When method post
    Then status 401