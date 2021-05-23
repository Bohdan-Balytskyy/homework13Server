const bcryptjs = require('bcryptjs')
const mysqlConnection = require('../../../index');

class User {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }
    static create(newUser, result) {
        let salt = bcryptjs.genSaltSync(10);
        let password = newUser.password;
        mysqlConnection.query("INSERT INTO users set name=?,email=?,password=?,created_at =NOW(),updated_at='0000-00-00'",
            [newUser.name, newUser.email, bcryptjs.hashSync(password, salt)], function (err, res) {
                err ? result(err, null) : result(null, res);
            });
    }
    static update(id, user, result) {
        let salt = bcryptjs.genSaltSync(10);
        let password = user.password;
        mysqlConnection.query("UPDATE users SET name=?,email=?,password=?,updated_at=NOW() WHERE id = ?",
            [user.name, user.email, bcryptjs.hashSync(password, salt) , id], function (err, res) {
            err ? result(err, null) : result(null, res);
        });
    };
    static getAll (result) {
        mysqlConnection.query("Select * from users", function (err, res) {
            err ? result(err, null) : result(null, res);
        });
    }
    static getById (id, result) {
        mysqlConnection.query("Select * from users where id = ? ", id, function (err, res) {
            err ? result(err, null) : result(null, res);
        });
    };
    static delete (id, result) {
        mysqlConnection.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
            err ? result(err, null) : result(null, res);
        });
    };
    static checkEmail(trySignInUser) {
        return new Promise((resolve, reject) => {
            mysqlConnection.query(`Select * FROM users WHERE email = '${trySignInUser.email}'`, 
                (err, res) => err ? reject(err) : resolve(res));
        })       
    };
}


module.exports = User;


