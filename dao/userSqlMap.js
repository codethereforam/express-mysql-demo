var userSqlMap = {
    add: 'insert into user(username, password) values(?, ?)',
    deleteById: 'delete from user where id = ?',
    update: '',
    list: 'select * from user',
    getById: 'select * from user where id = ?'
};

module.exports = userSqlMap;