# express-mysql-demo

## 项目介绍

基于node.js + express + mysql实现的restful风格的CRUD简单示例

### 组织结构

```
├── app.js -- 应用配置
├── bin
│   └── www -- 项目运行脚本
├── conf
│   └── mysqlConf.js -- mysql配置文件
├── dao
│   ├── userDAO.js -- 封装和数据库的交互
│   └── userSqlMap.js -- SQL语句封装
├── model
│   └── result.js -- 返回结果对象封装
├── package.json -- 依赖模块
├── project-datamodel
│   └── user.sql -- 数据库脚本
├── public -- 前端静态页面
│   ├── add.html
│   ├── css
│   │   └── style.css
│   ├── detail.html
│   ├── index.html
│   └── modify.html
└── routes
    └── users.js -- 用户操作路由及业务逻辑
```

### 模块依赖

```
www -> app.js -> users.js ->  userDAO.js -> mysqlConf.js & userSqlMap.js
```

### 技术选型

 后端技术
- node.js
- express

前端技术
- angular.js

## 环境搭建

- node.js: https://nodejs.org/en/download/package-manager/
- mysql: https://dev.mysql.com/doc/refman/5.7/en/installing.html

## 项目运行

1. 下载代码并部署

```
git clone https://github.com/codethereforam/express-mysql-demo.git
cd express-mysql-demo && npm install   #安装部署依赖的包
```

2. 新建express-mysql-demo数据库，导入project-datamodel文件夹下的user.sql

3. 修改conf/mysqlConf.js中数据库配置信息

4. 启动

```
# 切换到项目根路径
npm start
```

5. 打开首页: http://localhost:8888

## 开发过程及代码分析

关于restful，可参考阮一峰的两篇文章：
- [理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

我使用的IDE是IDEA，安装"NodeJS"插件后依次点击

```
File -> New Project -> Node.js and NPM -> Node.js Express App
```

IDEA默认使用express-generator生成项目结构。

新建数据库"express-mysql-demo":

```sql
create database `express-mysql-demo`;
```

新建user表:

```sql
CREATE TABLE `express-mysql-demo`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
DEFAULT CHARACTER SET = utf8mb4;
```

表结构：

```sql
+----------+------------------+------+-----+---------+----------------+
| Field    | Type             | Null | Key | Default | Extra          |
+----------+------------------+------+-----+---------+----------------+
| id       | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| username | varchar(45)      | NO   |     | NULL    |                |
| password | varchar(45)      | NO   |     | NULL    |                |
+----------+------------------+------+-----+---------+----------------+
```

mysql配置文件conf/mysqlConf.js:

```js
module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database:'express-mysql-demo',
        // 最大连接数，默认为10
        connectionLimit: 10
    }
};
```

SQL语句封装模块dao/userSqlMap.js:

```js
var userSqlMap = {
    add: 'insert into user(username, password) values(?, ?)',
    deleteById: 'delete from user where id = ?',
    update: 'update user set username=?, password=? where id=?',
    list: 'select * from user',
    getById: 'select * from user where id = ?'
};
```

封装返回结果对象model/result.js:

```js
exports.createResult = function(success, data) {
    var result = {};
    result.success = success;
    result.data = data;
    return result;
};
```

我这里使用了工厂方法创建结果对象，对象有两个属性，success代表用户操作成功或失败，data存放后台要返回的数据。

下面分析修改用户部分信息的相关代码，全部的增删改查代码请将项目clone下来查看。

封装和数据库的交互模块dao/userDAO.js:

```js
var pool = mysql.createPool(mysqlConf.mysql);
module.exports = {
     getById: function (id, callback) {
        pool.query(userSqlMap.getById, id, function (error, result) {
            if (error) throw error;
            console.log(result[0]);
            callback(result[0]);
        });
    },update: function (user, callback) {
        pool.query(userSqlMap.update, [user.username, user.password, user.id], function (error, result) {
            if (error) throw error;
            callback(result.affectedRows > 0);
        });
    }
};
```

这里使用了连接池，重复使用数据库连接，而不必每执行一次CRUD操作就获取、释放一次数据库连接，从而提高了对数据库操作的性能。

用户操作路由及实现业务逻辑routes/users.js:

```js
/* patch users */
router.patch('/:id', function (req, res) {
    console.log('patch users called');
    userDAO.getById(req.params.id, function (user) {
        var username = req.body.username;
        if(username) {
            user.username = username;
        }
        var password = req.body.password;
        if(password) {
            user.password = password;
        }
        console.log(user);
        userDAO.update(user, function (success) {
            var r =  result.createResult(success, null);
            res.json(r);
        });
    });
});
```

router根据不同的HTTP请求方法和访问路径执行相应的回调函数，回调函数中先记录日志，然后检查用户传过来的数据，接着调用userDAO的相应CRUD方法，最后返回一个JSON对象给前端。这里修改用户部分信息对应HTTP方法是PATCH，而修改全部信息对应的是PUT。

应用配置app.js中配置用户操作相关的路由:

```js
app.use('/users', users);
```

前端public/index.html中与后台交互的JS代码：

```js
(function (window) {
            window.angular.module('list', [])
                .controller('listCtrl', function ($scope, $http) {
                    $scope.doPatch = function (id) {
                        var data = JSON.stringify({
                            password: document.getElementById("pwd" + id).value
                        });
                        $http.patch("/users/" + id, data)
                            .then(function (response) {
	                            console.debug(response.data.success);
                            }, function (err) {
                                alert(err);
                            });
                    };
                });
        })(window);
```

前端使用angualr.js，ajax异步调用后端restful API，然后解析后台返回的JSON对象在界面上展示。

## 许可证

[Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0)