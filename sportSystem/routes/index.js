var express = require('express');
var router = express.Router();
var connect = require("../db/connect");


//获取首页展示数据
router.post('/api/getIndex', function (req, res) {
    const sql = "select t1.uid,t2.iid,t3.rid,t4.sid,t5.g_count,t6.b_count from (select count(*) uid from user) t1, (select count(*) iid from inform) t2, (select count(*) rid from record) t3, (select count(*) sid from sports) t4, (select count(*) g_count from user where gender=1) t5,(select count(*) b_count from user where gender=2) t6"
    connect.query(sql,function(err,result){
        if(err) throw err;
        else{
            if(req.data){
                console.log(result)
                res.json({
                    code:200,
                    message:"获取成功",
                    data:result,
                })
            }else{
                res.json({
                    code:400,
                    status: 401,
                    message:"token验证失效,请重新登录"
                })
            }
        }
    })
})

//柱状图展示数据
router.post('/api/getBar', function (req, res) {
    const sql = "select t1.run_count,t2.long_count,t3.high_count,t4.ball_count,t5.spice_count from (select count(*) run_count from record where category='田径') t1, (select count(*) long_count from record where category='跳远') t2, (select count(*) high_count from record where category='跳高') t3, (select count(*) ball_count from record where category='球类') t4, (select count(*) spice_count from record where category='趣味运动') t5"
    connect.query(sql,function(err,result){
        if(err) throw err;
        else{
            if(req.data){
                console.log(result)
                res.json({
                    code:200,
                    message:"获取成功",
                    data:result,
                })
            }else{
                res.json({
                    code:400,
                    status:401,
                    message:"token验证失效,请重新登录"
                })
            }
        }
    })
})



module.exports = router;