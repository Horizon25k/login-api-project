Feature: ทดสอบ API ตามฟังก์ชันการทำงานพื้นฐาน 

  Background:
    * url 'http://localhost:3000/api'

    @CreateProfile
  Scenario: CreateProfile
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def generatedEmail = 'test_' + randomUUID() + '@example.com'
    * def generatedPassword = 'password123'
  
    Given path 'auth/register'
    And request { email: '#(generatedEmail)', password: '#(generatedPassword)' }
    When method post
    Then status 201
    And match response.email == generatedEmail

    @LoginProfile
  Scenario: LoginProfile
    # เรียกใช้งานผ่าน Tag @CreateProfile
    * def setup = call read('all-tests.feature@CreateProfile')
    * def loginEmail = setup.generatedEmail
    * def loginPassword = setup.generatedPassword

    Given path 'auth/login'
    And request { email: '#(loginEmail)', password: '#(loginPassword)' }
    When method post
    Then status 200
    And match response.token == '#notnull'
    * def authToken = response.token
    * def activeEmail = loginEmail

    @CheckProfile
  Scenario: CheckProfile
    * def auth = call read('all-tests.feature@LoginProfile')

    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + auth.authToken
    When method get
    Then status 200
    And match response.email == auth.activeEmail

    @UpdateProfile
  Scenario: UpdateProfile
    * def auth = call read('all-tests.feature@LoginProfile')
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def newEmail = 'updated_' + randomUUID() + '@example.com'

    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + auth.authToken
    And request { email: '#(newEmail)', password: 'newPassword456' }
    When method put
    Then status 200
    And match response.email == newEmail

    @DeleteProfile
  Scenario: DeleteProfile
    * def auth = call read('all-tests.feature@LoginProfile')

    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + auth.authToken
    When method delete
    Then status 204

    @Logout
  Scenario: Logout
    * def auth = call read('all-tests.feature@LoginProfile')

    Given path 'auth/logout'
    And header Authorization = 'Bearer ' + auth.authToken
    When method post
    Then status 200

    @GetUsers
  Scenario: GetUsers
    Given path 'users'
    And param page = 1
    And param limit = 10
    When method get
    Then status 200
    And match response.data == '#array'