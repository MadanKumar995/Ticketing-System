const db = require('../util/database');

module.exports = class Chat {
    constructor(id, ticketId, agentId, status) {
        this.chatId = id;
        this.ticketId = ticketId;
        this.agentId = agentId;
        this.status = status;
    }

    static getAgentChats(agentId) {
        const query = `
        SELECT c.ticketId,
            u.userId,
            u.userName,
            m.sender,
            m.receiver,
            m.message,
            m.time
            FROM (SELECT ticketId, agentId, status FROM ticketing_system.chats WHERE agentId = ${agentId} AND status = 'open') c
        JOIN
            ticketing_system.tickets t ON c.ticketId = t.ticketId
        JOIN
            ticketing_system.users u ON t.userId = u.userId
        LEFT JOIN
            (
            WITH RankedRecords AS (
            SELECT 
                sender, receiver, message,time,ticketId,
                ROW_NUMBER() OVER (PARTITION BY ticketId ORDER BY time DESC) AS rn
            FROM ticketing_system.messages
            )
            SELECT * FROM RankedRecords
                WHERE rn = 1
                ORDER BY time DESC) m ON c.ticketId = m.ticketId
        `;

        return db.execute(query);
    }

    static getReqChats(severity) {
        const sev = severity - 1;
        const query = `
        WITH Outputs AS
            (SELECT C.ticketId, T.ticketStatus,T.severity, T.createdDate, U.userName, A.agentSeverity,
            ROW_NUMBER() OVER (PARTITION BY C.ticketId ) AS rn
            FROM ticketing_system.chats C
            INNER JOIN ticketing_system.tickets T
            ON C.ticketId = T.ticketId
            INNER JOIN ticketing_system.users U
            ON T.userId = U.userId
            INNER JOIN ticketing_system.agents A
            ON  A.agentSeverity >= T.severity
            WHERE C.status = 'na' AND (T.severity = ${severity} OR T.severity = ${sev}))

            SELECT * FROM Outputs
            WHERE rn = 1
            ORDER BY severity DESC,
                     createdDate, ticketStatus
        `;
        return db.execute(query);
    }
    static acceptChat(agentId, chatId) {
        const query = `
            UPDATE ticketing_system.chats SET agentId = ${agentId}, status = 'open' WHERE (chatId = ${chatId});
        `;
        return db.execute(query);
    }

    static getChatIdFromTicketId(ticketId) {
        const query = `
            SELECT chatId FROM ticketing_system.chats WHERE (ticketId = ${ticketId} AND status = 'na')
        `;
        return db.execute(query);
    }

    static findChat(ticketId) {
        const query = `SELECT * FROM ticketing_system.chats WHERE ticketId = ${ticketId}`
        return db.execute(query);
    }

    static insertNewChat(ticketId) {
        const query = `
            INSERT INTO ticketing_system.chats (ticketId) VALUES (${ticketId});
        `;
        return db.execute(query);
    }

    static getReceiverforUser(ticketId) {
        const query = `
            SELECT * FROM ticketing_system.chats WHERE ticketId = ${ticketId} AND status = 'open';
        `;
        return db.execute(query);
    }

}