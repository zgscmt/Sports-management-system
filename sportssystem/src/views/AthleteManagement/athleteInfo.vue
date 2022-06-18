<template>
    <div class="athletelInfo">
        <!-- 搜索框搜索数据 -->
        <v-form>
            <v-container fluid>
                <v-row>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >
                        <v-text-field
                            v-model="selectForm.sid"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.sid`)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" md="2" style="padding: 3px">
                        <v-text-field
                            v-model="selectForm.realname"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.realname`)"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >
                        <v-select
                            v-model="selectForm.gender"
                            dense
                            :items="$t(`${mainHead}.genders`)"
                            :label="$t(`${mainHead}.gender`)"
                            solo
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >
                        <v-select
                            v-model="selectForm.occupation"
                            dense
                            :items="$t(`${mainHead}.items`)"
                            :label="$t(`${mainHead}.occupation`)"
                            solo
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >
                        <v-select
                            v-model="selectForm.department"
                            dense
                            :items="$t(`${mainHead}.departments`)"
                            :label="$t(`${mainHead}.department`)"
                            solo
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >
                        <v-text-field
                            v-model="selectForm.grade"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.grade`)"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >
                        <v-text-field
                            v-model="selectForm.class"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.class`)"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >  
                        <v-btn color="primary" v-if="!bulForm.loading"  @click="search">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            {{ $t(`${mainHead}.btn`) }}
                        </v-btn>
                         <v-btn v-if="bulForm.loading" color="primary">
                           <i class="fa fa-spinner fa-spin"></i>
                            {{ $t(`${mainHead}.btn`) }}
                        </v-btn> 
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <!-- 数据显示 -->
        <material-card
            icon="mdi-clipboard-text"
            title="运动员"
            class="px-5 py-3"
            color="success"
            style="margin-top: 40px !important"
        >
            <!-- 加载遮罩层 -->
            <v-overlay
                :value="overlay"
                color="#fff"
                :absolute="true"
                opacity="1"
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
                disable-sort
                :page.sync="paging.page_num"
                :items-per-page="paging.page_size"
                :server-items-length="total"
                @page-count="pageCount = $event"
                @pagination="pagination"
            >
                <template v-slot:item.operation="{ item }">
                    <div
                        style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        "
                    >
                        <v-btn
                            depressed
                            small
                            @click="userEdit(item.uid)"
                            color="warning"
                            style="margin-right: 5px !important"
                            >{{ $t(`${mainHead}.data_update`) }}</v-btn
                        >
                        <v-btn
                            depressed
                            small
                            @click="userDel(item.uid)"
                            color="error"
                            >{{ $t(`${mainHead}.data_del`) }}</v-btn
                        >
                    </div>
                </template>
            </v-data-table>
            <div
                class="text-center pt-2"
                style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                "
            >
                <p style="text-align: center; margin-bottom: 0px">
                    共{{ total }}条
                </p>
                <v-pagination
                    v-model="paging.page_num"
                    :length="pageCount"
                    :total-visible="7"
                ></v-pagination>
            </div>
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
        <!-- 完善信息 -->
        <v-dialog
            v-model="dialog.edit"
            max-width="600px"
            persistent
            no-click-animation
        >
            <v-card>
                <v-card-title>
                    <span class="headline">{{ $t(`${mainHead}.edit`) }}</span>
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
                    <v-btn color="primary" small @click="dialog.edit = false">{{
                        $t(`${mainHead}.btn_cancel`)
                    }}</v-btn>
                    <v-btn color="primary" small @click="sureEdit">{{
                        $t(`${mainHead}.btn_confirm`)
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
       <go-up class="goup" />
    </div>
</template>
<script>
import MaterialCard from "../../components/materialCard.vue";
import goUp from "../../components/goUp.vue"
export default {
    components: {
        MaterialCard,
        goUp
    },
    data() {
        return {
            dataList: [], //数据
            headers: [], //table 标题
            overlay: false,
            snackbar: { message: "", color: "" },
            mainHead: "navMenu[0].children[0].prompt",
            items: ["管理员", "运动员"],
            username: "", //控制权限
            show: false, //密码展示
            dialog: {
                edit: false, //编辑
                snackbar: false,
            },
            addForm: {
                //编辑信息
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
            selectForm: {
                sid: "",
                realname: "",
                gender: "",
                occupation: "",
                department: "",
                grade: "",
                class: "",
            },
            bulForm: {
                loading: false,
            },
            total: 0, //数据总数
            pageCount: 0,
            paging: {
                page_num: 1,
                page_size: 7,
            },
        };
    },
    activated() {
        this.getData();
    },
    mounted() {
        var that = this;
        window.addEventListener("setItem", function (e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[0].children[0].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[0].children[0].headers");
    },
    methods: {
        //获取数据
        getData() {
            this.overlay = true;
            this.selectForm = { ...this.selectForm, ...this.paging };
            this.post("getUsers", this.selectForm, (response) => {
                if (response.code == 200) {
                    let tableData = response.data;
                    tableData.forEach((item) => {
                        const hide_idcard = item.idcard;
                        const hide_phone = item.phone;
                        item.idcard = this.hideValue(hide_idcard, 6, 4, "*");
                        item.phone = this.hideValue(hide_phone, 3, 4, "*");
                        if (item.gender == 2) item.gender = "男";
                        else if (item.gender == 1) item.gender = "女";
                        else item.gender = "";
                    });
                    this.dataList = tableData;
                    this.total = response.paging.total;
                    setTimeout(() => {
                        this.overlay = false;
                        this.bulForm.loading = false;
                    }, 500);
                    this.toast(response);
                } else {
                    this.toast(response);
                }
            });
        },
        //提示信息的公共方法
        commonToast() {
            this.dialog.snackbar = true;
            this.snackbar.color = "warning";
        },
        //编辑数据
        userEdit(id) {
            const params = {
                uid: id,
            };
            this.dialog.edit = true;
            this.post("getOneUser", params, (response) => {
                if (response.code == 200) {
                    this.addForm = response.data[0];
                    this.addForm.username = response.data[0].username;
                    if (this.addForm.gender == 2) this.addForm.gender = "男";
                    else this.addForm.gender = "女";
                }
            });
        },
        //确定编辑
        sureEdit() {
            if (this.addForm.occupation == null) {
                this.commonToast();
                this.snackbar.message = "职业信息不能为空";
            } else if (this.addForm.department == null) {
                this.commonToast();
                this.snackbar.message = "院系名称不能为空";
            } else if (this.addForm.grade == null) {
                this.commonToast();
                this.snackbar.message = "年级不能为空";
            } else if (
                this.addForm.class == null &&
                this.addForm.occupation == "学生"
            ) {
                this.commonToast();
                this.snackbar.message = "班级不能为空";
            } else if (
                this.addForm.class == null &&
                this.addForm.occupation == "教师"
            ) {
                this.commonToast();
                this.snackbar.message = "教研组不能为空";
            } else if (this.addForm.sid == null) {
                this.commonToast();
                this.snackbar.message = "的学号或工号不能为空";
            } else if (this.addForm.realname == null) {
                this.commonToast();
                this.snackbar.message = "姓名不能为空";
            } else if (this.addForm.gender == null) {
                this.commonToast();
                this.snackbar.message = "性别不能为空";
            } else if (this.addForm.idcard == null) {
                this.commonToast();
                this.snackbar.message = "身份证号码不能为空";
            } else if (this.addForm.phone == null) {
                this.commonToast();
                this.snackbar.message = "手机号不能为空";
            } else {
                if (!this.isCard(this.addForm.idcard)) {
                    this.commonToast();
                    this.snackbar.message = "请输入正确的身份证号码";
                } else if (!this.isPhone(this.addForm.phone)) {
                    this.commonToast();
                    this.snackbar.message = "请输入正确的手机号码";
                } else {
                    if (this.addForm.gender == "男") this.addForm.gender = 2;
                    else this.addForm.gender = 1;
                    this.post("identify", this.addForm, (response) => {
                        if (response.code == 200) {
                            this.dialog.edit = false;
                            this.toast(response);
                            this.getData();
                        }
                    });
                }
            }
        },
        //删除数据
        userDel(id) {
            const params = {
                uid: id,
            };
            this.post("delUser", params, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    setTimeout(() => {
                        this.getData();
                    }, 1000);
                }
            });
        },
        //查询
        search() {
            this.paging.page_num = 1;
            this.bulForm.loading=true;
             if(this.selectForm.gender == "女") this.selectForm.gender = 1;
            else if (this.selectForm.gender == "男") this.selectForm.gender = 2;
            else this.selectForm.gender="";
            if(this.selectForm.department=="所有") this.selectForm.department="";
            if(this.selectForm.occupation=="所有") this.selectForm.occupation="";
            this.getData();

        },
        pagination(e) {
            this.paging.page_num = e.page;
            this.getData();
        },
    },
};
</script>
<style lang="stylus" scoped>
.goup{
    position :fixed;
    bottom:10px;
    right:10px
}
</style>