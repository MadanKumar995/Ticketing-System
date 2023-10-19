const db = require('../util/database');

module.exports = class Ticket {
    constructor(id, userId, agentId, ticketType, severity, createdDate, status, openedDate, solvedDate, reqName, reqMobile, email, reason, remark) {
        this.ticketId = id;
        this.userId = userId;
        this.agentId = agentId;
        this.ticketType = ticketType;
        this.severity = severity;
        this.createdDate = createdDate;
        this.ticketStatus = status;
        this.openedDate = openedDate;
        this.solvedDate = solvedDate;
        this.reqName = reqName;
        this.reqMobile = reqMobile;
        this.reqEmail = email;
        this.reason = reason;
        this.remark = remark;
    }

    static findTicket(ticketId) {
        const query = `SELECT * FROM ticketing_system.tickets WHERE ticketId = ${ticketId}`;
        return db.execute(query);
    }

    static createTicket(userId, ticketType, severity, reqName, reqMobile, reason, reqEmail, agentId) {
        let query;
        if (reqEmail) {
            query = `
                INSERT INTO tickets (userId, agentId, ticketType, severity, reqEmail, reason)
                VALUES (?, ?, ?, ?, ?, ?)
            `
            return db.execute(query, [userId, agentId, ticketType, severity, reqEmail, reason]);
        } else {
            query = `
                INSERT INTO tickets (userId, agentId, ticketType, severity, reqName, reqMobile, reason)
                VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
            return db.execute(query, [userId, agentId, ticketType, severity, reqName, reqMobile, reason]);
        }

    }

    static getUserTickets(userId) {
        // return db.execute(
        //     'SELECT (tickets.id, agents.`name`, tickets.ticketType, tickets.createdDate, tickets.`status`, tickets.solvedDate)' +
        //     'FROM tickets LEFT JOIN agents ON tickets.agentId = agents.id WHERE tickets.userId = ? ',
        //     [userId]
        // );
        const query =
            `SELECT
                tickets.ticketId,
                agents.agentName,
                tickets.ticketType,
                tickets.createdDate,
                tickets.openedDate,
                tickets.solvedDate,
                tickets.ticketStatus,
                tickets.solvedDate
            FROM
                ticketing_system.tickets
            LEFT JOIN
                ticketing_system.agents
            ON
                tickets.agentId = agents.agentId
            WHERE
                tickets.userId = ?
            ORDER BY
                tickets.createdDate DESC
            ;`;

        return db.execute(query, [userId]);
    }

    static getAgentTickets(agentId) {
        const query =
            `SELECT
                tickets.ticketId,
                tickets.severity,
                tickets.ticketStatus,
                tickets.createdDate,
                tickets.openedDate,
                tickets.ticketType,
                users.userName
            FROM ticketing_system.tickets
            INNER JOIN ticketing_system.users
            ON tickets.userId = users.userId
            WHERE agentId = ? AND (ticketStatus = 'open' OR ticketStatus = 'in-progress')
            ORDER BY 
                tickets.severity DESC,
                CASE 
                    WHEN tickets.ticketStatus = 'in-progress' THEN 1
                    WHEN tickets.ticketStatus = 'open' THEN 2
                    ELSE 3
                END,
                tickets.createdDate,
                tickets.openedDate;`;
        return db.execute(query, [agentId]);
    }

    static getAgentHistory(agentId) {
        const query =
            `SELECT
                    tickets.ticketId,
                    tickets.severity,
                    tickets.ticketStatus,
                    tickets.createdDate,
                    tickets.openedDate,
                    tickets.solvedDate,
                    tickets.ticketType,
                    users.userName
                FROM ticketing_system.tickets
                INNER JOIN ticketing_system.users
                ON tickets.userId = users.userId
                WHERE agentId = ? AND ticketStatus != 'open' AND ticketStatus != 'in-progress'
                ORDER BY 
                    tickets.createdDate DESC,
                    tickets.severity DESC,
                    tickets.openedDate DESC;`;
        return db.execute(query, [agentId]);
    }

    static getAgentTicket(ticketId) {
        const query = `
        SELECT
                tickets.ticketId,
                tickets.severity,
                tickets.ticketStatus,
                tickets.createdDate,
                tickets.openedDate,
                tickets.ticketType,
                users.userId,
                users.userName,
                users.userMobile,
                users.userEmail,
                users.accountStatus,
                tickets.prevName,
                tickets.prevMobile,
                tickets.reqName,
                tickets.reqEmail,
                tickets.reqMobile,
                tickets.reason,
                tickets.remarks
            FROM ticketing_system.tickets
            INNER JOIN ticketing_system.users
            ON tickets.userId = users.userId
            WHERE ticketId = ?
        `;
        return db.execute(query, [ticketId]);
    }

    static putTicketStatus(status, remarks, ticketId) {

        var query = '';

        if (status == 'in-progress') {
            query = `
                UPDATE ticketing_system.tickets SET ticketStatus = ?, openedDate = CURRENT_TIMESTAMP, remarks = ? WHERE (ticketId = ?);
                `;
        } else if (status == 'solved' || 'rejected') {
            query = `
            UPDATE ticketing_system.tickets SET ticketStatus = ?, solvedDate = CURRENT_TIMESTAMP, remarks = ? WHERE (ticketId = ?);
        `;
        }

        return db.execute(query, [status, remarks, ticketId]);
    }

    static findAgentTicketsCount(ticketSeverity) {
        const nextSev = ticketSeverity + 1;
        const query = `
            SELECT
                a.agentId,
                a.agentSeverity,
                COUNT(t.ticketId) AS ticketCount
            FROM
                (SELECT agentId, agentSeverity FROM ticketing_system.agents
                    WHERE (agentSeverity = ${ticketSeverity} OR agentSeverity = ${nextSev}) AND agentStatus = 'on-duty') a
            LEFT JOIN
                ticketing_system.tickets t ON a.agentId = t.agentId
            GROUP BY
                a.agentId, a.agentSeverity
            ORDER BY
                ticketCount, a.agentSeverity, a.agentId DESC;
        `
        return db.execute(query);
    }

}