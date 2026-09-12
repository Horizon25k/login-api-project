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

    # Cleanup: Login and Delete
    Given path 'auth/login'
    And request { email: '#(generatedEmail)', password: '#(generatedPassword)' }
    When method post
    Then status 200
    * def token = response.token

    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + token
    When method delete
    Then status 204

  @LoginProfile
  Scenario: LoginProfile
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def loginEmail = 'test_' + randomUUID() + '@example.com'
    * def loginPassword = 'password123'

    Given path 'auth/register'
    And request { email: '#(loginEmail)', password: '#(loginPassword)' }
    When method post
    Then status 201

    Given path 'auth/login'
    And request { email: '#(loginEmail)', password: '#(loginPassword)' }
    When method post
    Then status 200
    And match response.token == '#notnull'
    * def authToken = response.token

    # Cleanup: Delete profile
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + authToken
    When method delete
    Then status 204

  @CheckProfile
  Scenario: CheckProfile
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def email = 'test_' + randomUUID() + '@example.com'
    * def password = 'password123'

    Given path 'auth/register'
    And request { email: '#(email)', password: '#(password)' }
    When method post
    Then status 201

    Given path 'auth/login'
    And request { email: '#(email)', password: '#(password)' }
    When method post
    Then status 200
    * def authToken = response.token

    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + authToken
    When method get
    Then status 200
    And match response.email == email

    # Cleanup: Delete profile
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + authToken
    When method delete
    Then status 204

  @UpdateProfile
  Scenario: UpdateProfile
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def email = 'test_' + randomUUID() + '@example.com'
    * def password = 'password123'

    Given path 'auth/register'
    And request { email: '#(email)', password: '#(password)' }
    When method post
    Then status 201

    Given path 'auth/login'
    And request { email: '#(email)', password: '#(password)' }
    When method post
    Then status 200
    * def authToken = response.token

    * def newEmail = 'updated_' + randomUUID() + '@example.com'
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + authToken
    And request { email: '#(newEmail)', password: 'newPassword456' }
    When method put
    Then status 200
    And match response.email == newEmail

    # Cleanup: Delete profile
    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + authToken
    When method delete
    Then status 204

  @DeleteProfile
  Scenario: DeleteProfile
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def email = 'test_' + randomUUID() + '@example.com'
    * def password = 'password123'

    Given path 'auth/register'
    And request { email: '#(email)', password: '#(password)' }
    When method post
    Then status 201

    Given path 'auth/login'
    And request { email: '#(email)', password: '#(password)' }
    When method post
    Then status 200
    * def authToken = response.token

    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + authToken
    When method delete
    Then status 204

  @Logout
  Scenario: Logout
    * def randomUUID = function(){ return java.util.UUID.randomUUID().toString() }
    * def email = 'test_' + randomUUID() + '@example.com'
    * def password = 'password123'

    Given path 'auth/register'
    And request { email: '#(email)', password: '#(password)' }
    When method post
    Then status 201

    Given path 'auth/login'
    And request { email: email, password: password }
    When method post
    Then status 200
    * def authToken = response.token

    Given path 'auth/logout'
    And header Authorization = 'Bearer ' + authToken
    When method post
    Then status 200

    # Cleanup: Re-login to get fresh token and delete profile
    Given path 'auth/login'
    And request { email: '#(email)', password: '#(password)' }
    When method post
    Then status 200
    * def freshToken = response.token

    Given path 'auth/profile'
    And header Authorization = 'Bearer ' + freshToken
    When method delete
    Then status 204

  @GetUsers
  Scenario: GetUsers
    Given path 'users'
    And param page = 1
    And param limit = 10
    When method get
    Then status 200
    And match response.data == '#array'

