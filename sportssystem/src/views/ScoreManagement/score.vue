<template>
    <div class="applyInfo">
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
                        style="padding: 4px !important"
                    >
                        <div style="display: flex; align-items: center">
                            <div>
                                <v-btn
                                    color="primary"
                                    v-if="!bulForm.loading"
                                    @click="search"
                                >
                                    <i
                                        class="fa fa-search"
                                        aria-hidden="true"
                                    ></i>
                                    {{ $t(`${mainHead}.btn`) }}
                                </v-btn>
                                <v-btn v-if="bulForm.loading" color="primary">
                                    <i class="fa fa-spinner fa-spin"></i>
                                    {{ $t(`${mainHead}.btn`) }}
                                </v-btn>
                            </div>
                            <!-- 导出文件 -->
                            <div>
                                <download-excel
                                    style="margin-left: 6px; margin-right: 6px"
                                    class="export-btn"
                                    :data="tables"
                                    :before-finish="finishDownload"
                                    :fields="jsonFields"
                                    type="xls"
                                    name="本届运动会报名表.xls"
                                >
                                    <v-btn color="warning">
                                        {{ $t(`${mainHead}.exp`) }}
                                    </v-btn>
                                </download-excel>
                            </div>
                            <!-- 导入文件 -->
                            <input
                                v-show="false"
                                id="file"
                                type="file"
                                class="upFile"
                                ref="fileExcel"
                                accept=".xlsx, .xls"
                                @change="uploadFile"
                            />
                            <v-btn color="success" @click="handleClick">
                                {{ $t(`${mainHead}.imp`) }}
                            </v-btn>
                            <input />
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <material-card
            icon="mdi-clipboard-text"
            title="报名列表"
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
                            @click="editScore(item.id)"
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
        <!-- 录入修改成绩 -->
        <v-dialog
            v-model="dialog.edit"
            max-width="600px"
            persistent
            no-click-animation
        >
            <v-card>
                <v-card-title>
                    <span class="headline">{{
                        $t(`${mainHead}.edit_info`)
                    }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="addForm.realname"
                                    disabled
                                    dense
                                    solo
                                    :placeholder="$t(`${mainHead}.realname`)"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="addForm.sportname"
                                    disabled
                                    dense
                                    solo
                                    :placeholder="$t(`${mainHead}.sportname`)"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="addForm.score"
                                    dense
                                    solo
                                    :placeholder="$t(`${mainHead}.score`)"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="addForm.rank"
                                    dense
                                    solo
                                    :placeholder="$t(`${mainHead}.rank`)"
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
                    <v-btn color="primary" small @click="sureEditSecord">{{
                        $t(`${mainHead}.btn_confirm`)
                    }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 导出运动会记录 -->
        <v-dialog
            v-model="dialog.exp"
            max-width="600px"
            persistent
            no-click-animation
        >
            <v-card>
                <v-card-title>
                    <span class="headline">{{
                        $t(`${mainHead}.exp_info`)
                    }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="expForm.num"
                                    dense
                                    solo
                                    :placeholder="$t(`${mainHead}.num`)"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions style="padding-bottom: 20px !important">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" small @click="dialog.exp = false">{{
                        $t(`${mainHead}.btn_cancel`)
                    }}</v-btn>
                    <v-btn color="primary" small @click="sureExp">{{
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
import goUp from "../../components/goUp.vue";
import JsonExcel from "vue-json-excel";
export default {
    components: {
        MaterialCard,
        goUp,
        DownloadExcel: JsonExcel,
    },
    data() {
        return {
            dataList: [], //数据
            tables: [], //导出数据
            headers: [], //table 标题
            overlay: false,
            snackbar: { message: "", color: "" },
            mainHead: "navMenu[2].children[0].prompt",
            total: 0, //数据总数
            pageCount: 0,
            paging: {
                //分页
                page_num: 1,
                page_size: 7,
            },
            confirm_id: 0,
            edit_id: 0,
            sportname: "",
            dialog: {
                confirm: false,
                edit: false,
                exp: false,
            },
            selectForm: {
                num: "",
                category: "",
                sportname: "",
                realname: "",
                occupation: "",
                gender: "",
                department: "",
                grade: "",
                class: "",
            },
            //导出
            expForm: {
                category: "",
                sportname: "",
                realname: "",
                occupation: "",
                gender: "",
                department: "",
                grade: "",
                class: "",
            },
            addForm: {
                //录入修改成绩
                realname: "",
                sportname: "",
                score: "",
                rank: "",
            },
            //搜索按钮
            bulForm: {
                loading: false,
            },
            //xls文件设置
            jsonFields: {
                序号: "id",
                运动类型: "category",
                运动名称: "sportname",
                姓名: "realname",
                成绩: "score",
                排名: "u_rank",
            },
        };
    },
    activated() {
        this.getData();
        setTimeout(() => {
            this.exp();
        }, 500);
    },
    mounted() {
        var that = this;
        window.addEventListener("setItem", function (e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[2].children[0].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[2].children[0].headers");
    },
    methods: {
        //设置本届
        getNum() {
            this.post("getNum", {}, (response) => {
                if (response.code == 200) {
                    this.selectForm.num = response.data[0].num;
                }
            });
        },
        //获取数据
        getData() {
            this.overlay = true;
            this.getNum();
            this.selectForm = { ...this.selectForm, ...this.paging };
            this.post("getRecords", this.selectForm, (response) => {
                if (response.code == 200) {
                    const tableData = response.data;
                    tableData.forEach((item) => {
                        if (item.gender == 2) {
                            item.gender = "男";
                        } else if (item.gender == 1) {
                            item.gender = "女";
                        } else {
                            item.gender = "";
                        }
                        if (item.u_rank == "" || item.u_rank == null)
                            item.u_rank = "未录入";
                        if (item.score == "" || item.score == null)
                            item.score = "未录入";
                    });
                    this.dataList = tableData;
                    this.total = response.paging.total;
                    this.toast(response);
                    setTimeout(() => {
                        this.overlay = false;
                        this.bulForm.loading = false;
                        this.exp();
                    }, 500);
                }
            });
        },
        // 导出数据
        exp() {
            const page = {
                page_size: 10000,
                page_num: 1,
                num: this.selectForm.num,
            };
            this.expForm = { ...this.expForm, ...page };
            this.post("getRecords", this.expForm, (response) => {
                if (response.code == 200) {
                    const tableDatas = response.data;
                    tableDatas.forEach((item) => {
                        if (item.gender == 2) {
                            item.gender = "男";
                        } else if (item.gender == 1) {
                            item.gender = "女";
                        } else {
                            item.gender = "";
                        }
                    });
                    this.tables = tableDatas;
                    //console.log(this.tables);
                }
            });
        },
        finishDownload() {
            this.dialog.snackbar = true;
            this.snackbar.message = "正在导出中...";
            this.snackbar.color = "success";
        },
        //没用
        sureExp() {},
        //导入数据
        handleClick() {
            this.$refs.fileExcel.click();
        },
        uploadFile(event) {
            let f = event.currentTarget.files[0];
            let rABS = false; //是否将文件读取为二进制字符串
            let reader = new FileReader();
            let _this = this;
            FileReader.prototype.readAsBinaryString = function (f) {
                let binary = "";
                let rABS = false; //是否将文件读取为二进制字符串
                let wb; //读取完成的数据
                let outdata;
                let reader = new FileReader();
                reader.onload = function (e) {
                    let bytes = new Uint8Array(reader.result);
                    let length = bytes.byteLength;
                    for (let i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    let XLSX = require("xlsx");
                    if (rABS) {
                        wb = XLSX.read(btoa(fixdata(binary)), {
                            //手动转化
                            type: "base64",
                        });
                    } else {
                        wb = XLSX.read(binary, {
                            type: "binary",
                        });
                    }
                    outdata = XLSX.utils.sheet_to_json(
                        wb.Sheets[wb.SheetNames[0]]
                    ); //outdata就是你想要的东西

                    const keyObj = {
                        序号: "id",
                        运动类型: "category",
                        运动名称: "sportname",
                        姓名: "realname",
                        性别: "gender",
                        成绩: "score",
                        排名: "u_rank",
                    };
                    outdata.forEach((item) => {
                        // 将中文的键名替换成英文的
                        for (let k in keyObj) {
                            let newKey = keyObj[k];
                            if (newKey) {
                                item[newKey] = item[k];
                                delete item[k];
                            }
                        }
                    });
                    console.log(outdata);
                    const params = {
                        obj: outdata,
                    };
                    _this.post("addScore", params, (response) => {
                        if (response.code == 200) {
                            _this.toast(response);
                            _this.getData();
                            var obj = document.getElementById("file");
                            obj.value = "";
                        }
                    });
                };
                reader.readAsArrayBuffer(f);
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
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
        //录入修改成绩信息
        editScore(id) {
            this.dialog.edit = true;
            this.edit_id = id;
            const params = {
                id: id,
            };
            this.post("getIdRecord", params, (response) => {
                if (response.code == 200) {
                    this.addForm.realname = response.data[0].realname;
                    this.addForm.sportname = response.data[0].sportname;
                    this.addForm.score = response.data[0].score;
                    this.addForm.rank = response.data[0].u_rank;
                }
            });
        },
        sureEditSecord() {
            const params = {
                id: this.edit_id,
                score: this.addForm.score,
                rank: this.addForm.rank,
            };
            this.post("editScore", params, (response) => {
                if (response.code == 200) {
                    this.toast(response);
                    this.dialog.edit = false;
                    this.getData();
                }
            });
        },

        //搜索
        search() {
            this.paging.page_num = 1;
            if (this.selectForm.category == "所有")
                this.selectForm.category = "";
            if (this.selectForm.gender == "男") this.selectForm.gender = 2;
            else if (this.selectForm.gender == "女") this.selectForm.gender = 1;
            else this.selectForm.gender = "";
            if (this.selectForm.department == "所有")
                this.selectForm.department = "";
            if (this.selectForm.occupation == "所有")
                this.selectForm.occupation = "";
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
.goup {
    position: fixed;
    bottom: 10px;
    right: 10px;
}
</style>
