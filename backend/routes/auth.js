const express = require('express');

const { body } = require('express-validator');

const authController = require('../controllers/auth');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

const User = require('../models/user');

const Agent = require('../models/agent');

router.post(
    '/signup',
    [
        body('userName').trim().not().isEmpty().withMessage('Enter a valid Name'),
        body('userEmail')
            // .isEmail()
            // .withMessage('Please enter valid email')
            .custom(async (email) => {
                const finduser = await User.findUser(email);
                if (finduser[0].length > 0) {
                    return Promise.reject('Email already exists');
                }
            })
            .normalizeEmail()
    ],
    authController.signup
);

router.post('/login', authController.login);

router.post('/authorize', authMiddleware, authController.authorize);

router.post(
    '/signup/agent',
    [
        body('agentName').trim().not().isEmpty().withMessage('Enter a valid Name'),
        body('agentEmail')
            // .isEmail()
            // .withMessage('Please enter valid email')
            .custom(async (email) => {
                const findAgent = await Agent.findAgent(email);
                if (findAgent[0].length > 0) {
                    return Promise.reject('Email already exists');
                }
            })
            .normalizeEmail()
    ],
    authController.agentSignup
);

router.post('/login/agent', authController.agentLogin);

module.exports = router;