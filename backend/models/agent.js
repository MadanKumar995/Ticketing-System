const db = require('../util/database');

module.exports = class Agent {
    constructor(agentId, agentName, agentMail, agentMobile, agentSeverity, agentStatus, password) {
        this.agentId = agentId;
        this.agentName = agentName;
        this.agentMail = agentMail;
        this.agentMobile = agentMobile;
        this.agentSeverity = agentSeverity;
        this.agentStatus = agentStatus;
        this.password = password;
    }

    static findAgent(email) {
        return db.execute(
            'SELECT * FROM agents WHERE agentEmail = ?', [email]
        );
    }

    static saveAgent(agent) {
        return db.execute(
            'INSERT INTO agents (agentName, agentEmail, agentMobile, agentSeverity, password) VALUES (?, ?, ?, ?, ?)',
            [agent.name, agent.email, agent.mobile, agent.severity, agent.password]
        );
    }

    static changeAgentStatus(agentId, agentStatus) {
        const query = `
            UPDATE ticketing_system.agents SET agentStatus = '${agentStatus}' WHERE (agentId = ${agentId});
        `;
        return db.execute(query);
    }

}