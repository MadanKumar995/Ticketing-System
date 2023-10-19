const express = require('express');

const authMiddleware = require('../middleware/auth');

const agentCont = require('../controllers/agent');

const router = express.Router();

router.post('/change-status', authMiddleware, agentCont.changeAgentStatus);

module.exports = router;
