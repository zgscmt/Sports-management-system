const jwt = require("jsonwebtoken");
const secret = 'zgs_sportsystem_token'; //设置签名

//生成token
const set_token = function (user_name, user_id) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            user_name: user_name,
            user_id: user_id
        }, secret, {
            expiresIn: '24h'
        })
        resolve(token)
    })

}

//解析token
const get_token = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            console.log('token是空的')
            reject({
                error: 'token 是空的'
            })
        } else {
            //第二种  改版后的
            var info = jwt.verify(token.split(' ')[1], secret);
            resolve(info);
        }
    })
}


module.exports = {
    set_token,
    get_token
}