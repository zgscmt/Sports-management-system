<template>
    <div class="apply">
        <material-card
            icon="mdi-clipboard-text"
            title="项目报名"
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
                        v-if="item.hide==0"
                        :disabled="item.hide==0"
                        depressed
                        small
                        @click="ensure(item.id)"
                        color="primary"
                        style="margin-right: 5px !important"
                        >{{ $t(`${mainHead}.apply`) }}</v-btn
                    >
                     <v-btn 
                        v-if="item.hide==1"
                        depressed
                        small
                        @click="ensure(item.id)"
                        color="primary"
                        style="margin-right: 5px !important"
                        >{{ $t(`${mainHead}.apply`) }}</v-btn
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
        <!-- 确认提示 -->
        <v-dialog v-model="dialog.confirm" persistent max-width="290">
            <v-card>
                <v-card-title class="text-h7">
                    {{ $t(`${mainHead}.hint`) }}
                </v-card-title>
                <v-card-text
                    >{{ $t(`${mainHead}.text`) }}{{ sportname
                    }}{{ $t(`${mainHead}.text_`) }}</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        small
                        @click="dialog.confirm = false"
                    >
                        {{ $t(`${mainHead}.btn_cancel`) }}
                    </v-btn>
                    <v-btn color="primary" small @click="sureApply">
                        {{ $t(`${mainHead}.btn_confirm`) }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import MaterialCard from "../../components/materialCard.vue";
import storage from "good-storage"
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
            mainHead: "navMenu[5].children[0].prompt",
            total: 0, //数据总数
            pageCount: 0,
            paging: {
                //分页
                page_num: 1,
                page_size: 8,
            },
            confirm_id: 0,
            sportname: "",
            dialog: {
                confirm: false,
            },
            //添加记录
            addForm:{
                category:"",
                sportname:"",
                num:0,
                uid:""          
            }
        };
    },
    activated() {
        this.getData();
    },
    mounted() {
        var that = this;
        window.addEventListener("setItem", function (e) {
            if (e.key === "local") {
                that.headers = that.$t("navMenu[5].children[0].headers");
            }
        });
        var local = window.localStorage.getItem("local");
        that.$i18n.locale = local;
        that.headers = that.$t("navMenu[5].children[0].headers");
    },
    methods: {
        //获取数据
        getData() {
            this.overlay = true;
            this.post("getProjects", this.paging, (response) => {
                if (response.code == 200) {
                    this.dataList = response.data;
                    this.total = response.paging.total;
                    this.toast(response);
                    setTimeout(() => {
                        this.overlay = false;
                    }, 500);
                }
            });
        },

        //确定报名
        ensure(id) {
            this.confirm_id = id;
            this.dialog.confirm = true;
            const params = {
                id: this.confirm_id,
            };
            this.post("getOneSport", params, (response) => {
                if (response.code == 200) {
                    this.sportname = response.data[0].sportname;
                    this.addForm.num=response.data[0].num;
                    this.addForm.sportname=response.data[0].sportname;
                    this.addForm.category=response.data[0].category;
                    this.addForm.uid=storage.get("uid");
                    this.getUser();
                }
            });
        },
        sureApply() {
            this.post("addRecord",this.addForm,response=>{
                if(response.code==200){
                    this.toast(response);
                    this.dialog.confirm=false;
                }
            })
        },
        //分页查询
        pagination(e) {
            this.paging.page_num = e.page;
            this.getData();
        },
    },
};
</script>