<template>
    <div class="administrator">
        <v-row>
            <v-spacer> </v-spacer>
            <v-col cols="12" sm="1">
                <v-btn
                    depressed
                    small
                    color="primary"
                    @click="dialog.add = true"
                    >{{ $t(`${mainHead}.add`) }}</v-btn
                >
            </v-col>
        </v-row>
        <material-card
            icon="mdi-clipboard-text"
            title="管理员"
            class="px-5 py-3"
            color="success"
            style="margin-top: 40px !important"
        >
            <!-- 加载遮罩层 -->
            <v-overlay
                :value="overlay"
                color="#fff"
                :absolute="true"
                opacity="0.9"
            >
                <v-progress-circular
                    indeterminate
                    color="blue"
                    size="32"
                ></v-progress-circular>
            </v-overlay>
            <v-data-table
                :headers="headers"
                :items="dataList"
                class="elevation-1"
                hide-default-footer
            >
                <template v-slot:item.operation="{ item }">
                
                        <v-btn
                           v-if="item.username == auth_username"
                            depressed
                            small
                            @click="adminEdit(item.id)"
                            color="warning"
                            style="margin-left: 2px; margin-right: 2px"
                            >{{ $t(`${mainHead}.data_update`) }}</v-btn
                        >
                        
                        <v-btn
                             v-else
                            disabled
                            depressed
                            small
                            @click="adminEdit(item.id)"
                            color="warning"
                            style="margin-left: 2px; margin-right: 2px"
                            >{{ $t(`${mainHead}.data_update`) }}</v-btn
                        >
                        <v-btn
                            v-if="item.username == auth_username"
                            depressed
                            small
                            @click="adminDel(item.id)"
                            color="error"
                            >{{ $t(`${mainHead}.data_del`) }}</v-btn
                        >           
                        <v-btn
                            v-else
                            disabled
                            depressed
                            small
                            @click="adminDel(item.id)"
                            color="error"
                            >{{ $t(`${mainHead}.data_del`) }}</v-btn
                        > 
                   
                </template>
            </v-data-table>
        </material-card>
        <!-- 弹出提示 -->
        <v-snackbar
            v-model="dialog.snackbar"
            top
            :timeout="1000"
            :color="snackbar.color"
        >
            {{ snackbar.message }}
        </v-snackbar>
        <!-- 增加数据 -->
        <v-dialog v-model="dialog.add" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ $t(`${mainHead}.add`) }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    prepend-inner-icon="mdi-card-account-details"
                                    :label="$t(`${mainHead}.select`)"
                                    :items="items"
                                    v-model="addForm.select"
                                    solo
                                    disabled
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :label="$t(`${mainHead}.username`)"
                                    solo
                                    v-model="addForm.username"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :label="$t(`${mainHead}.password`)"
                                    solo
                                    v-model="addForm.password"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="
                                        show ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    @click:append="show = !show"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :label="$t(`${mainHead}.new_password`)"
                                    solo
                                    v-model="addForm.new_password"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="
                                        show ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    @click:append="show = !show"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" small @click="dialog.add = false">{{
                        $t(`${mainHead}.btn_cancel`)
                    }}</v-btn>
                    <v-btn color="primary" small @click="addAdmin">{{
                        $t(`${mainHead}.btn_confirm`)
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 修改数据 -->
        <v-dialog v-model="dialog.edit" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{
                        $t(`${mainHead}.data_update`)
                    }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    prepend-inner-icon="mdi-card-account-details"
                                    :label="$t(`${mainHead}.select`)"
                                    :items="items"
                                    v-model="editForm.select"
                                    solo
                                    disabled
                                ></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :label="$t(`${mainHead}.username`)"
                                    solo
                                    v-model="editForm.username"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :label="$t(`${mainHead}.password`)"
                                    solo
                                    v-model="editForm.password"
                                    :type="show ? 'text' : 'password'"
                                    :append-icon="
                                        show ? 'mdi-eye' : 'mdi-eye-off'
                                    "
                                    @click:append="show = !show"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" small @click="dialog.edit = false">{{
                        $t(`${mainHead}.btn_cancel`)
                    }}</v-btn>
                    <v-btn color="primary" small @click="sureEdit">{{
                        $t(`${mainHead}.btn_confirm`)
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import MaterialCard from "../../components/materialCard.vue";
export default {
    components: {
        MaterialCard,
    },
    data() {
        return {
            dataList: [], //数据
            headers: [], //table 标题
            overlay: false,
            snackbar: { message: "", color: "" },
            mainHead: "navMenu[4].children[0].prompt",
            items: ["管理员", "运动员"],
            username: "", //控制权限
            auth_username:"",
            show: false, //密码展示
            dialog: {
                add: false, //新增
                edit: false, //编辑
            },
            //新增参数
            addForm: {
                select: this.$t("navMenu[4].children[0].prompt.select"),
                username: "",
                password: "",
                new_password: "",
            },
            editForm: {
                select: this.$t("navMenu[4].children[0].prompt.select"),
                username: "",
                password: "",
                id: "",
            },
        };
    },
    activated() {
        this.getData();
    },
    mounted() {
        var that = this;
        that.username = window.localStorage.getItem("username");
        window.addEventListener("setItem", function (e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[4].children[0].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[4].children[0].headers");
    },

    methods: {
        //获取数据
        getData() {
            this.overlay = true;
            this.post("getAllAdmin", {}, (response) => {
                if (response.code == 200) {
                    let tableData = response.data;
                    let auth_username=window.localStorage.getItem("username");
                    //去掉引号
                    this.auth_username=auth_username.substring(1,auth_username.length-1);
                    tableData.forEach((item) => {
                        if (item.auth == 1) item.auth = "管理员";
                        const hidePwd = item.password;
                        item.password = this.hideValue(hidePwd, 1, 1, "*");
                    });
                    this.dataList = tableData;
                    setTimeout(() => {
                        this.overlay = false;
                    }, 500);

                    this.toast(response);
                } else {
                    this.toast(response);
                }
            });
        },
        // 新增数据
        addAdmin() {
            const params = {
                username: this.addForm.username,
                password: this.addForm.password,
                auth: 1,
            };
            if (this.addForm.password !== this.addForm.new_password) {
                this.dialog.snackbar = true;
                this.snackbar.message = "密码不一致";
                this.snackbar.color = "error";
            } else if (
                this.addForm.password.length < 6 ||
                this.addForm.new_password.length < 6
            ) {
                this.dialog.snackbar = true;
                this.snackbar.message = "密码长度小于6位";
                this.snackbar.color = "warning";
            } else {
                this.post("register", params, (response) => {
                    if (response.code == 200) {
                        this.dialog.add = false;
                        this.toast(response);
                        this.getData();
                    }
                });
            }
        },
        //编辑数据
        adminEdit(id) {
            const params = {
                id: id,
            };
            this.dialog.edit = true;
            this.editForm.id = id;
            this.post("getOneAdmin", params, (response) => {
                if ((response.code = 200)) {
                    this.editForm.username = response.data[0].username;
                    this.editForm.password = response.data[0].password;
                    //console.log(this.editForm.password)
                }
            });
        },
        //确定编辑
        sureEdit() {
            const params = {
                username: this.editForm.username,
                password: this.editForm.password,
                id: this.editForm.id,
            };
            if (params.password.length < 6) {
                this.dialog.snackbar = true;
                this.snackbar.message = "密码长度小于6位";
                this.snackbar.color = "warning";
            } else {
                this.post("editAdmin", params, (response) => {
                    if ((response.code = 200)) {
                        this.toast(response);
                        this.dialog.edit = false;
                        setTimeout(() => {
                            this.getData();
                        }, 1000);
                    }
                });
            }
        },
        //删除数据
        adminDel(id) {
            const params = {
                id: id,
            };
            this.post("delAdmin", params, (response) => {
                if ((response.code = 200)) {
                    this.toast(response);
                    setTimeout(() => {
                        this.getData();
                    }, 1000);
                }
            });
        },
    },
};
</script>