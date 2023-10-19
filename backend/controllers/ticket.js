const User = require('../models/user');
const Ticket = require('../models/ticket');

exports.createTicketCont = async (req, res, next) => {
    try {
        // const query = req.body;

        const ticketsCount = await Ticket.findAgentTicketsCount(req.body.severity);
        // console.log('inside cont riase: ', ticketsCount[0][0].agentId);
        let agentId = ticketsCount[0][0].agentId;
        if (!agentId) {
            agentId = null;
        }

        const createTicketResponse = await Ticket.createTicket
            (req.userDetails.userId, req.body.ticketType, req.body.severity,
                req.body.reqName, req.body.reqMobile, req.body.reason, req.body.reqEmail, agentId,
                req.userDetails.userName, req.userDetails.userMobile);
        res.status(201).json(createTicketResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while creating ticket err.code: " + err.statusCode);
        next(err);
    }
}

exports.getUserTicketsCont = async (req, res, next) => {
    try {
        const [allUserTickets] = await Ticket.getUserTickets(req.userDetails.userId);
        res.status(200).json(allUserTickets);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while getting user tickets err.code: " + err.statusCode);
        next(err);
    }
}

exports.getAgentTicketsCont = async (req, res, next) => {
    try {
        const [agentTickets] = await Ticket.getAgentTickets(req.params.agentId);
        res.status(200).json(agentTickets);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while getting agent tickets err.code: " + err.statusCode);
        next(err);
    }
}

exports.getAgentHistoryCont = async (req, res, next) => {
    try {
        const [agentHistory] = await Ticket.getAgentHistory(req.params.agentId);
        res.status(200).json(agentHistory);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while getting agent history tickets err.code: " + err.statusCode);
        next(err);
    }
}

exports.getAgentTicketCont = async (req, res, next) => {
    try {
        const [agentTicket] = await Ticket.getAgentTicket(req.params.ticketId);
        res.status(200).json(agentTicket);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while getting ticket for agent err.code: " + err.statusCode);
        next(err);
    }
}

exports.updateProfilecont = async (req, res, next) => {
    try {
        const putResponse = await User.putUserProfile(req.body.userId, req.body.userName, req.body.userMobile);
        res.status(200).json(putResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while updating ticket err.code: " + err.statusCode);
        next(err);
    }
}

exports.changeAccStatuscont = async (req, res, next) => {
    try {
        const putResponse = await User.changeAccountStatus(req.body.status, req.body.userId);
        res.status(200).json(putResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while updating ticket err.code: " + err.statusCode);
        next(err);
    }
}

exports.putTicketStatuscont = async (req, res, next) => {
    try {
        const putResponse = await Ticket.putTicketStatus(req.body.status, req.body.remarks, req.body.ticketId);
        res.status(200).json(putResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("error while updating ticket err.code: " + err.statusCode);
        next(err);
    }
}
