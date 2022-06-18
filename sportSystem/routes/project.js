var express = require('express');
var router = express.Router();
var connect = require("../db/connect");
var sqlObj =require('../db/sql')
var common =require('../routes/common')
/*分页获取所有数据*/
router.post('/api/getProjects', function(req, res, next) {
    const sub_params=[];
    sub_params[0]=req.body.page_num;
    sub_params[1]=req.body.page_size;
    const params=[(parseInt(sub_params[0])-1)*parseInt(sub_params[1]),parseInt(sub_params[1])]
    common.get_page_data(req,res,sqlObj.sport_page,params,sqlObj.sport_count,sub_params)
});
//获取最后一个数据
router.post("/api/getLastSport",function(req,res,next){
    const params=[];
    params[0]=req.body.id;
    common.get_data(req,res,sqlObj.select_last_sport,params,4)
})
//新增运动项目数据
router.post('/api/addSport',function(req,res,next){
    const params=[];
    params[0]=req.body.category;
    params[1]=req.body.sportname;
    params[2]=req.body.hide;
    params[3]=req.body.num;
    params[4]=req.body.msg;
    common.search_add(req,res,sqlObj.select_sport,params,sqlObj.add_sport,req.body.auth)
})
//编辑运动项目数据
router.post('/api/editSport',function(req,res,next){
    const params=[];
    params[0]=req.body.category;
    params[1]=req.body.sportname;
    params[2]=req.body.id;
    common.search_add(req,res,sqlObj.select_sport,params,sqlObj.update_sport,req.body.auth)
})
//删除运动项目
router.post('/api/delSport',function(req,res,next){
    const params=[];
    params[0]=req.body.id;
    common.get_data(req,res,sqlObj.del_sport,params,2)
})
//根据id查询
router.post('/api/getOneSport',function(req,res,next){
    const params=[];
    params[0]=req.body.id;
    common.get_data(req,res,sqlObj.select_one_sport,params,4)
})
//设置开始报名
router.post("/api/setStart",function(req,res,next){
    connect.query(sqlObj.update_s_sport,function(err,result){
        if(err) throw err
        else{
            if(req.data){
                res.json({
                    code:200,
                    message:"修改成功"
                })
            }else{
                res.json({
                    code:400,
                    status:401,
                    message:"token验证过期,请重新登录"
                })
            }
        }
    })
})
//设置结束报名
router.post('/api/setEnd',function(req,res,next){
    const params=[];
    params[0]=req.body.num;
    common.get_data(req,res,sqlObj.update_n_sport,params,3)
})
//获取有的数据
router.post('/api/getAllSports',function(req,res){
    connect.query(sqlObj.select_sport,function(err,result){
        if(err) throw err
        else{
            if(req.data){
                res.json({
                    code:200,
                    message:"查询成功",
                    data:result
                })
            }else{
                res.json({
                    code:400,
                    status:401,
                    message:"token验证过期,请重新登录"
                })
            }
        }
    })
})
//获取届数
router.post('/api/getNum',function(req,res,next){
    connect.query(sqlObj.select_one_num,function(err,result){
        if(err) throw err
        else{
            if(req.data){
                res.json({
                    code:200,
                    message:"查询成功",
                    data:result
                })
            }else{
                res.json({
                    code:400,
                    status:401,
                    message:"token验证过期,请重新登录"
                })
            }
        }
    })
})

module.exports = router;
