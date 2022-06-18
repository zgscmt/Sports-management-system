export const navMenu = [{
        pageIndex: "homePage",
        logout: "Exit",
        search: "search",
        systemTitle: "Sports Management System",
        t_one:"Number of athletes",
        t_two:"Board Number Total",
        t_three:"Number of applicants",
        t_four:"Number of projects",
        index: 0,
        auth: 1,
        icon: 'mdi-card-text',
        text: "Athlete Management",
        active: false,
        children: [{
                text: 'AthleteInfo',
                path: '/athleteInfo',
                headers: [{
                        text: "Uid",
                        value: "uid",
                        align: 'center'
                    },
                    {
                        text: "Occupation",
                        value: "occupation",
                        align: 'center'
                    },
                    {
                        text: "Realname",
                        value: "realname",
                        align: 'center'
                    },
                    {
                        text: "Gender",
                        value: "gender",
                        align: 'center'
                    },
                    {
                        text: "StudentID",
                        value: "sid",
                        align: 'center'
                    },
                    {
                        text: "Department",
                        value: "department",
                        align: 'center'
                    },
                    {
                        text: "Grade",
                        value: "grade",
                        align: 'center'
                    },
                    {
                        text: "Class",
                        value: "class",
                        align: 'center'
                    },
                    {
                        text: "IdentityCard",
                        value: "idcard",
                        align: 'center'
                    },
                    {
                        text: "Phone",
                        value: "phone",
                        align: 'center'
                    },
                    {
                        text: "Operation",
                        align: "center",
                        value: "operation"
                    }
                ],
                prompt: {
                    edit: "Change information",
                    data_update: "edit",
                    data_del: 'del',
                    department: "Department",
                    grade: "Grade",
                    gender: "Gender",
                    class: "Class or teaching and research group",
                    occupation: "Occupation",
                    sid: "Student id or worker ID",
                    realname: "Realname",
                    idcard: "identification card",
                    phone: "phone",
                    btn_cancel: "cancel",
                    btn_confirm: "confirm",
                    departments: ["所有", "计算科学与信息工程学院", "机电工程学院", "土木工程学院", "护理学院", "化学与生物工程学院", "商学院", "文学院", "教育学院", "艺术学院", "马克思主义学院"],
                    items: ["所有", "教师", "学生"],
                    grades: ["2018", "2019", "2020", "2021", "2022"],
                    genders: ["男", "女"],
                    btn: "search"
                }
            },
            {
                text: 'ApplyInfo',
                path: '/applyInfo',
                headers: [{
                        text: "ID",
                        value: "id",
                        align: 'center'
                    },
                    // {
                    //     text: "Number",
                    //     value: "num",
                    //     align: 'center'
                    // },
                    {
                        text: "Category",
                        value: "category",
                        align: 'center'
                    }, {
                        text: "Sportname",
                        value: "sportname",
                        align: 'center'
                    }, {
                        text: "Realname",
                        value: "realname",
                        align: 'center'
                    },
                    {
                        text: "Gender",
                        value: "gender",
                        align: 'center'
                    },
                    {
                        text: "Occupation",
                        value: "occupation",
                        align: 'center'
                    },
                    {
                        text: "Department",
                        value: "department",
                        align: 'center'
                    },
                    {
                        text: "Grade",
                        value: "grade",
                        align: 'center'
                    },
                    {
                        text: "Class",
                        value: "class",
                        align: 'center'
                    },
                    {
                        text: "Operation",
                        value: "operation",
                        align: 'center'
                    },
                ],
                prompt: {
                    del: "del",
                    text: "Are you sure you want to delete it?",
                    btn_cancel: "cancel",
                    btn_confirm: "confirm",
                    hint: 'Prompt message',
                    category: "Category",
                    categorys: ["所有", "田径", "球类", "跳远", "跳高", "趣味运动"],
                    sportname: "Sportname",
                    btn: 'search',
                    add: "in",
                    edit: 'inpt',
                    edit_info: "entering/edit",
                    score: "Score",
                    rank: "Rank",
                    num: 'Which of the',
                    realname: "Realname",
                    gender: "Gender",
                    genders: ["男", "女"],
                    occupation: 'Occupation',
                    occupations: ["所有", "教师", "学生"],
                    department: 'Department',
                    departments: ["所有", "计算科学与信息工程学院", "机电工程学院", "土木工程学院", "护理学院", "化学与生物工程学院", "商学院", "文学院", "教育学院", "艺术学院", "马克思主义学院"],
                    grade: "Grade",
                    class: "Class",
                    exp: "exprot",
                    imp: "entering",
                    exp_info: "Sports record"
                }
            }
        ],
    },
    {
        index: 1,
        auth: 1,
        icon: 'mdi-run-fast',
        text: "Project Management",
        active: false,
        children: [{
            text: 'SportEvent',
            path: '/sportEvent',
            headers: [{
                    text: "ID",
                    value: "id",
                    align: 'center'
                },
                {
                    text: "Category",
                    value: "category",
                    align: 'center'
                }, {
                    text: "Sportname",
                    value: "sportname",
                    align: 'center'
                }, {
                    text: "Operation",
                    value: "operation",
                    align: 'center'
                },
            ],
            prompt: {
                category: "Motion type",
                sportname: "Campaign name",
                edit_dialog: "Modify data",
                add: "Create",
                edit: "Edit",
                del: 'Delete',
                start: "Start",
                end: "End",
                btn_cancel: "cancel",
                btn_confirm: "confirm",
                items: ["田径", "球类", "跳远", "跳高", "趣味运动"],
                run: ["100米", "200米", "1000米", "3000米", "4x100米"], //田径
                ball: ["篮球", "足球", "乒乓球", "羽毛球", "网球", "排球"], //球类
                longJump: ["跳远", "立定跳远", "三级跳远"], //跳远
                highJump: ["跳高", "撑杆跳"] //跳高
            }
        }],
    },
    {
        index: 2,
        auth: 1,
        icon: 'mdi-file-send',
        text: "Score Management",
        active: false,
        children: [{
            text: 'addScore',
            path: '/addScore',
            headers: [{
                    text: "ID",
                    value: "id",
                    align: 'center'
                },
                {
                    text: "Category",
                    value: "category",
                    align: 'center'
                }, {
                    text: "Sportname",
                    value: "sportname",
                    align: 'center'
                }, {
                    text: "Realname",
                    value: "realname",
                    align: 'center'
                },
                {
                    text: "Gender",
                    value: "gender",
                    align: 'center'
                },
                {
                    text: "Score",
                    value: "score",
                    align: 'center'
                },
                {
                    text: "Rank",
                    value: "u_rank",
                    align: 'center'
                },
                {
                    text: "Operation",
                    value: "operation",
                    align: 'center'
                },
            ],
            prompt: {
                del: "del",
                text: "Are you sure you want to delete it?",
                btn_cancel: "cancel",
                btn_confirm: "confirm",
                hint: 'Prompt message',
                category: "Category",
                categorys: ["所有", "田径", "球类", "跳远", "跳高", "趣味运动"],
                sportname: "Sportname",
                btn: 'search',
                add: "in",
                edit: 'inpt',
                edit_info: "entering/edit",
                score: "Score",
                rank: "Rank",
                num: 'Which of the',
                realname: "Realname",
                gender: "Gender",
                genders: ["男", "女"],
                occupation: 'Occupation',
                occupations: ["所有", "教师", "学生"],
                department: 'Department',
                departments: ["所有", "计算科学与信息工程学院", "机电工程学院", "土木工程学院", "护理学院", "化学与生物工程学院", "商学院", "文学院", "教育学院", "艺术学院", "马克思主义学院"],
                grade: "Grade",
                class: "Class",
                exp: "exprot",
                imp: "entering",
                exp_info: "Sports record"
            }

        }]
    },
    {
        index: 3,
        auth: 1,
        icon: 'mdi-volume-high',
        text: "Notice Managerment",
        active: false,
        children: [{
            text: 'Announce',
            path: '/announce',
            headers: [{
                    text: "ID",
                    value: "id",
                    align: 'center'
                },
                {
                    text: "Title",
                    value: "title",
                    align: 'center'
                },
                {
                    text: "Content",
                    value: "content",
                    align: 'center'
                },
                {
                    text: "Author",
                    value: "author",
                    align: 'center'
                },
                {
                    text: "Create_time",
                    value: "create_time",
                    align: 'center'
                },
                {
                    text: " Operation",
                    value: "operation",
                    align: 'center'
                }
            ],
            prompt: {
                add: 'Create',
                title: "title",
                content: "content",
                author: "author",
                edit: "edit",
                del: 'del',
                edit_dialog: 'modify data',
                btn_confirm: 'confirm',
                btn_cancel: 'cancel',
            }
        }],
    },
    {
        index: 4,
        auth: 1,
        icon: 'mdi-cog',
        text: "System Management",
        active: false,
        children: [{
            text: 'Administrator',
            path: '/administrator',
            headers: [{
                    text: "ID",
                    align: "center",
                    value: "id"
                }, {
                    text: "Username",
                    align: "center",
                    value: "username"
                }, {
                    text: "Password",
                    align: "center",
                    value: "password"
                },
                {
                    text: "Auth",
                    align: "center",
                    value: "auth"
                },
                {
                    text: "Operation",
                    align: "center",
                    value: "operation"
                }
            ],
            prompt: {
                add: 'Create',
                data_update: 'update',
                data_del: 'delete',
                select: "Admin",
                username: "Please enter your account number",
                password: "Please enter your password",
                new_password: "Please confirm passwor",
                btn_cancel: "cancel",
                btn_confirm: "confirm"

            }

        }],
    },
    // 运动员登录
    {
        index: 5,
        auth: 2,
        icon: 'mdi-border-color',
        text: "Athlete registration",
        active: false,
        children: [{
                text: 'Apply',
                path: '/apply',
                headers: [{
                        text: "ID",
                        value: "id",
                        align: 'center'
                    },
                    {
                        text: "Category",
                        value: "category",
                        align: 'center'
                    }, {
                        text: "Sportname",
                        value: "sportname",
                        align: 'center'
                    }, {
                        text: "Operation",
                        value: "operation",
                        align: 'center'
                    },
                ],
                prompt: {
                    apply: "Apply",
                    btn_confirm: 'confirm',
                    btn_cancel: 'cancel',
                    text: 'Determine the registration',
                    text_: 'This project?',
                    hint: 'Prompt message'
                }
            },
            {
                text: 'MyApply',
                path: '/myApply',
                headers: [{
                        text: "ID",
                        value: "id",
                        align: 'center'
                    },
                    {
                        text: "Number",
                        value: "num",
                        align: 'center'
                    },
                    {
                        text: "Category",
                        value: "category",
                        align: 'center'
                    }, {
                        text: "Sportname",
                        value: "sportname",
                        align: 'center'
                    }, {
                        text: "Realname",
                        value: "realname",
                        align: 'center'
                    },
                    {
                        text: "Department",
                        value: "department",
                        align: 'center'
                    },
                    {
                        text: "Grade",
                        value: "grade",
                        align: 'center'
                    },
                    {
                        text: "Class",
                        value: "class",
                        align: 'center'
                    },
                    {
                        text: "Score",
                        value: "score",
                        align: 'center'
                    },
                    {
                        text: "Rank",
                        value: "u_rank",
                        align: 'center'
                    },
                    {
                        text: "Operation",
                        value: "operation",
                        align: 'center'
                    },
                ],
                prompt: {
                    del: "del",
                    edit: 'edit',
                    edit_dialog: 'Modify data',
                    category: 'category',
                    sportname: 'sportname',
                    text: "Are you sure you want to delete it?",
                    btn_cancel: "cancel",
                    btn_confirm: "confirm",
                    hint: 'Prompt message',
                    btn: 'search',
                    num: "Which of the",
                    categorys: ["所有", "田径", "球类", "跳远", "跳高", "趣味运动"],

                }
            }
        ],
    },
    {
        index: 6,
        auth: 2,
        icon: 'mdi-volume-high',
        text: "Notification Announcement",
        active: false,
        children: [{
            text: 'Browse',
            path: '/browse',
        }],
    },
    {
        index: 7,
        auth: 2,
        icon: 'mdi-card-account-details',
        text: "Information Authentication",
        active: false,
        children: [{
            text: 'Complete Information',
            path: '/myInfo',
            prompt: {
                btn_edit: "update",
                myInfo: "My Information",
                add: "Perfect the information",
                update: "Change information",
                department: "department",
                grade: "grade",
                gender: "gender",
                class: "Class or teaching and research group",
                occupation: "occupation",
                sid: "Student id or worker ID",
                realname: "real name",
                idcard: "identification card",
                phone: "phone",
                btn_cancel: "cancel",
                btn_confirm: "confirm",
                departments: ["计算科学与信息工程学院", "机电工程学院", "土木工程学院", "护理学院", "化学与生物工程学院", "商学院", "文学院", "教育学院", "艺术学院", "马克思主义学院"],
                items: ["教师", "学生"],
                grades: ["2018", "2019", "2020", "2021", "2022"],
                genders: ["男", "女"]
            },

        }],
    },
];