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



## 许可证

[Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0)

