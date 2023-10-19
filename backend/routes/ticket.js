const express = require('express');

const authMiddleware = require('../middleware/auth');

const ticketController = require('../controllers/ticket');

const router = express.Router();

router.post('/create-ticket', authMiddleware, ticketController.createTicketCont);

router.get('/getUserTickets/', authMiddleware, ticketController.getUserTicketsCont);

router.get('/getAgentTickets/:agentId', ticketController.getAgentTicketsCont);

router.get('/getAgentTickets/history/:agentId', ticketController.getAgentHistoryCont);

router.get('/getAgentTickets/ticket/:ticketId', ticketController.getAgentTicketCont);

router.put('/agent/update', ticketController.updateProfilecont);

router.put('/agent/changeAccStatus', ticketController.changeAccStatuscont);

router.put('/agent/update/ticket-status', ticketController.putTicketStatuscont);

module.exports = router;
