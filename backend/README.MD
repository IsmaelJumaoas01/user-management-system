# User Management System - Backend

## Introduction
A Node.js + MySQL backend API for managing user accounts with features like email sign-up, verification, authentication, role-based authorization, and CRUD operations.

## Team Members & Responsibilities

### Backend Developers
1. **Paul Christian Patiño** - Email Sign-Up, Verification, and Authentication
   - Implement email sign-up functionality
   - Implement email verification process
   - Implement authentication system
   - Branch: `backend-signup-auth`

2. **Arnold Cutad Jr** - Role-Based Authorization, Forgot Password, and CRUD
   - Implement role-based authorization system
   - Implement forgot password functionality
   - Implement reset password functionality
   - Implement CRUD operations for user management
   - Branch: `backend-authorization-crud`

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/user-management-system.git
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the database:
   - Create a MySQL database
   - Update the `config.json` file with your database credentials

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:4000`

## API Endpoints

### Authentication (Developer 1)
- POST `/accounts/register` - Register a new user
- POST `/accounts/verify-email` - Verify user's email
- POST `/accounts/authenticate` - Authenticate user

### Account Management (Developer 2)
- POST `/accounts/forgot-password` - Request password reset
- POST `/accounts/reset-password` - Reset password
- GET `/accounts` - Get all accounts (Admin only)
- GET `/accounts/{id}` - Get account by ID (Admin only)
- PUT `/accounts/{id}` - Update account (Admin only)
- DELETE `/accounts/{id}` - Delete account (Admin only)
