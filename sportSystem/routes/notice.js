var express = require('express');
var router = express.Router();
var sqlObj =require('../db/sql')
var connect =require("../db/connect")
var common =require('../routes/common')
var moment = require('moment');
/*分页获取公告所有数据*/
router.post('/api/getNotices', function(req, res, next) {
    const sub_params=[];
    sub_params[0]=req.body.page_num;
    sub_params[1]=req.body.page_size;
    const params=[(parseInt(sub_params[0])-1)*parseInt(sub_params[1]),parseInt(sub_params[1])]
    common.get_page_data(req,res,sqlObj.inform_page,params,sqlObj.inform_count,sub_params)
});
//新增公告数据
router.post('/api/addNotice',function(req,res,next){
    const params=[];
    params[0]=req.body.title;
    params[1]=req.body.content;
    params[2]=req.body.author;
    params[3]=req.body.create_time;
    common.get_data(req,res,sqlObj.add_inform,params,1)
})
//编辑公告数据
router.post('/api/editNotice',function(req,res,next){
    const params=[];
    params[0]=req.body.title;
    params[1]=req.body.content;
    params[2]=req.body.author;
    params[3]=req.body.create_time;
    params[4]=req.body.id;
    common.get_data(req,res,sqlObj.edit_inform,params,3)
})
//删除公告
router.post('/api/delNotiec',function(req,res,next){
    const params=[];
    params[0]=req.body.id;
    common.get_data(req,res,sqlObj.del_inform,params,2)
})
//根据id查询公告
router.post('/api/getOneNotice',function(req,res,next){
    const params=[];
    params[0]=req.body.id;
    common.get_data(req,res,sqlObj.select_one_inform,params,4)
})

//查询通知的数量
router.post('/api/getCountNotice',function(req,res){
    connect.query(sqlObj.inform_count,function(err,result){
        if(err) throw err;
        else{
            if(req.data){
                if(result.length!=0){
                    res.json({
                        code:200,
                        data:result
                    })
                }
                else{
                    res.json({
                        code:200,
                        message:'没有数据'
                    })
                }
            }else{
                res.json({
                    code:400,
                    status:401,
                    message:"token时效,请重新登录"
                })
            }
        }
    })
})
//根据id查询最新的四条数据
router.post('/api/getFourNotice',function(req,res,next){
    const params=[req.body.count];
   connect.query(sqlObj.select_four_inform,params,function(err,result){
       if(err) throw err
       else{
           if(req.data){
            res.json({
                code:200,
                message:'查询成功',
                data:result
            })
           }else{
               res.json({
                   code:400,
                   status:401,
                   message:"token时效,请重新登录"
               })
           }
       }
   })
})


module.exports = router;
