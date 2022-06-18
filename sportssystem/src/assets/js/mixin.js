import {
    apiUrls
} from './apiUrls.js'
import storage from "good-storage";

export const globalMixin = {
    data() {
        return {
            apiUrls: apiUrls,
            loadingStatus: { //loading
                refresh: false, //刷新
                button: false, //按钮
                table: false, //列表
                dialog: false, //弹出层
                search: false, //查询
                tree: false, //树形结构
                form: false //表单
            },
            dialog: { //弹出层状态
                snackbar: false,
                confirm:false
            },

            tableLists: [], //list 数据
            paging: { //分页器参数
                page_size: 10,
                page_num: 1,
            },
            storeForm: {},
            message: { //操作提示语
                success: '操作成功',
            },
            bulForm:{
                loading:false
            }
        }
    },
    mounted() {

    },
    methods: {

        //路由简单跳转
        routerJump(path, params = {}) {
            this.$router.push({
                path: path,
                query: params
            })

        },
        //判断是否是身份证
        isCard(idVal) {
            let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
            let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
            // 校验身份证：
            if (_IDRe18.test(idVal) || _IDre15.test(idVal)) {
                return true;
            } else {
                return false;
            }
        },
        //判断手机号
        isPhone(value) {
            let ver = /^1[0-9]{10}$/; //以1开头
            if(ver.test(value)){
                return true;
            }
            else{
                return false;
            }
        },
        //隐藏关键信息的值
        hideValue(str, frontLen, endLen,cha) {
            if(!str){
                return "";
            }else{
                var len = str.length - frontLen - endLen;
                var xing = '';
                for (var i = 0; i < len; i++) {
                    xing += cha;
                }
                return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
            }
            
        },
        //post方法
        post(url, params, callback = (response) => {}) {
            this.$axios.post(this.apiUrls[url], params).then(res => {
                let response = res.data;

                if (200 === response.code) {    
                    return callback(response)
                } else if (401 === response.status) {
                    this.dialog.snackbar = true
                    this.snackbar.message = 'token过期,请重新登录';
                    this.snackbar.color = 'error'
                    storage.clear();
                    setTimeout(() => {
                        this.routerJump('/login')
                    }, 1000)
                } else if (400 === response.code) {
                    this.dialog.snackbar = true
                    this.snackbar.message = response.message;
                    this.snackbar.color = 'error'
                }
                else if(response.code==201){
                    this.bulForm.loading=false;
                    this.dialog.snackbar = true
                    this.snackbar.message = response.message;
                    this.snackbar.color = 'warning';
                    this.overlay=false;
                    this.dialog.confirm=false;
                }
            }).catch(error => {
                console.log(error)
            })

        },
        //提示信息
        toast(response) {
            this.dialog.snackbar = true
            this.snackbar.message = response.message;
            this.snackbar.color = 'success'
        },
        //转换数组数据
        formatterColumn(cellValue) {
            let value = cellValue.join(",");
            // console.log(value）  
            return value;
        },

        formatDate(time) {
            var date = new Date(time * 1000);
            var month =
                (date.getMonth() + 1).toString().length == 2 ?
                date.getMonth() + 1 :
                "0" + (date.getMonth() + 1);
            var day =
                date.getDate().toString().length == 2 ?
                date.getDate() :
                "0" + date.getDate();
            var hours =
                date.getHours().toString().length == 2 ?
                date.getHours() :
                "0" + date.getHours();
            var minutes =
                date.getMinutes().toString().length == 2 ?
                date.getMinutes() :
                "0" + date.getMinutes();
            var seconds =
                date.getSeconds().toString().length == 2 ?
                date.getSeconds() :
                "0" + date.getSeconds();
            return (
                date.getFullYear() +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
            );
        },

        // 获取日期
        getDay(day) {
            var today = new Date();
            var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            var tYear = today.getFullYear();
            var tMonth = today.getMonth();
            var tDate = today.getDate();
            tMonth = this.doHandleMonth(tMonth + 1);
            tDate = this.doHandleMonth(tDate);
            return tYear + "-" + tMonth + "-" + tDate;
        },
        doHandleMonth(month) {
            var m = month;
            if (month.toString().length == 1) {
                m = "0" + month;
            }
            return m;
        }
    }
}