const Agent = require('../models/agent')


exports.changeAgentStatus = async (req, res, next) => {
    try {
        if (req.body.type == 'changeAgentStatus') {
            const [allUserTickets] = await Agent.changeAgentStatus(req.agentDetails.agentId, req.body.agentStatus);
            res.status(200).json(allUserTickets);
        } else {
            res.status(200).json('Not changed');
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while getting user tickets err.code: " + err.statusCode);
        next(err);
    }
}