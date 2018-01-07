var userSqlMap = {
    add: 'insert into user(username, password) values(?, ?)',
    delete: '',
    update: '',
    list: 'select * from user',
    selectById: ''
};

module.exports = userSqlMap;