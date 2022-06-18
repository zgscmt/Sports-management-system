<template>
    <div class="myApply">
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
                            v-model="selectForm.num"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.num`)"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >
                        <v-select
                            v-model="selectForm.category"
                            dense
                            :items="$t(`${mainHead}.categorys`)"
                            :label="$t(`${mainHead}.category`)"
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
                            v-model="selectForm.sportname"
                            dense
                            solo
                            :placeholder="$t(`${mainHead}.sportname`)"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="2"
                        md="2"
                        style="padding: 3px !important"
                    >
                        <v-btn
                            color="primary"
                            v-if="!bulForm.loading"
                            @click="search"
                        >
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
        <!-- 主要内 -->
        <material-card
            icon="mdi-clipboard-text"
            title="我的报名"
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
                    <v-btn
                        depressed
                        small
                        @click="editRecord(item.id)"
                        color="warning"
                        style="margin-right: 5px !important"
                        >{{ $t(`${mainHead}.edit`) }}</v-btn
                    >
                    <v-btn
                        depressed
                        small
                        @click="ensure(item.id)"
                        color="error"
                        style="margin-right: 5px !important"
                        >{{ $t(`${mainHead}.del`) }}</v-btn
                    >
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
        <!-- 修改报名内容 -->
        <v-dialog
            v-model="dialog.edit"
            max-width="600px"
            persistent
            no-click-animation
        >
            <v-card>
                <v-card-title>
                    <span class="headline">{{
                        $t(`${mainHead}.edit_dialog`)
                    }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    :label="$t(`${mainHead}.category`)"
                                    :items="items"
                                    v-model="editForm.category"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 田径 -->
                            <v-col cols="12" v-if="editForm.category == '田径'">
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="run"
                                    v-model="editForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 球类 -->
                            <v-col
                                cols="12"
                                v-else-if="editForm.category == '球类'"
                            >
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="ball"
                                    v-model="editForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 跳远 -->
                            <v-col
                                cols="12"
                                v-else-if="editForm.category == '跳远'"
                            >
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="longJump"
                                    v-model="editForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 跳高 -->
                            <v-col
                                cols="12"
                                v-else-if="editForm.category == '跳高'"
                            >
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="highJump"
                                    v-model="editForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 趣味运动会 -->
                            <v-col cols="12" v-else>
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="spice"
                                    v-model="editForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions style="padding-bottom: 20px !important">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" small @click="dialog.edit = false">{{
                        $t(`${mainHead}.btn_cancel`)
                    }}</v-btn>
                    <v-btn color="primary" small @click="sureEditRecord">{{
                        $t(`${mainHead}.btn_confirm`)
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 确认提示 -->
        <v-dialog v-model="dialog.confirm" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h7">
                    {{ $t(`${mainHead}.hint`) }}
                </v-card-title>
                <v-card-text>{{ $t(`${mainHead}.text`) }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        small
                        @click="dialog.confirm = false"
                    >
                        {{ $t(`${mainHead}.btn_cancel`) }}
                    </v-btn>
                    <v-btn color="primary" small @click="sureDel">
                        {{ $t(`${mainHead}.btn_confirm`) }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <go-up class="goup" />
    </div>
</template>
<script>
import MaterialCard from "../../components/materialCard.vue";
import goUp from "../../components/goUp.vue"
import storage from "good-storage";
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
            mainHead: "navMenu[5].children[1].prompt",
            total: 0, //数据总数
            pageCount: 0,
            paging: {
                //分页
                page_num: 1,
                page_size: 7,
            },
            confirm_id: 0, //删除id
            edit_id: 0, //修改id
            sportname: "",
            dialog: {
                confirm: false,
                edit: false,
            },
            spice: [], //趣味运动会
            run: [], //田径
            items: [], //类别
            ball: [], //球类
            highJump: [], //跳高
            longJump: [], //跳远
            editForm: {
                //修改的数据
                category: "",
                sportname: "",
            },
            selectForm: {
                num: "",
                category: "",
                sportname: "",
            },
            //搜索按钮
            bulForm: {
                loading: false,
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
                that.headers = that.$t("navMenu[5].children[1].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[5].children[1].headers");
    },
    methods: {
        //获取数据
        getData() {
            this.overlay = true;
            const sub_params = {
                page_num: this.paging.page_num,
                page_size: this.paging.page_size,
                uid:storage.get("uid")
            };
            const params = { ...sub_params, ...this.selectForm };
            this.post("getMyRecord", params, (response) => {
                if (response.code == 200) {
                    const tableData = response.data;
                    tableData.forEach((item) => {
                        if (item.num) item.num = `第${item.num}届`;
                        if (item.gender == 2) {
                            item.gender = "男";
                        } else {
                            item.gender = "女";
                        }
                        if (item.u_rank == "" || item.u_rank == null)
                            item.u_rank = "无";
                        if (item.score == "" || item.score == null)
                            item.score = "无";
                    });
                    this.dataList = tableData;
                    this.total = response.paging.total;
                    this.toast(response);
                    setTimeout(() => {
                        this.overlay = false;
                        this.bulForm.loading = false;
                    }, 500);
                }
            });
        },
        //获取数据
        editRecord(id) {
            this.edit_id = id;
            this.dialog.edit = true;
            const params = {
                id: id,
            };
            this.post("getIdRecord", params, (response) => {
                if (response.code == 200) {
                    this.editForm.category = response.data[0].category;
                    this.editForm.sportname = response.data[0].sportname;
                    this.getAllSports();
                }
            });
        },
        //获取所有的可报名的数据
        getAllSports() {
            this.post("getAllSports", {}, (response) => {
                if (response.code == 200) {
                    const allDatas = response.data;
                    allDatas.forEach((item) => {
                        this.items.push(item.category);
                        if (item.category == "田径")
                            this.run.push(item.sportname);
                        else if (item.category == "球类")
                            this.ball.push(item.sportname);
                        else if (item.category == "跳远")
                            this.longJump.push(item.sportname);
                        else if (item.category == "跳高")
                            this.highJump.push(item.sportname);
                        else this.spice.push(item.sportname);
                    });
                }
            });
        },
        //确定编辑记录
        sureEditRecord() {
            const params = {
                category: this.editForm.category,
                sportname: this.editForm.sportname,
                id: this.edit_id,
            };
            this.post("updateRecord", params, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    this.dialog.edit = false;
                    this.getData();
                }
            });
        },

        //确定删除
        ensure(id) {
            this.confirm_id = id;
            this.dialog.confirm = true;
        },
        sureDel() {
            const params = {
                id: this.confirm_id,
            };
            this.post("delRecord", params, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    this.dialog.confirm = false;
                    this.getData();
                }
            });
        },
        search() {
            if (this.selectForm.category == "所有")
                this.selectForm.category = "";
            this.paging.page_num = 1;
            this.bulForm.loading = true;
            this.getData();
        },
        //分页查询
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