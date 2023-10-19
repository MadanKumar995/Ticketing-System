const db = require('../util/database');

module.exports = class User {
    constructor(userId, userName, userEmail, accountStatus, userMobile, password) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.accountStatus = accountStatus;
        this.userMobile = userMobile;
        this.password = password;
    }

    static findUser(email) {
        return db.execute(
            'SELECT * FROM users WHERE userEmail = ?', [email]
        );
    }

    static saveUser(user) {
        return db.execute(
            'INSERT INTO users (userName, userEmail, userMobile, password) VALUES (?, ?, ?, ?)',
            [user.name, user.email, user.mobile, user.password]
        );
    }

    static putUserProfile(userId, userName, userMobile) {
        const query = `
            UPDATE ticketing_system.users SET userName = ?, userMobile = ? WHERE (userId = ?);
        `;
        return db.execute(query, [userName, userMobile, userId]);
    }

    static changeAccountStatus(status, userId) {
        const query = `
            UPDATE ticketing_system.users SET accountStatus = ? WHERE userId = ?;
        `;
        return db.execute(query, [status, userId]);
    }
}