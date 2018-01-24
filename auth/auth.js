var auth = require('http-auth');
var basic = auth.basic({
    realm: "writearobot",
        file: __dirname + "/users.htpasswd"
});

module.exports.auth = auth;
module.exports.basic = basic;
