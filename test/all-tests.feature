Feature: ทดสอบ API ระบบ Practice Login System แบบครบวงจร (Full E2E)

  Background:
    # กำหนด Base URL
    * url 'http://localhost:3000/api'
  
    # ใช้ UUID สร้างค่าสุ่มเพื่อป้องกันอีเมลซ้ำในการรันเทสแต่ละรอบ
    * def randomString = java.util.UUID.randomUUID().toString()
    * def testEmail = 'user_' + randomString + '@example.com'
    * def initialPassword = 'password123'
    * def updatedPassword = 'newpassword456'

  Scenario: 1. ทดสอบ API พื้นฐานที่ไม่ต้องการการเข้าสู่ระบบ (Public Endpoints)
  
    # 1.1 ตรวจสอบสถานะเซิร์ฟเวอร์ (Health Check)
    Given path 'health'
    When method get
    Then status 200
    And match response.status == 'ok'

    # 1.2 เรียกดูรายชื่อผู้ใช้ทั้งหมด (Get Users)
    Given path 'users'
    And param page = 1
    And param limit = 5
    When method get
    Then status 200
    And match response.data == '#array'
    And match response.page == 1

  Scenario: 2. ทดสอบวงจรผู้ใช้ตั้งแต่สร้างจนถึงลบบัญชี
  
    Given path 'auth/register'
    And request { email: '#(testEmail)', password: '#(initialPassword)' }
    When method post
    Then status 201

    # --- (Login) ---
    Given path 'auth/login'
    And request { email: '#(testEmail)', password: '#(initialPassword)' }
    When method post
    Then status 200
    * def firstToken = response.token

    # --- (Get Profile) ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + firstToken
    When method get
    Then status 200

    # --- (Update Profile) ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + firstToken
    * def updatedEmail = 'new_' + testEmail 
    And request { email: '#(updatedEmail)', password: '#(updatedPassword)' }
    When method put
    Then status 200

    # --- (Logout Token 1) ---
    Given path 'auth/logout'
    And header Authorization = 'Bearer ' + firstToken
    When method post
    Then status 401

    # ---(Login 2) ---
    Given path 'auth/login'
    And request { email: '#(updatedEmail)', password: '#(updatedPassword)' }
    When method post
    Then status 200
    * def secondToken = response.token

    # --- (Delete Profile) ---
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + secondToken
    When method delete
    Then status 204

    # --- ตรวจสอบว่าบัญชีถูกลบไปแล้วจริงๆ ---
    Given path 'auth/login'
    And request { email: '#(updatedEmail)', password: '#(updatedPassword)' }
    When method post
    Then status 401