const User = require('../models/user');

const Agent = require('../models/agent');

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        // const error = new Error('Not authenticated');
        // error.statusCode = 401;
        // throw error;
        return 'Not authenticated';
    }
    const token = authHeader.split(' ')[1]; //authHeader is 'Bearer ijoihoujnu'
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'kcpd');

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        return err;
    }
    if (!decodedToken) {
        // const error = new Error('Not authenticated');
        // error.statusCode = 401;
        // throw error;
        return 'Not authenticated';
    }
    // console.log(decodedToken);
    req.isLoggedIn = true;
    if (decodedToken.userDetails) {

        const user = await User.findUser(decodedToken.userDetails.userEmail);
        const storedUser = user[0][0];

        decodedToken.userDetails.userId = storedUser.userId;
        decodedToken.userDetails.userName = storedUser.userName;
        decodedToken.userDetails.userEmail = storedUser.userEmail;
        decodedToken.userDetails.accountStatus = storedUser.accountStatus;
        decodedToken.userDetails.userMobile = storedUser.userMobile;

        req.userDetails = decodedToken.userDetails;


        // req.userId = decodedToken.userId;
        // req.userName = decodedToken.userName;
        // req.userEmail = decodedToken.userEmail;
        // req.accountStatus = decodedToken.accountStatus;
        // req.userMobile = decodedToken.userMobile;

    } else if (decodedToken.agentDetails) {

        const agent = await Agent.findAgent(decodedToken.agentDetails.agentEmail);
        const storedAgent = agent[0][0];

        decodedToken.agentDetails.agentId = storedAgent.agentId;
        decodedToken.agentDetails.agentName = storedAgent.agentName;
        decodedToken.agentDetails.agentEmail = storedAgent.agentEmail;
        decodedToken.agentDetails.agentMobile = storedAgent.agentMobile;
        decodedToken.agentDetails.agentSeverity = storedAgent.agentSeverity;
        decodedToken.agentDetails.agentStatus = storedAgent.agentStatus;

        req.agentDetails = decodedToken.agentDetails;

        // req.agentId = decodedToken.agentId;
        // req.agentName = decodedToken.agentName;
        // req.agentEmail = decodedToken.agentEmail;
        // req.agentMobile = decodedToken.agentMobile;
        // req.agentSeverity = decodedToken.agentSeverity;
        // req.agentStatus = decodedToken.agentStatus;

    }

    next();
}