export const navMenu = [{
        pageIndex: "首页",
        logout: "退出",
        search: "搜索",
        systemTitle: "运动会管理系统",
        t_one:"运动员数量",
        t_two:"公告数量",
        t_three:"报名总数",
        t_four:"项目总数",
        index: 0,
        auth: 1,
        icon: 'mdi-card-text',
        text: "运动员管理",
        active: false,
        children: [{
                text: '运动员信息',
                path: '/athleteInfo',
                headers: [{
                        text: "序号",
                        value: "uid",
                        align: 'center'
                    },
                    {
                        text: "职业信息",
                        value: "occupation",
                        align: 'center'
                    },
                    {
                        text: "真实姓名",
                        value: "realname",
                        align: 'center'
                    },
                    {
                        text: "性别",
                        value: "gender",
                        align: 'center'
                    },
                    {
                        text: "学号",
                        value: "sid",
                        align: 'center'
                    },
                    {
                        text: "院系",
                        value: "department",
                        align: 'center'
                    },
                    {
                        text: "年级",
                        value: "grade",
                        align: 'center'
                    },
                    {
                        text: "班级",
                        value: "class",
                        align: 'center'
                    },
                    {
                        text: "身份证",
                        value: "idcard",
                        align: 'center'
                    },
                    {
                        text: "手机号",
                        value: "phone",
                        align: 'center'
                    },
                    {
                        text: "操作",
                        align: "center",
                        value: "operation"
                    },
                ],
                prompt: {
                    edit: "修改信息",
                    data_update: "修改",
                    data_del: '删除',
                    department: "院系名称",
                    grade: "年级",
                    gender: '性别',
                    class: "班级或教研组",
                    occupation: "您的职业",
                    sid: "学号或工号",
                    realname: "真实姓名",
                    idcard: "身份证信息",
                    phone: "手机号",
                    btn_cancel: "取消",
                    btn_confirm: "确认",
                    departments: ["所有", "计算科学与信息工程学院", "机电工程学院", "土木工程学院", "护理学院", "化学与生物工程学院", "商学院", "文学院", "教育学院", "艺术学院", "马克思主义学院"],
                    items: ["所有", "教师", "学生"],
                    grades: ["2018", "2019", "2020", "2021", "2022"],
                    genders: ["男", "女"],
                    btn: "搜索"
                }
            },
            {
                text: '报名信息',
                path: '/applyInfo',
                headers: [{
                        text: "序号",
                        value: "id",
                        align: 'center'
                    },
                    // {
                    //     text: "第 几 届",
                    //     value: "num",
                    //     align: 'center'
                    // },
                    {
                        text: "运动类型",
                        value: "category",
                        align: 'center'
                    }, {
                        text: "运动名称",
                        value: "sportname",
                        align: 'center'
                    }, {
                        text: "真实姓名",
                        value: "realname",
                        align: 'center'
                    },
                    {
                        text: "性别",
                        value: "gender",
                        align: 'center'
                    },
                    {
                        text: "职业(校)",
                        value: "occupation",
                        align: 'center'
                    },
                    {
                        text: "院系",
                        value: "department",
                        align: 'center'
                    },
                    {
                        text: "年级",
                        value: "grade",
                        align: 'center'
                    },
                    {
                        text: "班级",
                        value: "class",
                        align: 'center'
                    },
                    
                    {
                        text: "操作",
                        value: "operation",
                        align: 'center'
                    },
                ],
                prompt: {
                    del: "删除",
                    text: "确定要删除吗?",
                    btn_cancel: "取消",
                    btn_confirm: "确认",
                    hint: '提示信息',
                    category: "运动类型",
                    categorys: ["所有", "田径", "球类", "跳远", "跳高", "趣味运动"],
                    sportname: "运动名称",
                    btn: '搜索',
                    num: '第几届',
                    add: "录入",
                    edit: '录入',
                    edit_info: "录入/修改",
                    score: "分数",
                    rank: "排名",
                    realname: "真实姓名",
                    gender: "性别",
                    genders: ["男", "女"],
                    occupation: '职业',
                    occupations: ["所有", "教师", "学生"],
                    department: '院系',
                    departments: ["所有", "计算科学与信息工程学院", "机电工程学院", "土木工程学院", "护理学院", "化学与生物工程学院", "商学院", "文学院", "教育学院", "艺术学院", "马克思主义学院"],
                    grade: "年级",
                    class: "班级",
                    exp: "导出记录",
                    imp: '成绩录入',
                    exp_info: "运动会记录表"
                }
            }
        ],
    },
    {
        index: 1,
        auth: 1,
        icon: 'mdi-run-fast',
        text: "项目管理",
        active: false,
        children: [{
            text: '运动会项目',
            path: '/sportEvent',
            headers: [{
                    text: "序号",
                    value: "id",
                    align: 'center'
                },
                {
                    text: "运动类型",
                    value: "category",
                    align: 'center'
                }, {
                    text: "运动名称",
                    value: "sportname",
                    align: 'center'
                }, {
                    text: "操作",
                    value: "operation",
                    align: 'center'
                },
            ],
            prompt: {
                category: "运动类型",
                sportname: "运动名称",
                add: "新增数据",
                edit_dialog: "修改数据",
                del: '删除',
                btn_cancel: "取消",
                btn_confirm: "确认",
                edit: "修改",
                start: "开始报名",
                end: "结束报名",
                items: ["田径", "球类", "跳远", "跳高", "趣味运动"],
                run: ["100米", "200米", "1000米", "3000米", "4x100米"], //田径
                ball: ["篮球", "足球", "乒乓球", "羽毛球", "网球", "排球"], //球类
                longJump: ["跳远", "立定跳远", "三级跳远"], //跳远
                highJump: ["跳高", "撑杆跳"] //跳高
            }
        }, ],

    },
    {
        index: 2,
        auth: 1,
        icon: 'mdi-file-send',
        text: "成绩管理",
        active: false,
        children: [{
            text: '成绩录入',
            path: '/addScore',
            headers: [{
                    text: "序号",
                    value: "id",
                    align: 'center'
                },
                {
                    text: "运动类型",
                    value: "category",
                    align: 'center'
                }, {
                    text: "运动名称",
                    value: "sportname",
                    align: 'center'
                }, {
                    text: "真实姓名",
                    value: "realname",
                    align: 'center'
                },
                {
                    text: "性别",
                    value: "gender",
                    align: 'center'
                },
                {
                    text: "成绩",
                    value: "score",
                    align: 'center'
                },
                {
                    text: "排名",
                    value: "u_rank",
                    align: 'center'
                },
                {
                    text: "操作",
                    value: "operation",
                    align: 'center'
                },
            ],
            prompt: {
                del: "删除",
                text: "确定要删除吗?",
                btn_cancel: "取消",
                btn_confirm: "确认",
                hint: '提示信息',
                category: "运动类型",
                categorys: ["所有", "田径", "球类", "跳远", "跳高", "趣味运动"],
                sportname: "运动名称",
                btn: '搜索',
                num: '第几届',
                add: "录入",
                edit: '录入',
                edit_info: "录入/修改",
                score: "分数",
                rank: "排名",
                realname: "真实姓名",
                gender: "性别",
                genders: ["男", "女"],
                occupation: '职业',
                occupations: ["所有", "教师", "学生"],
                department: '院系',
                departments: ["所有", "计算科学与信息工程学院", "机电工程学院", "土木工程学院", "护理学院", "化学与生物工程学院", "商学院", "文学院", "教育学院", "艺术学院", "马克思主义学院"],
                grade: "年级",
                class: "班级",
                exp: "导出记录",
                imp: '成绩录入',
                exp_info: "运动会记录表"
            }
        }]
    },
    {
        index: 3,
        auth: 1,
        icon: 'mdi-volume-high',
        text: "公告管理",
        active: false,
        children: [{
            text: '发布公告',
            path: '/announce',
            headers: [{
                    text: "序号",
                    value: "id",
                    align: 'center'
                },
                {
                    text: "标题",
                    value: "title",
                    align: 'center'
                },
                {
                    text: "内容",
                    value: "content",
                    align: 'center'
                },
                {
                    text: "发布者",
                    value: "author",
                    align: 'center'
                },
                {
                    text: "创建时间",
                    value: "create_time",
                    align: 'center'
                },
                {
                    text: "操作",
                    value: "operation",
                    align: 'center'
                }
            ],
            prompt: {
                add: '新增数据',
                title: "标题",
                content: "内容",
                author: "发布者",
                edit: "编辑",
                del: '删除',
                edit_dialog: '修改数据',
                btn_confirm: '确定',
                btn_cancel: '取消'
            }

        }],
    },
    {
        index: 4,
        auth: 1,
        icon: 'mdi-cog',
        text: "系统管理",
        active: false,
        children: [{
                text: '管理员',
                path: '/administrator',
                headers: [{
                        text: "序号",
                        value: "id",
                        align: 'center'
                    }, {
                        text: "账号",
                        align: "center",
                        value: "username"
                    }, {
                        text: "密码",
                        align: "center",
                        value: "password"
                    },
                    {
                        text: "权限",
                        align: "center",
                        value: "auth"
                    },
                    {
                        text: "操作",
                        align: "center",
                        value: "operation"
                    }
                ],
                prompt: {
                    add: '新增数据',
                    data_update: "修改",
                    data_del: '删除',
                    select: "管理员",
                    username: "请输入账号",
                    password: "请输入密码",
                    new_password: "请确认密码",
                    btn_cancel: "取消",
                    btn_confirm: "确认"
                }
            },

        ],
    },
    // 运动员登录
    {
        index: 5,
        auth: 2,
        icon: 'mdi-border-color',
        text: "运动员报名",
        active: false,
        children: [{
                text: '项目报名',
                path: '/apply',
                headers: [{
                        text: "序号",
                        value: "id",
                        align: 'center'
                    },
                    {
                        text: "运动类型",
                        value: "category",
                        align: 'center'
                    }, {
                        text: "运动名称",
                        value: "sportname",
                        align: 'center'
                    }, {
                        text: "操作",
                        value: "operation",
                        align: 'center'
                    }
                ],
                prompt: {
                    apply: "报名",
                    btn_confirm: '确定',
                    btn_cancel: '取消',
                    text: "确定报名",
                    text_: '这个项目吗?',
                    hint: '提示信息'
                }
            },
            {
                text: '我的报名',
                path: '/myApply',
                headers: [{
                        text: "序号",
                        value: "id",
                        align: 'center'
                    },
                    {
                        text: "届数",
                        value: "num",
                        align: 'center'
                    },
                    {
                        text: "运动类型",
                        value: "category",
                        align: 'center'
                    }, {
                        text: "运动名称",
                        value: "sportname",
                        align: 'center'
                    }, {
                        text: "真实姓名",
                        value: "realname",
                        align: 'center'
                    },
                    {
                        text: "院系",
                        value: "department",
                        align: 'center'
                    },
                    {
                        text: "年级",
                        value: "grade",
                        align: 'center'
                    },
                    {
                        text: "班级",
                        value: "class",
                        align: 'center'
                    },
                    {
                        text: "成绩",
                        value: "score",
                        align: 'center'
                    },
                    {
                        text: "排名",
                        value: "u_rank",
                        align: 'center'
                    },
                    {
                        text: "操作",
                        value: "operation",
                        align: 'center'
                    },
                ],
                prompt: {
                    del: "删除",
                    edit: '修改',
                    edit_dialog: '修改数据',
                    category: '运动类型',
                    sportname: "运动项目",
                    text: "确定要删除吗?",
                    btn_cancel: "取消",
                    btn_confirm: "确认",
                    hint: '提示信息',
                    btn: '搜索',
                    num: "第几届运动会",
                    categorys: ["所有", "田径", "球类", "跳远", "跳高", "趣味运动"],
                }
            }
        ],
    },
    {
        index: 6,
        auth: 2,
        icon: 'mdi-volume-high',
        text: "通知公告",
        active: false,
        children: [{
            text: '公告浏览',
            path: '/browse',
        }],
    },
    {
        index: 7,
        auth: 2,
        icon: 'mdi-card-account-details',
        text: "信息认证",
        active: false,
        children: [{
            text: '完善信息',
            path: '/myInfo',
            prompt: {
                btn_edit: "修改",
                myInfo: "我的信息",
                add: "完善信息",
                update: "更改信息",
                department: "院系名称",
                grade: "年级",
                class: "班级或教研组",
                gender: '性别',
                occupation: "您的职业",
                sid: "学号或工号",
                realname: "真实姓名",
                idcard: "身份证信息",
                phone: "手机号",
                btn_cancel: "取消",
                btn_confirm: "确认",
                departments: ["计算科学与信息工程学院", "机电工程学院", "土木工程学院", "护理学院", "化学与生物工程学院", "商学院", "文学院", "教育学院", "艺术学院", "马克思主义学院"],
                items: ["教师", "学生"],
                grades: ["2018", "2019", "2020", "2021", "2022"],
                genders: ["男", "女"]
            },

        }],
    },
];