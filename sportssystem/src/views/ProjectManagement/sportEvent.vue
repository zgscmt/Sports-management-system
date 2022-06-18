<template>
    <div class="sportEvent">
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
            <v-col cols="12" sm="1" v-if="start_end == 0">
                <v-btn depressed small color="success" @click="setStart">{{
                    $t(`${mainHead}.start`)
                }}</v-btn>
            </v-col>
            <v-col cols="12" sm="1" v-if="start_end == 1" @click="setEnd">
                <v-btn depressed small color="warning">{{
                    $t(`${mainHead}.end`)
                }}</v-btn>
            </v-col>
        </v-row>
        <material-card
            icon="mdi-clipboard-text"
            title="运动项目"
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
                        @click="userEdit(item.id)"
                        color="warning"
                        style="margin-right: 5px !important"
                        >{{ $t(`${mainHead}.edit`) }}</v-btn
                    >
                    <v-btn
                        depressed
                        small
                        @click="userDel(item.id)"
                        color="error"
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
        <!-- 新增信息 -->
        <v-dialog
            v-model="dialog.add"
            max-width="600px"
            persistent
            no-click-animation
        >
            <v-card>
                <v-card-title>
                    <span class="headline">{{ $t(`${mainHead}.add`) }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    :label="$t(`${mainHead}.category`)"
                                    :items="$t(`${mainHead}.items`)"
                                    v-model="addForm.category"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 田径 -->
                            <v-col cols="12" v-if="addForm.category == '田径'">
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="$t(`${mainHead}.run`)"
                                    v-model="addForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 球类 -->
                            <v-col
                                cols="12"
                                v-else-if="addForm.category == '球类'"
                            >
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="$t(`${mainHead}.ball`)"
                                    v-model="addForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 跳远 -->
                            <v-col
                                cols="12"
                                v-else-if="addForm.category == '跳远'"
                            >
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="$t(`${mainHead}.longJump`)"
                                    v-model="addForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 跳高 -->
                            <v-col
                                cols="12"
                                v-else-if="addForm.category == '跳高'"
                            >
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="$t(`${mainHead}.highJump`)"
                                    v-model="addForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 趣味运动会 -->
                            <v-col cols="12" v-else>
                                <v-text-field
                                    :label="$t(`${mainHead}.sportname`)"
                                    v-model="spice_sport"
                                    solo
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions style="padding-bottom: 20px !important">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" small @click="dialog.add = false">{{
                        $t(`${mainHead}.btn_cancel`)
                    }}</v-btn>
                    <v-btn color="primary" small @click="sureAddSport">{{
                        $t(`${mainHead}.btn_confirm`)
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 修改信息 -->
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
                                    :items="$t(`${mainHead}.items`)"
                                    v-model="editForm.category"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 田径 -->
                            <v-col cols="12" v-if="editForm.category == '田径'">
                                <v-select
                                    :label="$t(`${mainHead}.sportname`)"
                                    :items="$t(`${mainHead}.run`)"
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
                                    :items="$t(`${mainHead}.ball`)"
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
                                    :items="$t(`${mainHead}.longJump`)"
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
                                    :items="$t(`${mainHead}.highJump`)"
                                    v-model="editForm.sportname"
                                    solo
                                ></v-select>
                            </v-col>
                            <!-- 趣味运动会 -->
                            <v-col cols="12" v-else>
                                <v-text-field
                                    :label="$t(`${mainHead}.sportname`)"
                                    v-model="spice_sport"
                                    solo
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions style="padding-bottom: 20px !important">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" small @click="dialog.edit = false">{{
                        $t(`${mainHead}.btn_cancel`)
                    }}</v-btn>
                    <v-btn color="primary" small @click="sureEditSport">{{
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
            start_end: 1, //设置开始报名或者结束报名的标志
            number: 1, //设置第几届运动会
            overlay: false,
            snackbar: { message: "", color: "" },
            mainHead: "navMenu[1].children[0].prompt",
            dialog: {
                add: false,
                edit: false, //编辑
            },
            spice_sport: "", //趣味运动会
            addForm: {
                //新增
                category: "",
                sportname: "",
                auth: 1,
                hide:0,
                num:0,
                msg:0
            },
            editForm: {
                category: "",
                sportname: "",
            },
            edit_id: 0, //需要修改的id
            total: 0, //数据总数
            pageCount: 0,
            paging: {
                //分页
                page_num: 1,
                page_size: 8,
            },
        };
    },
    activated() {
        this.getStatus();
        this.getData();
    },
    mounted() {
        var that = this;
        window.addEventListener("setItem", function (e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[1].children[0].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[1].children[0].headers");
    },
    methods: {
        //获取数据
        getData() {
            this.overlay = true;
            this.post("getProjects", this.paging, (response) => {
                if (response.code == 200) {
                    this.dataList = response.data;
                    this.total = response.paging.total;
                    setTimeout(() => {
                        this.overlay = false;
                    }, 500);
                }
            });
        },
        getStatus() {
            const params = {
                id: 1,
            };
            this.post("getLastSport", params, (response) => {
                if (response.code == 200) {
                    this.start_end = response.data[0].msg;
                    this.number = response.data[0].num;
                    this.addForm.hide=response.data[0].msg;
                    this.addForm.msg=response.data[0].msg;
                    this.addForm.num=response.data[0].num;

                }
            });
        },
        //开始报名
        setStart() {
            this.post("setStart",{}, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    this.getStatus();
                }
            });
        },
        //结束报名
        setEnd() {
            const new_number = parseInt(this.number) + 1;
            const params = {
                num: new_number,
            };
            this.post("setEnd", params, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    this.getStatus();
                }
            });
        },
        //结束报名
        //新增项目
        sureAddSport() {
            if (this.addForm.category == "趣味运动") {
                this.addForm.sportname = this.spice_sport;
            }
            this.post("addSport", this.addForm, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    this.dialog.add = false;
                    this.getData();
                }
            });
        },
        //编辑运动会信息
        userEdit(id) {
            this.dialog.edit = true;
            this.edit_id = id;
            const params = {
                id: id,
            };
            this.post("getOneSport", params, (response) => {
                if (response.code == 200) {
                    this.editForm.category = response.data[0].category;
                    if (this.editForm.category == "趣味运动") {
                        this.spice_sport = response.data[0].sportname;
                    } else {
                        this.editForm.sportname = response.data[0].sportname;
                    }
                }
            });
        },
        //确定修改
        sureEditSport() {
            if (this.editForm.category == "趣味运动") {
                this.editForm.sportname = this.spice_sport;
            }
            const params = {
                id: this.edit_id,
                category: this.editForm.category,
                sportname: this.editForm.sportname,
                auth: 1,
            };
            this.post("editSport", params, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    this.dialog.edit = false;
                    this.getData();
                }
            });
        },
        userDel(id) {
            const params = {
                id: id,
            };
            this.post("delSport", params, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    this.getData();
                }
            });
        },
        //分页查询
        pagination(e) {
            this.paging.page_num = e.page;
            this.getData();
        },
    },
};
</script>