const db = require('../conexao/db');

const User = {

    getAllUsers: (callback) => {
        const sql = 'SELECT * FROM users';
        db.query(sql, (err, results) => {
            if (err) throw err;
            callback(results);
        });
    },

    getAllUserstoPDF: () => {
        const sql = 'SELECT * FROM users';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
};
module.exports = User; 