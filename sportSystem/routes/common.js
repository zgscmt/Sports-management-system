var connect = require("../db/connect");


//封装方法
//增删改查
function get_data(req, res, sqlobj, params, msg) {
    connect.query(sqlobj, params, function (err, result, next) {
        if (err) throw err
        else
        if (req.data) {
            let send_msg = "";
            if (msg == 1) {
                send_msg = "添加成功"
            } else if (msg == 2) {
                send_msg = "删除成功"
            } else if (msg == 3) {
                send_msg = "修改成功"
            } else {
                send_msg = "查询成功"
            }
            if (result.length != 0) {
                res.json({
                    code: 200,
                    message: send_msg,
                    data: result
                })
            } else {
                res.json({
                    code: 404,
                    message: "系统错误",
                })
            }
        } else {
            res.json({
                code: 404,
                status: 401,
                message: 'token失效,请重新登录'
            })
        }
    })

}
//根据分页获取数据
function get_page_data(req, res, sql, params, sql_count, sub_params) {
    connect.query(sql, params, function (err, result) {
        if (err) {
            console.log(err, err.errno)
            if (err.errno == 1064) {
                res.json({
                    code: 201,
                    message: "表无数据"
                })
            }
        } else {
            if (req.data) {
                if (result.length == 0) {
                    params[0] = ((parseInt(sub_params[0]) - 1) - 1) * parseInt(sub_params[1]);
                    sub_params[0] = parseInt(sub_params[0]) - 1;
                    get_page_data(req, res, sql, params, sql_count, sub_params);
                } else {
                    connect.query(sql_count, function (error, among) {
                        if (error) throw error
                        else {
                            let total = among[0]['total']; //获取到的总数
                            res.json({
                                code: 200,
                                message: '获取成功',
                                data: result,
                                paging: {
                                    total: total,
                                    page_num: parseInt(sub_params[0]),
                                    page_size: parseInt(sub_params[1])
                                }
                            })
                        }
                    })
                }
            } else {
                res.json({
                    code: 404,
                    status: 401,
                    message: 'token失效,请重新登录'
                })
            }
        }
    })
}

//先查询在添加
function search_add(req, res, sql, params, sql_insert, num) {
    connect.query(sql, function (err, result) {
        if (err) throw err;
        else {
            if (req.data) {
                const name = [];
                result.some(item => {
                    name.push(item.sportname)
                })
                if (name.indexOf(params[1]) > -1) {
                    if (num == 1)
                        msg = "运动项目已存在"
                    else
                        msg = "已报名此运动项目"
                    res.json({
                        code: 400,
                        message: msg
                    })
                } else {
                    if (num == 1)
                        msg = "运动项目添加成功"
                    else
                        msg = "运动项目报名成功"
                    connect.query(sql_insert, params, function (error, data) {
                        if (error) throw error;
                        else
                            res.json({
                                code: 200,
                                message: msg
                            })
                    })
                }

            } else {
                res.json({
                    code: 404,
                    status: 401,
                    message: 'token失效,请重新登录'
                })
            }
        }
    })
}
//运动员按条件分页查询
function get_search_user_page(req, res, params, sub_params) {
     var sql = "select * from user where 1=1";
    if (req.body.sid != '' && req.body.sid != undefined) sql = `${sql} and sid like '%${req.body.sid}%'`
    if (req.body.realname != '' && req.body.realname != undefined) sql = `${sql} and realname like '%${req.body.realname}%'`
    if (req.body.gender != '' && req.body.gender != undefined) sql = `${sql} and gender='${req.body.gender}'`;
    if (req.body.occupation != '' && req.body.occupation != undefined) sql = `${sql} and occupation='${req.body.occupation}'`
    if (req.body.department != '' && req.body.department != undefined) sql = `${sql} and department='${req.body.department}'`
    if (req.body.grade != '' && req.body.grade != undefined) sql = `${sql} and grade like '%${req.body.grade}%'`
    if (req.body.class != '' && req.body.class != undefined) sql = `${sql} and class like '%${req.body.class}%'`
    sql = sql + " limit " + params[0] + "," + params[1] + "";
    connect.query(sql, function (err, result) {
        if (err) {
            if (err.errno == 1064) {
                res.json({
                    code: 201,
                    message: "表无数据"
                })
            }
        } else {
            if (req.data) {
                if (result.length == 0) {
                    params[0] = ((parseInt(sub_params[0]) - 1) - 1) * parseInt(sub_params[1]);
                    sub_params[0] = parseInt(sub_params[0]) - 1;
                    get_search_user_page(req, res, params, sub_params)
                } else {
                    var sub_sql = "select count(*) as total from user where 1=1";
                    if (req.body.sid != '' && req.body.sid != undefined) sub_sql = `${sub_sql} and sid like '%${req.body.sid}%'`
                    if (req.body.realname != '' && req.body.realname != undefined) sub_sql = `${sub_sql} and realname like '%${req.body.realname}%'`
                    if (req.body.gender != '' && req.body.gender != undefined) sub_sql = `${sub_sql} and gender=${req.body.gender}`
                    if (req.body.occupation != '' && req.body.occupation != undefined) sub_sql = `${sub_sql} and occupation='${req.body.occupation}'`
                    if (req.body.department != '' && req.body.department != undefined) sub_sql = `${sub_sql} and department='${req.body.department}'`
                    if (req.body.grade != '' && req.body.grade != undefined) sub_sql = `${sub_sql} and grade like '%${req.body.grade}%'`
                    if (req.body.class != '' && req.body.class != undefined) sub_sql = `${sub_sql} and class like '%${req.body.class}%'`
                    connect.query(sub_sql, function (error, among) {
                        if (error) throw error
                        else {
                            let total = among[0]['total']; //获取到的总数
                            res.json({
                                code: 200,
                                message: '获取成功',
                                data: result,
                                paging: {
                                    total: total,
                                    page_num: parseInt(sub_params[0]),
                                    page_size: parseInt(sub_params[1])
                                }
                            })
                        }
                    })
                }
            } else {
                res.json({
                    code: 400,
                    status: 401,
                    message: "token验证失效,请重新登录"
                })
            }
        }
    })
}

//用户报名信息分页查询
function get_search_user_record_page(req,res,params,sub_params) {
    //var sql = `select * from record where username=${req.body.username}`;
    var sql = `select record.*,user.* from record,user where user.uid =${req.body.uid} and record.u_id=${req.body.uid}`;
    if (req.body.num != '' && req.body.num != undefined) sql = `${sql} and num like'%${req.body.num}%'`
    if (req.body.category != '' && req.body.category != undefined) sql = `${sql} and category='${req.body.category}'`
    if (req.body.sportname != '' && req.body.sportname != undefined) sql = `${sql} and sportname like '%${req.body.sportname}%'`
    sql = sql + " limit " + params[0] + "," + params[1] + "";
    connect.query(sql, function (err, result) {
        if (err) {
            if (err.errno == 1064) {
                res.json({
                    code: 201,
                    message: "无报名数据"
                })
            }
        } else {
            if (req.data) {
                if (result.length == 0) {
                    params[0] = ((parseInt(sub_params[0]) - 1) - 1) * parseInt(sub_params[1]);
                    sub_params[0] = parseInt(sub_params[0]) - 1;
                    get_search_user_record_page(req, res, params, sub_params)
                } else {
                    var sub_sql = `select count(*) as total from record where u_id= ${req.body.uid}`;
                    if (req.body.num != '' && req.body.num != undefined) sub_sql = `${sub_sql} and num like'%${req.body.num}%'`
                    if (req.body.category != '' && req.body.category != undefined) sub_sql = `${sub_sql} and category='${req.body.category}'`
                    if (req.body.sportname != '' && req.body.sportname != undefined) sub_sql = `${sub_sql} and sportname like '%${req.body.sportname}%'`
                    connect.query(sub_sql, function (error, among) {
                        if (error) throw error
                        else {
                            let total = among[0]['total']; //获取到的总数
                            res.json({
                                code: 200,
                                message: '获取成功',
                                data: result,
                                paging: {
                                    total: total,
                                    page_num: parseInt(sub_params[0]),
                                    page_size: parseInt(sub_params[1])
                                }
                            })
                        }
                    })
                }
            } else {
                res.json({
                    code: 400,
                    status: 401,
                    message: "token验证失效,请重新登录"
                })
            }
        }
    })
}
//管理员
function get_search_admin_record_page(req,res,params,sub_params) {
    //var sql = "select * from record where 1=1 ";
    var sql="select * from record INNER JOIN user on uid=u_id WHERE 1=1 ";
    if (req.body.num != '' && req.body.num != undefined) sql = `${sql} and num like '%${req.body.num}%'`
    if (req.body.category != '' && req.body.category != undefined) sql = `${sql} and category='${req.body.category}'`
    if (req.body.sportname != '' && req.body.sportname != undefined) sql = `${sql} and sportname like '%${req.body.sportname}%'`
    if (req.body.realname != '' && req.body.realname != undefined) sql = `${sql} and realname like '%${req.body.realname}%'`
    if (req.body.gender != '' && req.body.gender != undefined) sql = `${sql} and gender='${req.body.gender}'`;
    if (req.body.occupation != '' && req.body.occupation != undefined) sql = `${sql} and occupation='${req.body.occupation}'`
    if (req.body.department != '' && req.body.department != undefined) sql = `${sql} and department='${req.body.department}'`
    if (req.body.grade != '' && req.body.grade != undefined) sql = `${sql} and grade like '%${req.body.grade}%'`
    if (req.body.class != '' && req.body.class != undefined) sql = `${sql} and class like '%${req.body.class}%'`
    sql = sql + " ORDER by sportname,gender,u_rank limit " + params[0] + "," + params[1] + "";
    connect.query(sql, function (err, result) {
        if (err) {
            if (err.errno == 1064) {
                res.json({
                    code: 201,
                    message: "表无数据,请换条件查询"
                })
            }
        } else {
            if (req.data) {
                if (result.length == 0) {
                    params[0] = ((parseInt(sub_params[0]) - 1) - 1) * parseInt(sub_params[1]);
                    sub_params[0] = parseInt(sub_params[0]) - 1;
                    get_search_admin_record_page(req, res, params, sub_params)
                } else {
                    //var sub_sql = "select count(*) as total from record where 1=1";
                    var sub_sql ="select count(*) as total from record INNER JOIN user on uid=u_id WHERE 1=1 ";
                    if (req.body.num != '' && req.body.num != undefined) sub_sql = `${sub_sql} and num like '%${req.body.num}%'`
                    if (req.body.category != '' && req.body.category != undefined) sub_sql = `${sub_sql} and category='${req.body.category}'`
                    if (req.body.sportname != '' && req.body.sportname != undefined) sub_sql = `${sub_sql} and sportname like '%${req.body.sportname}%'`
                    if (req.body.realname != '' && req.body.realname != undefined) sub_sql = `${sub_sql} and realname like '%${req.body.realname}%'`
                    if (req.body.gender != '' && req.body.gender != undefined) sub_sql = `${sub_sql} and gender=${req.body.gender}`
                    if (req.body.occupation != '' && req.body.occupation != undefined) sub_sql = `${sub_sql} and occupation='${req.body.occupation}'`
                    if (req.body.department != '' && req.body.department != undefined) sub_sql = `${sub_sql} and department='${req.body.department}'`
                    if (req.body.grade != '' && req.body.grade != undefined) sub_sql = `${sub_sql} and grade like '%${req.body.grade}%'`
                    if (req.body.class != '' && req.body.class != undefined) sub_sql = `${sub_sql} and class like '%${req.body.class}%'`
                    connect.query(sub_sql, function (error, among) {
                        if (error) throw error
                        else {
                            let total = among[0]['total']; //获取到的总数
                            res.json({
                                code: 200,
                                message: '获取成功',
                                data: result,
                                paging: {
                                    total: total,
                                    page_num: parseInt(sub_params[0]),
                                    page_size: parseInt(sub_params[1])
                                }
                            })
                        }
                    })
                }
            } else {
                res.json({
                    code: 400,
                    status: 401,
                    message: "token验证失效,请重新登录"
                })
            }
        }
    })
}
module.exports = {
    get_data,
    get_page_data,
    search_add,
    get_search_user_page,
    get_search_user_record_page,
    get_search_admin_record_page
};