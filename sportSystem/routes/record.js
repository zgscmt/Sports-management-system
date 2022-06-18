const {
    response
} = require('express');
var express = require('express');
var router = express.Router();
var connect = require("../db/connect");
var sqlObj = require("../db/sql")
var common = require('../routes/common')

//获取所有的记录
router.post('/api/getRecords', function (req, res, next) {
    const sub_params = [];
    sub_params[0] = req.body.page_num;
    sub_params[1] = req.body.page_size;
    const params = [(parseInt(sub_params[0]) - 1) * parseInt(sub_params[1]), parseInt(sub_params[1])]
    common.get_search_admin_record_page(req, res, params, sub_params)
})

//根据id删除记录
router.post('/api/delRecord', function (req, res, next) {
    const params = [];
    params[0] = req.body.id;
    common.get_data(req, res, sqlObj.del_record, params, 2)
})

//新增报名数据数据
router.post('/api/addRecord', function (req, res) {
    const params = [];
    params[0] = req.body.category;
    params[1] = req.body.sportname;
    params[2] = req.body.num;
    params[3] = req.body.uid;
    connect.query(sqlObj.select_record, function (err, result) {
        if (err) throw err
        else {
            if (req.data) {
                const allData = [];
                result.forEach(item => {
                    let obj = {};
                    obj.sportname = item.sportname;
                    obj.u_id = item.u_id;
                    obj.num = item.num;
                    allData.push(obj)
                });
                const s_name = {
                    sportname: req.body.sportname,
                    u_id: req.body.uid,
                    num: req.body.num
                }
                if (JSON.stringify(allData).indexOf(JSON.stringify(s_name)) > -1) {
                    res.json({
                        code: 201,
                        message: "您已报名此运动项目,请报名其他项目!"
                    })
                } else {
                    connect.query(sqlObj.add_record, params, function (error, data) {
                        if (error) throw error
                        else {
                            res.json({
                                code: 200,
                                message: "报名成功"
                            })
                        }
                    })
                }

            } else {
                res.json({
                    code: 400,
                    message: "token验证失效,请重新登录",
                    status: 401
                })
            }
        }
    })
})

//根据用户名获取报名记录(yao改)
router.post("/api/getMyRecord", function (req, res, next) {
    const sub_params = [];
    sub_params[0] = req.body.page_num;
    sub_params[1] = req.body.page_size;
    const params = [(parseInt(sub_params[0]) - 1) * parseInt(sub_params[1]), parseInt(sub_params[1])]
    common.get_search_user_record_page(req, res, params, sub_params)
})
//根据id查询报名的记录
router.post("/api/getIdRecord", function (req, res, next) {
    const params = [];
    params[0] = req.body.id;
    common.get_data(req, res, sqlObj.select_id_record, params, 4)
})
//学生自己修改报名记录
router.post("/api/updateRecord", function (req, res) {
    const params = [];
    params[0] = req.body.category;
    params[1] = req.body.sportname;
    params[2] = req.body.id;
    connect.query(sqlObj.select_record, function (err, result) {
        if (err) throw err
        else {
            if (req.data) {
                const s_name = [];
                result.some((item) => {
                    s_name.push(item.sportname);
                })
                if (s_name.indexOf(params[1]) > -1) {
                    res.json({
                        code: 201,
                        message: "您已报名此运动项目,请报名其他项目!"
                    })
                } else {
                    connect.query(sqlObj.update_one_record, params, function (error, data) {
                        if (error) throw error
                        else {
                            res.json({
                                code: 200,
                                message: "修改成功"
                            })
                        }
                    })
                }

            } else {
                res.json({
                    code: 400,
                    message: "token验证失效,请重新登录",
                    status: 401
                })
            }
        }
    })
})

//录入修改成绩
router.post("/api/editScore", function (req, res) {
    const params = [req.body.score, req.body.rank, req.body.id]
    common.get_data(req, res, sqlObj.update_score, params, 3)

})

//根据类型录入所有成绩
router.post('/api/addScore', function (req, res) {
    const tableList = req.body.obj;
    const t_length = tableList.length;
    let f_length = 0;
    tableList.forEach(item => {
        let params = [];
        if (item.score == undefined)
            item.score = "";
        if (item.u_rank == undefined)
            item.u_rank = "";
        params[0] = item.score;
        params[1] = item.u_rank;
        params[2] = item.id;
        console.log(params)
        connect.query(sqlObj.update_score, params, function (err, result) {
            if (err) throw err;
            else
            if (req.data) {
                f_length++;
                if (t_length == f_length) {
                    res.json({
                        code: 200,
                        message: "成绩录入成功",
                    })
                }
            } else {
                res.json({
                    code: 400,
                    message: "token验证失效,请重新登录",
                    status: 401
                })
            }
        })
    })

})

module.exports = router;