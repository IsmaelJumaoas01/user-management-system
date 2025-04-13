# User Management System - Functional Testing Results

## Test Environment
- Frontend: Angular 10
- Backend: Node.js + MySQL
- Testing Tools: Manual Testing, Postman/Thunder Client
- Test Branch: tester-functional-testing

## Test Cases and Results

### 1. User Registration Flow
![Registration Form](https://raw.githubusercontent.com/IsmaelJumaoas01/user-management-system/tester-functional-testing/docs/registration.png)

#### Test Case 1.1: New User Registration
- **Steps**:
  1. Navigate to registration page
  2. Fill in required fields (title, name, email, password)
  3. Submit registration form
- **Expected Result**: 
  - Verification email sent
  - User created in database
  ![Email Verification Process](https://raw.githubusercontent.com/IsmaelJumaoas01/user-management-system/tester-functional-testing/docs/email-verification.png)
- **Actual Result**: ✅ PASS
  - User successfully registered
  - Verification email received via Ethereal
  - User record created in database
  ![User Created in Database](https://raw.githubusercontent.com/IsmaelJumaoas01/user-management-system/tester-functional-testing/docs/user-createrd-db.png)
  

#### Test Case 1.2: Duplicate Email Registration
- **Steps**:
  1. Attempt to register with existing email
- **Expected Result**: 
  - Error message displayed
  - No new user created
- **Actual Result**: ✅ PASS
  - "Email already exists" error displayed
  - No duplicate user created

### 2. Email Verification Flow
![Email Verification Process](https://raw.githubusercontent.com/IsmaelJumaoas01/user-management-system/tester-functional-testing/docs/email-verification.png)

#### Test Case 2.1: Email Verification
- **Steps**:
  1. Open verification email
  2. Click verification link or enter code
- **Expected Result**: 
  - Account verified
  - Status updated in database
- **Actual Result**: ✅ PASS
  - Account status changed to verified
  - User can now log in

### 3. Authentication Flow
![Login Interface](https://raw.githubusercontent.com/IsmaelJumaoas01/user-management-system/tester-functional-testing/docs/login-interface.png)

#### Test Case 3.1: Successful Login
- **Steps**:
  1. Enter valid credentials
  2. Submit login form
- **Expected Result**: 
  - Successful login
  - Redirect to home page
  - JWT token stored
- **Actual Result**: ✅ PASS
  - User successfully logged in
  - Proper redirection
  - Token stored in localStorage
  ![Login Interface](https://raw.githubusercontent.com/IsmaelJumaoas01/user-management-system/tester-functional-testing/docs/home-page)

#### Test Case 3.2: Invalid Login
- **Steps**:
  1. Enter invalid credentials
- **Expected Result**: 
  - Error message displayed
  - No login
- **Actual Result**: ✅ PASS
  - "Invalid credentials" error displayed
  - No unauthorized access

### 4. Profile Management
#### Test Case 4.1: Update Profile Information
- **Steps**:
  1. Navigate to profile page
  2. Update personal information
  3. Save changes
- **Expected Result**: 
  - Information updated
  - Success message displayed
- **Actual Result**: ✅ PASS
  - All fields updated successfully
  - Changes persisted in database

#### Test Case 4.2: Change Password
- **Steps**:
  1. Navigate to profile update
  2. Enter new password
  3. Confirm password
  4. Save changes
- **Expected Result**: 
  - Password updated
  - Can login with new password
- **Actual Result**: ✅ PASS
  - Password successfully changed
  - New password works for login

### 5. Admin Dashboard
#### Test Case 5.1: View All Users
- **Steps**:
  1. Log in as admin
  2. Navigate to users page
- **Expected Result**: 
  - All users displayed
  - Proper pagination
- **Actual Result**: ✅ PASS
  - All users visible
  - Table displays correctly

#### Test Case 5.2: Edit User (Admin)
- **Steps**:
  1. Click edit on a user
  2. Update user information
  3. Save changes
- **Expected Result**: 
  - User information updated
  - Success message displayed
- **Actual Result**: ✅ PASS
  - All fields editable
  - Changes saved successfully

#### Test Case 5.3: Delete User
- **Steps**:
  1. Click delete on a user
  2. Confirm deletion
- **Expected Result**: 
  - User deleted
  - Removed from list
- **Actual Result**: ✅ PASS
  - User successfully deleted
  - Removed from database

### 6. Authorization
#### Test Case 6.1: Unauthorized Access
- **Steps**:
  1. Try to access admin pages as regular user
- **Expected Result**: 
  - Access denied
  - Redirect to home
- **Actual Result**: ✅ PASS
  - Proper authorization checks
  - No unauthorized access

## Issues Found
1. None - All test cases passed successfully

## Recommendations
1. Consider adding more comprehensive error messages
2. Add loading indicators for all async operations
3. Implement automated testing for future releases

## Test Coverage
- Registration: 100%
- Authentication: 100%
- Profile Management: 100%
- Admin Functions: 100%
- Authorization: 100%

## Testers
- Ismael Jose Jumao-as && Prince Dominic Lazaga
