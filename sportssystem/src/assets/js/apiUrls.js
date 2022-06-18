
export const apiUrls={

    login:"/api/login",               //登录
    register:"/api/register",         //注册
    updatePwd:"/api/setPwd",          //修改密码
    getAllAdmin:"/api/allAdmin",      //获去管理信息
    getOneAdmin:'/api/getOneAdmin',   //通过id获取管理员信息
    getOneUser:"/api/getOneUser",     //通过uid获取运动员信息
    editAdmin:'/api/editAdmin',       //修改管理员内容
    delAdmin:'/api/delAdmin',         //删除管理员
    delUser:"/api/delUser",           //删除运动员信息
    identify:'/api/identify',         //完善信息，修改运动员信息
    getOne:"/api/getOne",             //通过usernanme查询运动员或者管理员信息
    getOneForget:"/api/getOneForget", //注册时获取
    getUsers:"/api/getUsers",         //分页获取所有数据
    getProjects:"/api/getProjects",    //分页获取运动会项目
    editSport:"/api/editSport",        //编辑运动会项目
    addSport:"/api/addSport",          //新增运动会项目
    delSport:"/api/delSport",          //根据id删除运动会项目
    getOneSport:"/api/getOneSport",    //通过id获取运动会的
    getLastSport:"/api/getLastSport",  //查询最后一个
    getNotices:"/api/getNotices",      //获取所有公告
    addNotice:"/api/addNotice",        //新增公告
    editNotice:"/api/editNotice",      //修改公告
    delNotiec:"/api/delNotiec",        //删除公告
    getOneNotice:"/api/getOneNotice",  //根据id获取一条记录
    getFourNotice:"/api/getFourNotice",//获取最新的四条记录  
    getCountNotice:"/api/getCountNotice",//获取公告的数量,
    setStart:"/api/setStart",            //设置开始报名
    setEnd:"/api/setEnd",                //设置结束报名
    getRecords:"/api/getRecords",        //获取所有的报名记录
    delRecord:"/api/delRecord",          //根据id删除一条记录
    addRecord:"/api/addRecord",          //新增报名记录
    updateRecord:"/api/updateRecord",    //修改报名记录
    getIdRecord:"/api/getIdRecord",      //根据id查询数据
    getMyRecord:"/api/getMyRecord",      //通过用户名查询我报名的数据
    getAllSports:"/api/getAllSports",    //获取所有的报名信息
    getIndex:'/api/getIndex',            //获取首页信息展示
    getBar:"/api/getBar",                //获取柱状图
    setScore:"/api/setScore",             //录入成绩
    editScore:"/api/editScore",           //修改成绩
    addScore:"/api/addScore",             //录入成绩
    getNum:"/api/getNum",                 //获取届数

}
