var mysql=require('mysql')
var connection=mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'zgscmt',
    database:'sportsystem',
    connectTimeout:5000,      //设置连接超时
    multipleStatements:false
})
connection.connect();
module.exports=connection;

