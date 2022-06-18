<template>
    <div class="announce">
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
            title="发布公告"
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
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                        "
                    >
                        <v-btn
                            depressed
                            small
                            @click="userEdit(item.id)"
                            style="margin-right: 2px"
                            color="warning"
                            >{{ $t(`${mainHead}.edit`) }}</v-btn
                        >
                        <v-btn
                            depressed
                            small
                            @click="userDel(item.id)"
                            color="error"
                            >{{ $t(`${mainHead}.del`) }}</v-btn
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
                                <v-text-field
                                    :label="$t(`${mainHead}.title`)"
                                    v-model="addForm.title"
                                    solo
                                />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :label="$t(`${mainHead}.content`)"
                                    v-model="addForm.content"
                                    solo
                                />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    disabled
                                    :label="$t(`${mainHead}.author`)"
                                    v-model="addForm.author"
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
                    <v-btn color="primary" small @click="sureAddNotice">{{
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
                                <v-text-field
                                    :label="$t(`${mainHead}.title`)"
                                    v-model="editForm.title"
                                    solo
                                />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    :label="$t(`${mainHead}.content`)"
                                    v-model="editForm.content"
                                    solo
                                />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    disabled
                                    :label="$t(`${mainHead}.author`)"
                                    v-model="editForm.author"
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
                    <v-btn color="primary" small @click="sureEditSNotice">{{
                        $t(`${mainHead}.btn_confirm`)
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import MaterialCard from "../../components/materialCard.vue";
import storage from "good-storage";
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
            mainHead: "navMenu[3].children[0].prompt",
            dialog: {
                add: false,
                edit: false, //编辑
            },
            //新增
            addForm: {
                title: "",
                content: "",
                author: "",
                create_time: "",
            },
            editForm: {
                title: "",
                content: "",
                author: "",
                id: 0,
                create_time: "",
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
        this.getData();
    },
    mounted() {
        var that = this;
        window.addEventListener("setItem", function (e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[3].children[0].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[3].children[0].headers");
        that.addForm.author = storage.get("username");
    },
    methods: {
        //获取数据
        getData() {
            this.overlay = true;
            this.post("getNotices", this.paging, (response) => {
                if (response.code == 200) {
                    let tableDate = response.data;
                    tableDate.forEach((item) => {
                        item.create_time = this.formatDate(
                            parseInt(item.create_time)
                        );
                    });

                    this.dataList = tableDate;
                    this.total = response.paging.total;
                    setTimeout(() => {
                        this.overlay = false;
                    }, 500);
                }
            });
        },
        //新增项目
        sureAddNotice() {
            this.addForm.create_time = Math.round(new Date().getTime() / 1000);
            this.post("addNotice", this.addForm, (response) => {
                if (response.code == 200) {
                    this.dialog.add = false;
                    this.toast(response);
                     this.getData();                  
                }
            });
        },
        //编辑运动会信息
        userEdit(id) {
            this.editForm.id = id;
            this.dialog.edit = true;
            const params = {
                id: id,
            };
            this.post("getOneNotice", params, (response) => {
                if (response.code == 200) {
                    this.editForm.title = response.data[0].title;
                    this.editForm.content = response.data[0].content;
                    this.editForm.author = storage.get("username");
                }
            });
        },
        //确定修改
        sureEditSNotice() {
            this.editForm.create_time = Math.round(new Date().getTime() / 1000);
            this.post("editNotice", this.editForm, (response) => {
                if (response.code == 200) {
                    this.dialog.edit = false;
                    this.toast(response);
                    this.getData();
                }
            });
        },
        userDel(id) {
            const params = {
                id: id,
            };
            this.post("delNotiec", params, (response) => {
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