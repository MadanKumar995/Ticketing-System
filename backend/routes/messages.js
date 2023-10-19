const messageController = require('../controllers/messages');

const express = require('express');

const router = express.Router();

const { v4: uuidv4 } = require('uuid');

let wss;

let openTickets = {};

exports.initWebSocket = (ws) => {
    wss = ws;
    wss.on('connection', (ws) => {

        const clientId = uuidv4();
        ws.clientId = clientId;
        //need to delete clientId from ticket when removed


        console.log('WebSocket connection established ', ws.clientId);

        ws.on('message', async (message) => {
            try {
                // Parse the incoming message
                const msg = message;
                const jsonMessage = JSON.parse(msg);
                const parsedMessage = JSON.parse(jsonMessage);  // here gets the message
                // console.log('inside BE routes: ', jsonMessage);

                // Assuming parsedMessage has structure: { senderId, receiverId, ... }
                if (parsedMessage[0] == 'GetMessages') {
                    const ticketId = parsedMessage[1].ticketId;
                    if (openTickets[ticketId]) {
                        openTickets[ticketId] = openTickets[ticketId].add(ws.clientId);
                    } else {
                        openTickets[ticketId] = new Set([ws.clientId]);
                    }

                    // Fetch messages from the database based on sender and receiver IDs
                    const chatMessages = await messageController.getChatMessages(ticketId);

                    // Send the chat messages to the client
                    ws.send(JSON.stringify(['messages', chatMessages[0]]));
                } else if (parsedMessage[0] == 'GetAgentChats') {
                    const agentId = parsedMessage[1].agentId;
                    // if (openTickets[ticketId]) {
                    //     openTickets[ticketId] = openTickets[ticketId].add(ws.clientId);
                    // } else {
                    //     openTickets[ticketId] = new Set([ws.clientId]);
                    // }
                    const agentChats = await messageController.getAgentChats(agentId);
                    ws.send(JSON.stringify(['GetAgentChats', agentChats[0]]));

                } else if (parsedMessage[0] == 'GetReqChats') {
                    const agentSeverity = parsedMessage[1].agentSeverity;
                    const reqChats = await messageController.getReqChats(agentSeverity, ws);
                    ws.send(JSON.stringify(['GetReqChats', reqChats[0]]));

                } else if (parsedMessage[0] == 'ReqNewChat') {
                    const ticketId = parsedMessage[1].ticketId;
                    const reqChat = await messageController.reqNewChat(ticketId, ws, wss);
                    ws.send(JSON.stringify(['ReqNewChat', reqChat]));
                } else if (parsedMessage[0] == 'GetReceiverIdforUser') {
                    const ticketId = parsedMessage[1].ticketId;
                    const receiverId = await messageController.getReceiverforUser(ticketId);
                    ws.send(JSON.stringify(['GetReceiverIdforUser', receiverId[0]]));
                }

                // console.log('in routes tickets are:\n', openTickets);
            } catch (error) {
                console.error('Error handling WebSocket message:', error);
            }
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed: ', ws.clientId);
        });
    });
};

exports.messageRoute =
    router.post('/createMessage', (req, res) => {
        messageController.createMessage(req, res, wss, openTickets);
    }
    ),
    router.put('/acceptChat', (req, res) => {
        messageController.acceptChat(req, res, wss);
    })
    ;