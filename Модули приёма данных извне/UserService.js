const DB = require("../DB");
const crypto = require('crypto');

class UserService {

    // Ф-ия регистрации пользователя
    async registration(params){
        const {first_name,last_name,father_name,address,contact,user_name,password}=params
        const role_id =1
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        return await new Promise((resolve, reject) => {
            DB.query(`INSERT INTO users VALUES (null,?,?,?,?,?,?,?,?)`,
                [first_name,last_name,father_name,hash,address,contact,user_name,role_id],
                (error, elements) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }
    // Ф-ия для сравнения введённых данных и существующих (логин)
    async check(name,password){
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        return await new Promise((resolve, reject) => {
            DB.query('SELECT * FROM users where user_name=? and password=? limit 1',[name,hash], (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }

    // Ф-ия для получения значения id пользователя (в лк)
    async one(id){
        return await new Promise((resolve, reject) => {
            DB.query('SELECT * FROM users where id=?',[id], (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }

    // Ф-ия для получения всех значений из таблицы users, а так же получния названия ролей из таблицы roles
    async all() {
        return await new Promise((resolve, reject) => {
            DB.query('SELECT users.*,roles.name as role_name FROM users join roles on roles.id = role_id', (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }

    // Ф-ия для получения всех значений из таблицы roles
    async getRoles(){
        return await new Promise((resolve, reject) => {
            DB.query('SELECT * FROM roles', (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }

    // Ф-ия удаления пользователя из БД
    async delete(id){
        return await new Promise((resolve, reject) => {
            DB.query('DELETE from users where id=?',[id], (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }

    // Ф-ия добавления пользователей в БД
    async create(params) {
        const {first_name,last_name,father_name,address,contact,user_name,role_id}=params
        return await new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256').update(params.password).digest('hex');
            DB.query(`INSERT INTO users VALUES (null,?,?,?,?,?,?,?,?)`,
                [first_name,last_name,father_name,hash,address,contact,user_name,role_id],
                (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }

    // Ф-ия обновления данных у пользователей в БД
    async update(params,id) {
        const {first_name,last_name,father_name,address,contact,user_name,role_id}=params

        return await new Promise((resolve, reject) => {
            DB.query(
                `UPDATE users SET first_name=?, last_name=?, father_name=?,address=?,contact=?,user_name=?,role_id=? where id = ?`,
                [first_name,last_name,father_name,address,contact,user_name,role_id,id],
                (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }

    // Ф-ия обновления пароля у пользователя
    async updatePassword(params,id) {
        return await new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256').update(params.password).digest('hex');
            DB.query(
                `UPDATE users SET password=? where id = ?`,
                [hash,id],
                (error, elements) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(elements);
                });
        });
    }
}

module.exports = new UserService();