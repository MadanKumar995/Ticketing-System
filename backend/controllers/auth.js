const User = require('../models/user');

const Agent = require('../models/agent');

const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const name = req.body.userName;
    const email = req.body.userEmail;
    const mobile = req.body.userMobile;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword
        }

        const result = await User.saveUser(userDetails);

        res.status(201).json({ message: 'User Registered' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findUser(req.body.userEmail);

        if (user[0].length !== 1) {
            const error = new Error('Email not Found');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];

        const isEqual = await bcrypt.compare(req.body.password, storedUser.password);

        if (!isEqual) {
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                userDetails: {
                    userId: storedUser.userId,
                    userName: storedUser.userName,
                    userEmail: storedUser.userEmail,
                    accountStatus: storedUser.accountStatus,
                    userMobile: storedUser.userMobile
                }
            },
            'kcpd',
            { expiresIn: '1d' }
        );

        res.status(200).json(
            {
                token: token,
                userDetails: {
                    userId: storedUser.userId,
                    userName: storedUser.userName,
                    userEmail: storedUser.userEmail,
                    accountStatus: storedUser.accountStatus,
                    userMobile: storedUser.userMobile
                }
            });
        // res.status(200).json({ userId: storedUser.userId });
        // res.status(200).json(
        //     { token: token, userId: storedUser.id, userEmail: storedUser.userEmail, userName: storedUser.userName });

    } catch (err) {
        if (!err.statusCode) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(err.statusCode)
                .json({ error: err.statusCode, message: err.message });
        }
        next(err);
    }
}

// exports.authorize = async (req, res, next) => {
//     try {
//         let decodedToken = jwt.verify(token, 'secret');
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         throw err;
//     }
// }

exports.authorize = async (req, res, next) => {
    if (req.agentDetails) {
        res.status(200).json({ agentDetails: req.agentDetails });
    } else {
        res.status(200).json({ userDetails: req.userDetails });
    }
}

// userId: req.userId, userName: req.userName, userEmail: req.userEmail,
// accountStatus: req.accountStatus, userMobile: req.userMobile
// agentId: req.agentId, agentName: req.agentName, agentEmail: req.agentEmail,
// agentMobile: req.agentMobile, agentSeverity: req.agentSeverity, agentStatus: req.agentStatus

exports.agentSignup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const name = req.body.agentName;
    const email = req.body.agentEmail;
    const mobile = req.body.agentMobile;
    const severity = req.body.agentSeverity;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const agentDetails = {
            name: name,
            email: email,
            mobile: mobile,
            severity: severity,
            password: hashedPassword
        }

        const result = await Agent.saveAgent(agentDetails);

        res.status(201).json({ message: 'Agent Registered' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        next(err);
    }
}

exports.agentLogin = async (req, res, next) => {
    try {
        const agent = await Agent.findAgent(req.body.agentEmail);

        if (agent[0].length !== 1) {
            const error = new Error('Email not Found');
            error.statusCode = 401;
            throw error;
        }

        const storedAgent = agent[0][0];

        const isEqual = await bcrypt.compare(req.body.password, storedAgent.password);

        if (!isEqual) {
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                agentDetails: {
                    agentId: storedAgent.agentId,
                    agentName: storedAgent.agentName,
                    agentEmail: storedAgent.agentEmail,
                    agentMobile: storedAgent.agentMobile,
                    agentSeverity: storedAgent.agentSeverity,
                    agentStatus: storedAgent.agentStatus,
                }
            },
            'kcpd',
            { expiresIn: '1h' }
        );

        res.status(200).json(
            {
                token: token,
                agentDetails: {
                    agentId: storedAgent.agentId,
                    agentName: storedAgent.agentName,
                    agentEmail: storedAgent.agentEmail,
                    agentMobile: storedAgent.agentMobile,
                    agentSeverity: storedAgent.agentSeverity,
                    agentStatus: storedAgent.agentStatus,
                }
            });

    } catch (err) {
        if (!err.statusCode) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(err.statusCode)
                .json({ error: err.statusCode, message: err.message });
        }
        next(err);
    }
}
