var sqls={
    login_user:'select * from user where username=? and password=? and auth=?',  //运动员登录
    login_admin:"select * from admin where username=? and password=? and auth=?", //管理员登录
    user:'select * from user where username=?',         //根据用户名查询运动员信息
    admin:'select * from admin where username=?',       //根据用户名查询管理员信息
    select_user:'select * from user',  //运动员信息查询
    user_page:"select * from user limit ?,?",  //分页查询
    user_count:"select count(*) as total from user",//所有运动员的信息
    select_admin:"select * from admin", //管理员信息查询
    reg_admin:"insert into admin (username,password,auth,identify) value(?,?,1,1)", //注册管理员
    reg_user:"insert into user (username,password,auth,identify) value(?,?,2,0)",   //注册运动员
    identify_user:"update user set realname=?,sid=?,grade=?,class=?,department=?,idcard=?,phone=?,occupation=?,gender=?,identify=1 where username=?", //信息完善实名认证
    select_one_admin:'select * from admin where id=?',  //根据id查询admin
    select_one_user:'select * from user where uid=?',  //根据id查询user
    edit_admin:'update admin set username=? ,password=? where id=?',  //根据id修改管理员数据
    del_admin:'delete from admin where id=?',                //删除admin
    del_user:'delete from user where uid =?',                //删除user
    update_user_pwd:"update user set password=? where username=?",            //修改运动员密码
    update_admin_pwd:"update admin set password=? where username=?",          //修改管理员密码
    select_sport:'select * from sports',                        //查询所有信息
    sport_page:"select * from sports limit ?,?",              //项目分页查询
    sport_count:"select count(*) as total from sports",       //个数
    add_sport:'insert into sports(category,sportname,hide,num,msg) value(?,?,?,?,?)',//新增运动会项目
    update_sport:'update sports set category=?,sportname=? where id=?', //修改运动会项目
    del_sport:'delete from sports where id=?',                  //删除
    select_one_sport:'select * from sports where id =?',        //根据id查询项目
    select_last_sport:"select * from sports order by id desc limit ?",//获取最后一条记录的值
    update_s_sport:"update sports set hide=1,msg=1",            //设置开始的后态
    update_n_sport:"update sports set hide=0,num=?,msg=0",     //设置结束后的状态
    select_inform:'select * from inform',                       //查询所有公告
    inform_page:"select * from inform limit ?,?",//分页查询公告的数据
    inform_count:'select count(*) as total from inform',//查询数据的数量
    add_inform:"insert into inform (title,content,author,create_time) value(?,?,?,?)",//新增公告数据
    edit_inform:"update inform set title=?,content=?,author=?,create_time=? where id=?",//修改公告数据
    del_inform:'delete from inform where id=?',//删除公告数据
    select_one_inform:"select * from inform where id=?", //根据id查询数据
    select_four_inform:"select * from inform order by id desc limit ?", //查询最新的4条数据
    select_record:"select * from record",                       //查询有的报名数据
    page_record:"select * from record limit ?,?",               //分页查询
    record_count:"select count(*) as total from record",        //查询所有的记录数量
    del_record:"delete from record where id=?",                 //根据id删除
    add_record:"insert into record(category,sportname,num,u_id) value(?,?,?,?)",
    update_one_record:"update record set category=?,sportname=? where id=?",//修改数据
    select_one_record:"select * from record where username=? limit ?,?",  //根据用户名查询报名数据
    one_count_record:"select count(*) as total from record where username=?",
    select_id_record:'select *from record where id=?',        //根据id查询record的记录
    update_score:'update record set score=?,u_rank=? where id=?',       //录入修改成绩 
    select_one_num:"select * from sports order by id desc limit 1", //查询一条数据
}

module.exports=sqls;