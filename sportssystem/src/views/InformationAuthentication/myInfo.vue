<template>
    <div class="myInfo">
        <!-- 弹出提示 -->
        <v-snackbar
            v-model="dialog.snackbar"
            top
            :timeout="1000"
            :color="snackbar.color"
        >
            {{ snackbar.message }}
        </v-snackbar>
        <!-- 加载遮罩层 -->
        <v-overlay :value="overlay" color="#fff" :absolute="true" opacity="0.9">
            <v-progress-circular
                indeterminate
                color="blue"
                size="32"
            ></v-progress-circular>
        </v-overlay>
        <!-- 完善信息 -->
        <v-dialog
            v-model="dialog.perfect"
            max-width="600px"
            persistent
            no-click-animation
        >
            <v-card>
                <v-card-title>
                    <span class="headline" v-show="identify == 0">{{
                        $t(`${mainHead}.add`)
                    }}</span>
                    <span class="headline" v-show="identify == 1">{{
                        $t(`${mainHead}.update`)
                    }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    :label="$t(`${mainHead}.occupation`)"
                                    :items="$t(`${mainHead}.items`)"
                                    v-model="addForm.occupation"
                                    solo
                                ></v-select>
                                <v-select
                                    style="
                                        margin-top: -10px !important;
                                        margin-bottom: -18px !important;
                                    "
                                    :label="$t(`${mainHead}.department`)"
                                    :items="$t(`${mainHead}.departments`)"
                                    v-model="addForm.department"
                                    solo
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    style="
                                        margin-top: -10px !important;
                                        margin-bottom: -18px !important;
                                    "
                                    :label="$t(`${mainHead}.grade`)"
                                    :items="$t(`${mainHead}.grades`)"
                                    v-model="addForm.grade"
                                    solo
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    style="
                                        margin-top: -10px !important;
                                        margin-bottom: -18px !important;
                                    "
                                    :label="$t(`${mainHead}.class`)"
                                    solo
                                    v-model="addForm.class"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    style="
                                        margin-top: -10px !important;
                                        margin-bottom: -18px !important;
                                    "
                                    :label="$t(`${mainHead}.sid`)"
                                    solo
                                    v-model="addForm.sid"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    style="
                                        margin-top: -10px !important;
                                        margin-bottom: -18px !important;
                                    "
                                    :label="$t(`${mainHead}.realname`)"
                                    solo
                                    v-model="addForm.realname"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    style="
                                        margin-top: -10px !important;
                                        margin-bottom: -18px !important;
                                    "
                                    :label="$t(`${mainHead}.gender`)"
                                    :items="$t(`${mainHead}.genders`)"
                                    v-model="addForm.gender"
                                    solo
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    style="
                                        margin-top: -10px !important;
                                        margin-bottom: -18px !important;
                                    "
                                    :label="$t(`${mainHead}.idcard`)"
                                    solo
                                    v-model="addForm.idcard"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    style="
                                        margin-top: -15px !important;
                                        margin-bottom: -30px !important;
                                    "
                                    :label="$t(`${mainHead}.phone`)"
                                    solo
                                    v-model="addForm.phone"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions style="padding-bottom: 20px !important">
                    <v-spacer></v-spacer>
                    <v-btn
                        v-show="identify == 1"
                        color="primary"
                        small
                        @click="dialog.perfect = false"
                        >{{ $t(`${mainHead}.btn_cancel`) }}</v-btn
                    >
                    <v-btn color="primary" small @click="updataUser">{{
                        $t(`${mainHead}.btn_confirm`)
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 展示信息 -->
        <v-card class="mx-auto" max-width="800">
            <v-toolbar color="primary" dark>
                <v-toolbar-title>{{
                    $t(`${mainHead}.myInfo`)
                }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                    class="ma-2"
                    right
                    small
                    color="warning"
                    @click="dialog.perfect = true"
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list rounded>
                <v-list-item-group v-model="selectedItem" color="primary">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.occupation"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.sid"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.realname"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.gender"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.department"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.grade"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.class"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.idcard"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="addForm.phone"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>
<script>
import storage from "good-storage";
export default {
    data() {
        return {
            mainHead: "navMenu[7].children[0].prompt",
            dialog: {
                perfect: false,
                snackbar: false,
            },
            snackbar: {
                message: "",
                color: "",
            },
            identify: "", //认证
            addForm: {
                occupation: "",
                department: "",
                grade: "",
                class: "",
                sid: "",
                realname: "",
                gender: "",
                idcard: "",
                phone: "",
                username: "",
            },
            tableData: [],
            selectedItem: 0,
            overlay: false,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        //获取信息
        getData() {
            this.identify = storage.get("identify");
            if (this.identify == 0) {
                this.dialog.perfect = true;
            } else {
                this.addForm.username = storage.get("username");
                const params = {
                    username: this.addForm.username,
                    auth: 2,
                };
                this.overlay = true;
                this.post("getOne", params, (response) => {
                    if (response.code == 200) {
                        this.addForm = response.data[0];
                        if (this.addForm.gender == 2)
                            this.addForm.gender = "男";
                        else this.addForm.gender = "女";
                        setTimeout(() => {
                            this.overlay = false;
                        }, 500);
                    }
                });
            }
        },
        //提示信息的公共方法
        commonToast() {
            this.dialog.snackbar = true;
            this.snackbar.color = "warning";
        },
        //完善及更改信息
        updataUser() {
            if (this.addForm.occupation == "") {
                this.commonToast();
                this.snackbar.message = "请输入您的职业";
            } else if (this.addForm.department == "") {
                this.commonToast();
                this.snackbar.message = "请输入院系名称";
            } else if (this.addForm.grade == "") {
                this.commonToast();
                this.snackbar.message = "请输入年级";
            } else if (
                this.addForm.class == "" &&
                this.addForm.occupation == "学生"
            ) {
                this.commonToast();
                this.snackbar.message = "请输入您的班级";
            } else if (
                this.addForm.class == "" &&
                this.addForm.occupation == "教师"
            ) {
                this.commonToast();
                this.snackbar.message = "请输入您的教研组";
            } else if (this.addForm.sid == "") {
                this.commonToast();
                this.snackbar.message = "请输入你的学号或工号";
            } else if (this.addForm.realname == "") {
                this.commonToast();
                this.snackbar.message = "请输入您的姓名";
            } else if (this.addForm.gender == "") {
                this.commonToast();
                this.snackbar.message = "请输选择您的性别";
            } else if (this.addForm.idcard == "") {
                this.commonToast();
                this.snackbar.message = "请输入您的身份证号码";
            } else if (this.addForm.phone == "") {
                this.commonToast();
                this.snackbar.message = "请输入您的手机号";
            } else {
                if (!this.isCard(this.addForm.idcard)) {
                    this.commonToast();
                    this.snackbar.message = "请输入正确的身份证号码";
                } else if (!this.isPhone(this.addForm.phone)) {
                    this.commonToast();
                    this.snackbar.message = "请输入正确的手机号码";
                } else {
                    this.addForm.username = storage.get("username");
                    if (this.addForm.gender == "男") this.addForm.gender = 2;
                    else this.addForm.gender = 1;
                    this.post("identify", this.addForm, (response) => {
                        if (response.code == 200) {
                            this.dialog.perfect = false;
                            this.toast(response);
                            //信息展示出来
                            if (this.addForm.gender == 2)
                                this.addForm.gender = "男";
                            else this.addForm.gender = "女";
                            if (this.identify == 0) {
                                location.reload();
                            }
                            this.$addStorageEvent(1, "identify", 1);
                        }
                    });
                }
            }
        },
    },
};
</script>