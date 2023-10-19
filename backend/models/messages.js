const db = require('../util/database');

module.exports = class Message {
    constructor(id, msg, senderId, receiverId, time) {
        this.messageId = id;
        this.message = msg;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.time = time;
    }

    static saveMessage(messageData) {
        const { ticketId, sender, receiver, message } = messageData;
        const query = `
        INSERT INTO ticketing_system.messages (ticketId, sender, receiver, message) VALUES (?, ?, ?, ?)`;
        return db.execute(query, [ticketId, sender, receiver, message]);
    }
    static getMessages(ticketId) {
        const query = `
            SELECT * FROM ticketing_system.messages
            WHERE ticketId = ${ticketId}
            ORDER BY time ASC,
                    msgId ASC
            ;
        `
        return db.execute(query);
    }
};
