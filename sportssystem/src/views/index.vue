<template>
    <div class="index">
        <!-- 登录提示 -->
        <v-row justify="space-around">
            <v-col cols="auto">
                <v-dialog v-model="dialog.hint" persistent max-width="600">
                    <template>
                        <v-card>
                            <v-toolbar color="success" dark>信息完善</v-toolbar>
                            <v-card-text>
                                <div class="text-h5 pa-12">
                                    请完善信息后,再做其他操作
                                </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn
                                    color="success"
                                    small
                                    @click="getIdentify()"
                                    >确定</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </v-col>
        </v-row>
        <!-- 主要展示内容 -->
        <v-row>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" height="80" elevation="15">
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            padding: 18px;
                        "
                    >
                        <v-icon color="#20B2AA" x-large
                            >mdi-account-multiple</v-icon
                        >

                        <div style="display: flex; flex-direction: column">
                            <span style="color: gray">{{ $t("navMenu[0].t_one") }}</span>
                            <span
                                class="font-weight-bold"
                                style="text-align: center"
                                >{{ pageForm.user_count }}</span
                            >
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" height="80" elevation="15">
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            padding: 18px;
                        "
                    >
                        <v-icon color="#00BFFF" x-large
                            >mdi-chat-processing</v-icon
                        >

                        <div style="display: flex; flex-direction: column">
                            <span style="color: gray">{{ $t("navMenu[0].t_two") }}</span>
                            <span
                                class="font-weight-bold"
                                style="text-align: center"
                                >{{ pageForm.inform_count }}</span
                            >
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" height="80" elevation="15">
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            padding: 18px;
                        "
                    >
                        <v-icon color="#FF3030" x-large
                            >mdi-checkbox-multiple-marked</v-icon
                        >

                        <div style="display: flex; flex-direction: column">
                            <span style="color: gray"
                                >{{ $t("navMenu[0].t_three") }}</span
                            >
                            <span
                                class="font-weight-bold"
                                style="text-align: center"
                                >{{ pageForm.record_count }}</span
                            >
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card class="mx-auto" height="80" elevation="15">
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            padding: 18px;
                        "
                    >
                        <v-icon color="#32CD32" x-large
                            >mdi-clipboard-text</v-icon
                        >

                        <div style="display: flex; flex-direction: column">
                            <span style="color: gray">{{ $t("navMenu[0].t_four") }}</span>
                            <span
                                class="font-weight-bold"
                                style="text-align: center"
                                >{{ pageForm.sports_count }}</span
                            >
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-card
                    class="mx-auto"
                    height="145"
                    elevation="15"
                    style="padding: 20px; padding-top: 30px"
                >
                    <v-progress-linear
                        color="red lighten-2"
                        buffer-value="0"
                        stream
                    ></v-progress-linear>
                    <br />
                    <v-progress-linear
                        color="teal"
                        buffer-value="0"
                        value="20"
                        stream
                    ></v-progress-linear>
                    <br />
                    <v-progress-linear
                        buffer-value="50"
                        stream
                        color="cyan"
                    ></v-progress-linear>
                    <br />
                    <v-progress-linear
                        buffer-value="60"
                        value="40"
                        stream
                        color="orange"
                    ></v-progress-linear>
                </v-card>
            </v-col>
        </v-row>
        <!-- 饼状图 -->
        <v-row>
            <v-col cols="12" md="6">
                <v-card
                    class="mx-auto"
                    height="400"
                    elevation="15"
                    style="padding: 20px; padding-top: 30px"
                >
                    <div id="myPie" style="height: 380px"></div>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card
                    class="mx-auto"
                    height="400"
                    elevation="15"
                    style="padding: 20px; padding-top: 30px"
                >
                    <div id="myBar" style="height: 380px"></div>
                </v-card>
            </v-col>
        </v-row>
        <!-- 提示框 -->
        <v-snackbar
            v-model="dialog.snackbar"
            top
            :timeout="1000"
            :color="snackbar.color"
        >
            {{ snackbar.message }}
        </v-snackbar>
        <!-- 遮罩层 -->
        <v-overlay :value="overlay" color="#fff" :absolute="true" opacity="1">
            <v-progress-circular
                indeterminate
                color="blue"
                size="32"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import storage from "good-storage";
export default {
    data() {
        return {
            identify: "", //完善什么信息
            dialog: { hint: false, snackbar: false },
            pageForm: {
                user_count: 0,
                inform_count: 0,
                record_count: 0,
                sports_count: 0,
                b_count: 0,
                g_count: 0,
            },
            overlay: false,
            snackbar: { message: "", color: "" }, //提示信息
        };
    },
    mounted() {
        this.identify = storage.get("identify");
        if (this.identify == 0) {
            this.dialog.hint = true;
            this.overlay = true;
        } else {
            this.getData();
        }
    },
    methods: {
        async getIdentify() {
            this.dialog.hint = false;
            this.routerJump("/myInfo");
        },
        getData() {
            this.overlay = true;
            this.post("getIndex", {}, (response) => {
                if (response.code == 200) {
                    this.pageForm.user_count = response.data[0].uid;
                    this.pageForm.inform_count = response.data[0].iid;
                    this.pageForm.record_count = response.data[0].rid;
                    this.pageForm.sports_count = response.data[0].sid;
                    this.pageForm.g_count = response.data[0].g_count;
                    this.pageForm.b_count = response.data[0].b_count;
                    this.getPie(); //画饼状图
                    this.getBar(); //画柱状图
                    setTimeout(() => {
                        this.overlay = false;
                    }, 500);
                }
            });
        },
        getPie() {
            let myChart = this.$echarts.init(document.getElementById("myPie"));
            myChart.setOption({
                title: {
                    //标题
                    text: "运动员男女比例",
                    subtext: "数据检索",
                    left: "center",
                },
                grid: {
                    width: "75%",
                    height: "75%",
                },
                tooltip: {
                    trigger: "item",
                },
                legend: {
                    //图例组件
                    orient: "vertical",
                    left: "left",
                },
                color: ["#fac858", "#ee6666"],
                series: [
                    //数据展示
                    {
                        name: "数据查询",
                        type: "pie",
                        radius: "50%",

                        data: [
                            { value: this.pageForm.b_count, name: "男" },
                            { value: this.pageForm.g_count, name: "女" },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            });
        },
        //获取柱状图
        getBar() {
            this.post("getBar", {}, (response) => {
                if (response.code == 200) {
                    // console.log(response)
                    let allData = response.data;
                    let barData = [];
                    allData.forEach((item) => {
                        barData.push(item.run_count);
                        barData.push(item.long_count);
                        barData.push(item.high_count);
                        barData.push(item.ball_count);
                        barData.push(item.spice_count);
                    });

                    // console.log(barData);
                    let myChart = this.$echarts.init(
                        document.getElementById("myBar")
                    );
                    myChart.setOption({
                        title: {
                            //标题
                            text: "运动数据类型",
                            subtext: "数据检索",
                            left: "center",
                        },
                        grid: {
                            //值越大越靠下
                            width: "80%",
                            height: "70%",
                        },
                        tooltip: {
                            trigger: "item",
                        },
                        xAxis: {
                            type: "category",
                            data: ["田径", "跳远", "跳高", "球类", "趣味运动"],
                        },
                        yAxis: {
                            type: "value",
                            minInterval: 1,
                        },

                        series: [
                            {
                                data: barData,
                                type: "bar",
                                markPoint: {
                                    //最大最小值
                                    data: [
                                        {
                                            type: "max",
                                            name: "最大值",
                                        },
                                        {
                                            type: "min",
                                            name: "最小值",
                                        },
                                    ],
                                },
                                itemStyle: {
                                    normal: {
                                        //这里是重点
                                        color: function (params) {
                                            //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                            var colorList = [
                                                "#c23531",
                                                "#61a0a8",
                                                "#d48265",
                                                "#749f83",
                                                "#ca8622",
                                            ];
                                            return colorList[params.dataIndex];
                                        },
                                    },
                                },
                            },
                        ],
                    });
                }
            });
        },
    },
};
</script>


