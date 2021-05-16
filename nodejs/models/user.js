var mysql = require('mysql');

var DB_NAME= 'nodedb';

var pool = mysql.createPool({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"123456",
    database:"nodedb"
});

pool.on('connnection',function(connection){
    console.log("pool on");
    connection.query('SET SESSION auto_increment_increment=1')
});

function User(user){
    this.username = user.username;
    this.userpwd = user.userpwd;
}

User.prototype.userSave = function save(callback){
    var user = {
        username : this.username,
        userpwd : this.userpwd
    };
    var INSERT_USER= "INSERT INTO USERINFO (USERID,USERNAME,USERPWD) VALUES (0,?,?)";
    pool.getConnection(function(err,connection){
        connection.query(INSERT_USER,[user.username,user.userpwd],function(err,result){
            if(err){
                console.log("INSERT_USER Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    });
};



User.prototype.userNum = function(username, callback) {
    pool.getConnection(function(err,connection){
        console.log("getConnection");
        console.log("getUserNumByName");
        var SELECT_NUM = "SELECT COUNT(1) AS num FROM USERINFO WHERE USERNAME = ?";
        connection.query(SELECT_NUM, [username], function (err, result) {
            if (err) {
                console.log("SELECT_NUM Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    });
};

User.prototype.userInfo = function(callback){
    var user = {
        username : this.username,
        userpwd : this.userpwd
    };
    var SELECT_LOGIN ="SELECT * FROM USERINFO WHERE USERNAME = ?";
    pool.getConnection(function(err,connection){
        connection.query(SELECT_LOGIN,[user.username],function(err,result){
            if (err) {
                console.log("SELECT_LOGIN Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    });
}
module.exports = User;
