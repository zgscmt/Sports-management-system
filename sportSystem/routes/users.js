var express = require('express');
var router = express.Router();
var connect = require("../db/connect");
var sqlObj = require("../db/sql")
var setToken = require('../token/token')
var common = require('../routes/common')

//获取登录用户的信息
router.post('/api/login', function (req, res) {
    const params = [];
    params[0] = req.body.username;
    params[1] = req.body.password;
    params[2] = req.body.auth;
    if (req.body.username == "" || req.body.password == "")
        res.json({
            code: 400,
            message: "账号或密码不能为空"
        })
    else
    if (req.body.auth == 1) { //管理登录
        connect.query(sqlObj.login_admin, params, function (err, result) {
            if (err) throw err
            else
            if (result.length != 0) {
                if (req.body.username == result[0].username && req.body.password)
                    setToken.set_token(result[0].username, result[0].auth).then(token => {
                        res.json({
                            code: 200,
                            message: "登录成功",
                            token: token,
                            data: result
                        })
                    })
            } else {
                connect.query(sqlObj.admin, params[0], function (error, c_admin) {
                    if (error) throw error
                    else
                    if (c_admin.length == 0) {
                        res.json({
                            code: 400,
                            message: "账号不存在"
                        })
                    } else {
                        if (req.body.username == c_admin[0].username && req.body.password != c_admin[0].password)
                            res.json({
                                code: 400,
                                message: "密码错误"
                            })
                        else {
                            res.json({
                                code: 400,
                                message: "系统错误"
                            })
                        }
                    }
                })
            }
        })
    } else { //运动员登录
        connect.query(sqlObj.login_user, params, function (err, result) {
            if (err) throw err
            else
            if (result.length != 0) {
                if (req.body.username == result[0].username && req.body.password)
                    setToken.set_token(result[0].username, result[0].auth).then(token => {
                        res.json({
                            code: 200,
                            message: "登录成功",
                            token: token,
                            data: result
                        })
                    })
            } else {
                connect.query(sqlObj.user, params[0], function (error, c_user) {
                    if (error) throw error
                    else
                    if (c_user.length == 0) {
                        res.json({
                            code: 400,
                            message: "账号不存在"
                        })
                    } else {
                        if (req.body.username == c_user[0].username && req.body.password != c_user[0].password)
                            res.json({
                                code: 400,
                                message: "密码错误"
                            })
                        else {
                            res.json({
                                code: 400,
                                message: "系统错误"
                            })
                        }
                    }
                })
            }
        })
    }

});

//用户注册
router.post('/api/register', function (req, res) {
    const params = [];
    params[0] = req.body.username;
    params[1] = req.body.password;
    if (req.body.username == "" || req.body.password == "" || "")
        res.json({
            code: 400,
            message: "账号或密码不能为空"
        })
    else
    if (req.body.auth == 1) //管理员注册
    {
        connect.query(sqlObj.select_admin, function (err, result) {
            if (err) throw err
            else {
                const name = [];
                result.some(item => {
                    name.push(item.username)
                })
                if (name.indexOf(params[0]) > -1) {
                    res.json({
                        code: 400,
                        message: '账号已被注册'
                    })
                } else {
                    connect.query(sqlObj.reg_admin, params, function (err, result) {
                        if (err) throw err
                        else
                            res.json({
                                code: 200,
                                message: "注册成功"
                            })
                    })
                }
            }
        })
    } else { //运动员注册
        connect.query(sqlObj.select_user, function (err, result) {
            if (err) throw err
            else {
                const name = [];
                result.some(item => {
                    name.push(item.username)
                })
                if (name.indexOf(params[0]) > -1) {
                    res.json({
                        code: 400,
                        message: '账号已被注册'
                    })
                } else {
                    connect.query(sqlObj.reg_user, params, function (err, result) {
                        if (err) throw err
                        else
                            res.json({
                                code: 200,
                                message: "注册成功"
                            })
                    })
                }
            }
        })
    }
})
//在没有token的前提下判断用户时候存在
router.post('/api/getOneForget', function (req, res) {
    const params = [req.body.username]
    if (req.body.auth == 2) {
        connect.query(sqlObj.user, params, function (err, result) {
            if (err) throw err;
            else {
                if (result.length != 0) {
                    res.json({
                        code: 200,
                        message: '查询成功',
                    })
                } else {
                    res.json({
                        code: 400,
                        message: '账号未注册',
                    })
                }
            }
        })
    } else {
        connect.query(sqlObj.admin, params, function (err, result) {
            if (err) throw err;
            else {
                if (result.length != 0) {
                    res.json({
                        code: 200,
                        message: '查询成功',
                    })
                } else {
                    res.json({
                        code: 400,
                        message: '账号未注册',
                    })
                }
            }
        })
    }
})
//忘记密码
router.post('/api/setPwd', function (req, res) {
    const params = [];
    params[0] = req.body.password;
    params[1] = req.body.username;
    if (req.body.auth == 2) {
        connect.query(sqlObj.update_user_pwd, params, function (err, result) {
            if (err) throw err;
            else {
                res.json({
                    code: 200,
                    message: '修改成功',
                })
            }
        })
    } else {
        connect.query(sqlObj.update_admin_pwd, params, function (err, result) {
            if (err) throw err;
            else {
                res.json({
                    code: 200,
                    message: '修改成功',
                })
            }
        })
    }
})
//运动员认证
router.post('/api/identify', function (req, res) {
    const params = [];
    params[0] = req.body.realname;
    params[1] = req.body.sid;
    params[2] = req.body.grade;
    params[3] = req.body.class;
    params[4] = req.body.department;
    params[5] = req.body.idcard;
    params[6] = req.body.phone;
    params[7] = req.body.occupation;
    params[8] = req.body.gender;
    params[9] = req.body.username;
    connect.query(sqlObj.identify_user, params, function (err, result) {
        if (err) throw err
        else
        if (req.data) {
            res.json({
                code: 200,
                message: '信息完善成功'
            })
        } else {
            res.json({
                code: 404,
                status: 401,
                message: 'token失效,请重新登录'
            })
        }

    })
})
//获取管理员的信息
router.post('/api/allAdmin', function (req, res, next) {
    connect.query(sqlObj.select_admin, function (err, result) {
        if (err) throw err
        else
        if (req.data) {
            res.json({
                code: 200,
                message: '获取成功',
                data: result
            })
        } else {
            res.json({
                code: 404,
                status: 401,
                message: 'token失效,请重新登录'
            })
        }

    })
})

//根据id查询管理员的信息
router.post('/api/getOneAdmin', function (req, res, next) {
    const params = [req.body.id]
    common.get_data(req, res, sqlObj.select_one_admin, params, 4)
})
//修改管理员信息
router.post('/api/editAdmin', function (req, res, next) {
    const params = [req.body.username, req.body.password, req.body.id]
    common.get_data(req, res, sqlObj.edit_admin, params, 3)
})
//删除管理员
router.post('/api/delAdmin', function (req, res, next) {
    const params = [];
    params[0] = req.body.id;
    common.get_data(req, res, sqlObj.del_admin, params, 2)
})
//获取运动员所有信息(分页查询)
router.post('/api/getUsers', function (req, res) {
    const sub_params = [];
    sub_params[0] = req.body.page_num;
    sub_params[1] = req.body.page_size;
    const params = [(parseInt(sub_params[0]) - 1) * parseInt(sub_params[1]), parseInt(sub_params[1])]
    common.get_search_user_page(req,res,params,sub_params)
})
//根据id获取运动员的信息
router.post('/api/getOneUser', function (req, res, next) {
    const params = [req.body.uid]
    common.get_data(req, res, sqlObj.select_one_user, params, 4)
})
//根据id删除运动员信息
router.post('/api/delUser', function (req, res) {
    const params = [req.body.uid]
    common.get_data(req, res, sqlObj.del_user, params, 2)
})

//根据username查询运动员或者管理员的信息
router.post('/api/getOne', function (req, res, next) {
    const params = [req.body.username]
    if (req.body.auth == 2) {
        common.get_data(req, res, sqlObj.user, params, 4)
    } else {
        common.get_data(req, res, sqlObj.admin, params, 4)

    }
})

module.exports = router;