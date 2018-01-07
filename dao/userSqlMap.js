var userSqlMap = {
    add: 'insert into user(username, password) values(?, ?)',
    delete: '',
    update: '',
    list: 'select * from user',
    getById: 'select * from user where id = ?'
};

module.exports = userSqlMap;