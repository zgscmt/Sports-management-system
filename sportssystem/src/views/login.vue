<template>
    <v-app>
        <div class="login">
            <v-row justify="center" style="margin-top: 21vh">
                <v-col cols="12" md="4">
                    <material-card color="blue">
                        <template v-slot:heading>
                            <div
                                class="display-2 font-weight-light"
                                style="text-align: center"
                            >
                                欢迎登录
                            </div>

                            <div
                                class="subtitle-1 font-weight-light"
                                style="text-align: center"
                            >
                                Welcome to the games management system
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
                                    <v-col cols="12" style="padding-top: 0px">
                                        <v-text-field
                                            v-model="username"
                                            prepend-inner-icon="mdi-account"
                                            placeholder="请输入账号"
                                            solo
                                        />
                                    </v-col>
                                    <v-col cols="12" style="padding-top: 0px">
                                        <v-text-field
                                            prepend-inner-icon="mdi-lock"
                                            v-model="password"
                                            placeholder="请输入密码"
                                            :type="show ? 'text' : 'password'"
                                            :append-icon="
                                                show ? 'mdi-eye' : 'mdi-eye-off'
                                            "
                                            solo
                                            @click:append="show = !show"
                                        />
                                    </v-col>

                                    <v-row justify="center">
                                        <v-col
                                            cols="6"
                                            style="
                                                text-align: center;
                                                padding-top: 0px;
                                            "
                                            ><a
                                                href="javascript:;"
                                                @click="forget()"
                                                class="forget"
                                                style="color: gray"
                                                >忘记密码？</a
                                            ></v-col
                                        >
                                        <v-col
                                            cols="6"
                                            style="
                                                text-align: center;
                                                padding-top: 0px;
                                            "
                                            >没有账号？<a
                                                href="javascript:;"
                                                @click="routerJump('/register')"
                                                >立即注册</a
                                            ></v-col
                                        >
                                    </v-row>
                                    <v-col cols="12">
                                        <v-btn
                                            color="blue"
                                            block
                                            class="mr-0"
                                            @click="login"
                                            @keyup.enter="keyDown(e)"
                                        >
                                            立即登录
                                        </v-btn>
                                    </v-col>
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
import stroage from "good-storage";
export default {
    components: {
        materialCard,
    },
    data() {
        return {
            show: false,
            username: "",
            password: "",
            select: "管理员",
            auth: 1,
            snackbar: { message: "", color: "" }, //提示信息
            items: ["管理员", "运动员"],
        };
    },
    mounted() {
        window.addEventListener("keydown", this.keyDown);
    },
    destroyed() {
        // 销毁事件
        window.removeEventListener("keydown", this.keyDown, false);
    },
    methods: {
        login() {
            if (this.select == "管理员") this.auth = 1;
            else this.auth = 2;
            let params = {
                username: this.username,
                password: this.password,
                auth: this.auth,
            };
            this.post("login", params, (response) => {
                if (response.code == 200) {
                    stroage.set("sports_token", response.token);
                    stroage.set("username", response.data[0].username); //用户名
                    stroage.set("uid", response.data[0].uid); //用户名
                    stroage.set("auth", response.data[0].auth); //存储权限
                    stroage.set("identify", response.data[0].identify); //是否认证
                    this.toast(response);
                    setTimeout(() => {
                        this.routerJump("/index");
                    }, 500);
                } else {
                    this.toast(response);
                }
            });
        },
        // 点击回车键登录
        keyDown(e) {
            // 回车则执行登录方法 enter键的ASCII是13
            if (e.keyCode == 13) {
                this.login(); // 定义的登录方法
            }
        },
        forget() {
            this.routerJump("/forget");
        },
    },
};
</script>
<style lang="stylus" scoped>
.login {
    background: url('~@/assets/images/bgs.jpg') no-repeat;
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
