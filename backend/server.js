const express = require('express');
const cors = require('cors');
const { check } = require('express-validator');
const accountsController = require('./accounts/accounts.controller');

const app = express();

// enable cors
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// register routes
app.post('/accounts/register', [
    check('title', 'Title is required').notEmpty(),
    check('firstName', 'First Name is required').notEmpty(),
    check('lastName', 'Last Name is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 })
], accountsController.register);

app.post('/accounts/verify-email', [
    check('token', 'Token is required').notEmpty()
], accountsController.verifyEmail);

app.post('/accounts/authenticate', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty()
], accountsController.authenticate);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
