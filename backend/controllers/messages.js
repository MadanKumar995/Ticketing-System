const Messages = require('../models/messages');
const Chats = require('../models/chats');
const Ticket = require('../models/ticket');

let wss;
let reqChatSeverity = {};
let userReqNewChat = {};

exports.getChatMessages = async (ticketId) => {
    try {
        // Fetch chat messages from the database based on sender and receiver IDs
        const chatMessages = await Messages.getMessages(ticketId);

        return chatMessages;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        console.error('Error fetching chat messages:', error);
        throw error;
    }
};

exports.getAgentChats = async (agentId) => {
    try {
        // Fetch chat messages from the database based on sender and receiver IDs
        const agentChats = await Chats.getAgentChats(agentId);

        return agentChats;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        console.error('Error fetching chat messages:', error);
        throw error;
    }
};

exports.getReqChats = async (agentSeverity, ws) => {

    wss = ws;

    try {
        // Fetch chat messages from the database based on sender and receiver IDs
        const reqChats = await Chats.getReqChats(agentSeverity);

        if (reqChatSeverity[agentSeverity]) {
            reqChatSeverity[agentSeverity] = reqChatSeverity[agentSeverity].add(wss.clientId);
        } else {
            reqChatSeverity[agentSeverity] = new Set([wss.clientId]);
        }

        return reqChats;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        console.error('Error fetching chat messages:', error);
        throw error;
    }
};

exports.reqNewChat = async (ticketId, ws, wss) => {
    wss = wss
    try {
        const searchChat = await Chats.findChat(ticketId);
        if (userReqNewChat[ticketId]) {
            userReqNewChat[ticketId] = userReqNewChat[ticketId].add(ws.clientId);
        } else {
            userReqNewChat[ticketId] = new Set([ws.clientId]);
        }
        if (searchChat[0].length > 0) {
            desiredRow = searchChat[0].find((item) => item.status == 'open' || 'na');
            if (desiredRow.status == 'open') {
                return { 'status': 'open' }
            } else if (desiredRow.status == 'na') {
                return { 'status': 'na' }
            }
        }
        await Chats.insertNewChat(ticketId);
        const ticketDetails = await Ticket.findTicket(ticketId);
        const ticketSeverity = ticketDetails[0][0].severity;
        if (reqChatSeverity[ticketSeverity]) {

            wss.clients.forEach(async (client) => {
                if (client.readyState == 1 && reqChatSeverity[ticketSeverity].has(client.clientId)) {
                    const reqChats = await Chats.getReqChats(ticketSeverity);
                    wss.send(JSON.stringify(['GetReqChats', reqChats[0]]));
                }
            })
        };
        if (reqChatSeverity[ticketSeverity + 1]) {

            wss.clients.forEach(async (client) => {
                if (client.readyState == 1 && reqChatSeverity[ticketSeverity + 1].has(client.clientId)) {
                    const reqChats = await Chats.getReqChats(ticketSeverity + 1);
                    client.send(JSON.stringify(['GetReqChats', reqChats[0]]));
                }
            })
        };
        return { 'status': 'na' }
        // return searchChat
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        console.error('Error fetching chat messages:', error);
        throw error;
    }
}

exports.createMessage = async (req, res, ws, openTickets) => {

    wss = ws;
    const ticketId = req.body.ticketId;
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const message = req.body.message;

    try {
        const savedMessage = await Messages.saveMessage({ ticketId, sender, receiver, message });

        // Notify connected clients about the new message via WebSocket
        if (wss) {
            // console.log('inside wss : ', wss.OPEN);


            // console.log('inside contro : ', openTickets[ticketId]);
            // var test = '';
            // for (const key of openTickets[ticketId]) {
            //     console.log(key);
            //     test = key;
            // }
            // console.log('down contro : ', test, openTickets[ticketId].has(test));


            wss.clients.forEach(async (client) => {
                if (client.readyState == 1 && openTickets[ticketId].has(client.clientId)) {
                    const msgs = await Messages.getMessages(ticketId)
                    client.send(JSON.stringify(['messages', msgs[0]]));

                }
            });

            // for (const client of openTickets[ticketId]) {
            //     if (client.readyState == 1) {
            //         const msgs = await Messages.getMessages(ticketId)
            //         client.send(JSON.stringify(msgs[0]));
            //     }
            // }

        }

        res.status(201).json(savedMessage);

    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.acceptChat = async (req, res, ws) => {

    wss = ws;
    const agentId = req.body.agentId;
    const ticketId = req.body.ticketId;
    const agentSeverity = req.body.agentSeverity;
    const severity = req.body.severity;

    try {
        const getChatId = await Chats.getChatIdFromTicketId(ticketId);
        const acceptChat = await Chats.acceptChat(agentId, getChatId[0][0].chatId);

        // Notify connected clients about the new message via WebSocket
        if (wss) {

            wss.clients.forEach(async (client) => {
                if (client.readyState == 1) {

                    if (reqChatSeverity[severity]) {
                        if (reqChatSeverity[severity].has(client.clientId)) {
                            const reqChats = await Chats.getReqChats(severity)
                            client.send(JSON.stringify(['GetReqChats', reqChats[0]]));
                            // await Messages.saveMessage({ ticketId, sender: 'na', receiver: 'na', message: 'na' });
                        }
                    }

                    if (reqChatSeverity[severity + 1]) {
                        if (reqChatSeverity[severity + 1]?.has(client.clientId)) {
                            const reqChats = await Chats.getReqChats(severity + 1)
                            client.send(JSON.stringify(['GetReqChats', reqChats[0]]));
                            // await Messages.saveMessage({ ticketId, sender: 'na', receiver: 'na', message: 'na' });
                        }
                    }

                    if (reqChatSeverity[severity - 1]) {
                        if (reqChatSeverity[severity - 1]?.has(client.clientId)) {
                            const reqChats = await Chats.getReqChats(severity - 1);
                            client.send(JSON.stringify(['GetReqChats', reqChats[0]]));
                            // await Messages.saveMessage({ ticketId, sender: 'na', receiver: 'na', message: 'na' });
                        }
                    }

                }
                if (client.readyState == 1) {
                    if (userReqNewChat[ticketId]) {
                        if (userReqNewChat[ticketId].has(client.clientId)) {
                            client.send(JSON.stringify(['ReqNewChat', { 'status': 'open' }]));
                        }
                    }
                }
            });

        }

        res.status(200).json(acceptChat);

    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getReceiverforUser = async (ticketId) => {
    try {
        // Fetch chat messages from the database based on sender and receiver IDs
        const receiverId = await Chats.getReceiverforUser(ticketId);

        return receiverId;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        console.error('Error fetching chat messages:', error);
        throw error;
    }
};
