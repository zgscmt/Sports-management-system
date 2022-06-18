<template>
    <v-app>
        <div class="register">
            <v-row cols="6" justify="center" style="margin-top: 15vh">
                <v-col cols="12" md="4">
                    <material-card color="#FFA500">
                        <template v-slot:heading class="bgColor">
                            <div
                                class="display-2 font-weight-light"
                                style="text-align: center"
                            >
                                欢迎注册
                            </div>

                            <div
                                class="subtitle-1 font-weight-light"
                                style="text-align: center"
                            >
                                Welcome to register for the Games Management
                                system
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
                                            disabled
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" style="padding-top: 0px">
                                        <v-text-field
                                            v-model="user_name"
                                            prepend-inner-icon="mdi-account"
                                            placeholder="请输入账号"
                                            solo
                                        />
                                    </v-col>
                                    <v-col cols="12" style="padding-top: 0px">
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
                                    <v-col cols="12" style="padding-top: 0px">
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

                                    <v-col cols="12" style="margin-top: -25px">
                                        <v-btn
                                            color="#FFA500"
                                            block
                                            class="mr-0"
                                            @click="register"
                                        >
                                            立即注册
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
                                            >已有账号？<a
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
            snackbar: { message: "", color: "" }, //提示信息
        };
    },
    methods: {
        register() {
            if (this.password !== this.password_new) {
                this.dialog.snackbar = true;
                this.snackbar.message = "密码不一致";
                this.snackbar.color = "error";
            }else if(this.password.length<6 || this.password_new.length<6 ){
                this.dialog.snackbar = true;
                this.snackbar.message = "密码长度应大于等于6";
                this.snackbar.color = "warning";
            }
             else {
                let params = {
                    username: this.user_name,
                    password: this.password,
                    auth: this.auth,
                };
                this.post("register", params, (response) => {
                    if (response.code == 200) {
                        this.toast(response);
                        setTimeout(() => {
                            this.routerJump("/login");
                        }, 500);
                    }
                });
            }
        },
    },
};
</script>
<style lang="stylus" scoped>
.register {
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
