Feature: Performance Login Test

Background:
  * url 'http://localhost:3000/api'
  * def randomString = function(s) { var text = ""; var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; for (var i = 0; i < s; i++) text += pattern.charAt(Math.floor(Math.random() * pattern.length())); return text; }
  * def userEmail = randomString(10) + '@example.com'
  * def userPass = 'Password123!'

Scenario: Register, Login and Cleanup Performance
  # 1. Register a new user
  Given path 'auth/register'
  And request { email: '#(userEmail)', password: '#(userPass)' }
  When method post
  Then status 201

  # 2. Login with the same user
  Given path 'auth/login'
  And request { email: '#(userEmail)', password: '#(userPass)' }
  When method post
  Then status 200
  * def authToken = response.token

  # 3. Delete user account (Cleanup)
  Given path 'auth/profile'
  And header Authorization = 'Bearer ' + authToken
  When method delete
  Then status 204


