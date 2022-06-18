<template>
    <v-app>
        <div class="forget">
            <v-row cols="6" justify="center" style="margin-top: 15vh">
                <v-col cols="12" md="4">
                    <material-card color="#FFA500">
                        <template v-slot:heading class="bgColor">
                            <div
                                class="display-2 font-weight-light"
                                style="text-align: center"
                            >
                                修改密码
                            </div>

                            <div
                                class="subtitle-1 font-weight-light"
                                style="text-align: center"
                            >
                                Welcome to the system
                            </div>
                        </template>

                        <v-form>
                            <v-container class="py-0">
                                <v-row style="padding: 0px !important">
                                    <v-col cols="12">
                                        <v-select
                                            prepend-inner-icon="mdi-card-account-details"
                                            :items="items"
                                            v-model="select"
                                            label="请选择身份"
                                            solo
                                        ></v-select>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        style="margin-top: -25px !important"
                                    >
                                        <v-text-field
                                            v-model="user_name"
                                            prepend-inner-icon="mdi-account"
                                            placeholder="请输入账号"
                                            solo
                                        />
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        style="margin-top: -25px !important"
                                    >
                                        <v-text-field
                                            prepend-inner-icon="mdi-lock"
                                            v-model="password"
                                            placeholder="请输入密码(大于6位数)"
                                            :type="show ? 'text' : 'password'"
                                            :append-icon="
                                                show ? 'mdi-eye' : 'mdi-eye-off'
                                            "
                                            solo
                                            @click:append="show = !show"
                                        />
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        style="margin-top: -25px !important"
                                    >
                                        <v-text-field
                                            prepend-inner-icon="mdi-lock"
                                            v-model="password_new"
                                            placeholder="请确认密码(大于6位数)"
                                            :type="show ? 'text' : 'password'"
                                            :append-icon="
                                                show ? 'mdi-eye' : 'mdi-eye-off'
                                            "
                                            solo
                                            @click:append="show = !show"
                                        />
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        style="margin-top: -25px !important"
                                    >
                                        <v-row>
                                            <v-col cols="9">
                                                <v-text-field
                                                    v-model="isvcode"
                                                    prepend-inner-icon="mdi-shield-key"
                                                    placeholder="请输入验证码"
                                                    solo
                                                />
                                            </v-col>
                                            <v-col cols="3">
                                                <v-chip
                                                    class="ma-2"
                                                    color="#FFA500"
                                                    text-color="#fff"
                                                    label
                                                    style="
                                                        weight: 35px !important;
                                                    "
                                                    @click="getCode()"
                                                >
                                                    {{ vcode }}
                                                </v-chip>
                                            </v-col>
                                        </v-row>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        style="margin-top: -25px !important"
                                    >
                                        <v-btn
                                            color="#FFA500"
                                            block
                                            class="mr-0"
                                            @click="register"
                                        >
                                            修改密码
                                        </v-btn>
                                    </v-col>
                                    <v-row justify="center">
                                        <v-col
                                            cols="12"
                                            style="
                                                text-align: center;
                                                margin-top: 3px;
                                                margin-bottom: 8px;
                                            "
                                            >不修改?<a
                                                @click="routerJump('/login')"
                                                href="javascript:;"
                                                >立即登录</a
                                            ></v-col
                                        >
                                    </v-row>
                                </v-row>
                            </v-container>
                        </v-form>
                    </material-card>
                </v-col>
            </v-row>
        </div>
        <!-- 弹出提示 -->
        <v-snackbar
            v-model="dialog.snackbar"
            top
            :timeout="1000"
            :color="snackbar.color"
        >
            {{ snackbar.message }}
        </v-snackbar>
    </v-app>
</template>
<script>
import materialCard from "../components/materialCard";
export default {
    components: {
        materialCard,
    },
    data() {
        return {
            show: false,
            user_name: "",
            password: "",
            auth: 2,
            items: ["管理员", "运动员"],
            select: "运动员",
            password_new: "",
            vcode: "",
            isvcode: "", //验证码
            snackbar: { message: "", color: "" }, //提示信息
        };
    },
    mounted() {
        this.getCode();
    },
    methods: {
        getCode() {
            // 定义一个数组来拼接
             var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','f','g','h','i','m','t','x','z','y','q']
            // 定义一个空字符串来进行拼接
            var str = "";
            for (var i = 0; i < 6; i++) {
                var num = Math.round(Math.random() * (23 - 0) + 0);
                // console.log(num);
                str += arr[num];
            }
            this.vcode = str;
        },
        register() {
            if (this.user_name == "") {
                this.dialog.snackbar = true;
                this.snackbar.message = "账号不能为空";
                this.snackbar.color = "warning";
            } 
            else if (this.password ==""|| this.password_new=="") {
                this.dialog.snackbar = true;
                this.snackbar.message = "密码或者确认密码不能为空";
                this.snackbar.color = "warning";
            }else if (this.password !== this.password_new) {
                this.dialog.snackbar = true;
                this.snackbar.message = "密码不一致";
                this.snackbar.color = "warning";
            } else if (
                this.password.length < 6 ||
                this.password_new.length < 6
            ) {
                this.dialog.snackbar = true;
                this.snackbar.message = "密码长度应大于等于6";
                this.snackbar.color = "warning";
            } else if (this.isvcode == "") {
                this.dialog.snackbar = true;
                this.snackbar.message = "请输入验证码";
                this.snackbar.color = "warning";
            } else if (this.isvcode != this.vcode) {
                this.dialog.snackbar = true;
                this.snackbar.message = "验证码错误";
                this.snackbar.color = "warning";
            } else {
                if (this.select == "运动员") {
                    this.auth = 2;
                } else {
                    this.auth = 1;
                }
                let params = {
                    username: this.user_name,
                    password: this.password,
                    auth: this.auth,
                };
                let params_one = {
                    username: this.user_name,
                    auth: this.auth,
                };
                this.post("getOneForget", params_one, (response) => {
                    if (response.code == 200) {
                        this.post("updatePwd", params, (response) => {
                            if (response.code == 200) {
                                this.toast(response);
                                setTimeout(() => {
                                    this.routerJump("/login");
                                }, 500);
                            }
                        });
                    } else {
                        this.toast(response);
                    }
                });
            }
        },
    },
};
</script>
<style lang="stylus" scoped>
.forget {
    background: url('~@/assets/images/bgr.jpg') no-repeat;
    background-size: 100% 100%;
    height: 100vh;
}

a {
    text-decoration: none;
}

.forget:hover {
    color: #0069D9 !important;
}
</style>
