<template>
    <div class="brower">
          <!-- 加载遮罩层 -->
        <v-overlay :value="overlay" color="#fff" :absolute="true" opacity="0.9">
            <v-progress-circular
                indeterminate
                color="blue"
                size="32"
            ></v-progress-circular>
        </v-overlay>
        <v-card class="mx-auto" max-width="1200" style="margin-top: 15px">
            <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item
                    color="purple lighten-2"
                    fill-dot
                    right
                    v-if="total == 1 || total > 1"
                >
                    <span slot="opposite">{{ pageForm.date }}</span>
                    <v-card>
                        <v-card-title class="purple lighten-2">
                            <v-icon dark size="42" class="mr-4">
                                mdi-email-outline
                            </v-icon>
                            <h2 class="text-h4 white--text font-weight-light">
                                {{ pageForm.text }}
                            </h2>
                        </v-card-title>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="10">
                                    {{ pageForm.content }}
                                </v-col>
                                <v-col
                                    class="hidden-sm-and-down text-right"
                                    md="2"
                                >
                                    <v-icon size="64">
                                        mdi-calendar-text
                                    </v-icon>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-timeline-item>

                <v-timeline-item
                    color="amber lighten-1"
                    fill-dot
                    left
                    small
                    v-if="total == 2 || total > 2"
                >
                    <v-card>
                        <v-card-title class="amber lighten-1 justify-end">
                            <h2
                                class="
                                    text-h4
                                    mr-4
                                    white--text
                                    font-weight-light
                                "
                            >
                                {{ pageForm.text1 }}
                            </h2>
                            <v-icon dark size="42"> mdi-email-outline </v-icon>
                        </v-card-title>
                        <v-container>
                            <v-row>
                                <v-col class="hidden-sm-and-down" md="2">
                                    <v-icon size="64">
                                        mdi-calendar-text
                                    </v-icon>
                                </v-col>
                                <v-col cols="12" md="10">
                                    {{ pageForm.content1 }}
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                    <span slot="opposite">{{ pageForm.date1 }}</span>
                </v-timeline-item>

                <v-timeline-item
                    color="cyan lighten-1"
                    fill-dot
                    right
                    v-if="total == 3 || total > 3"
                >
                    <span slot="opposite">{{ pageForm.date2 }}</span>
                    <v-card>
                        <v-card-title class="cyan lighten-1">
                            <v-icon class="mr-4" dark size="42">
                                mdi-email-outline
                            </v-icon>
                            <h2 class="text-h4 white--text font-weight-light">
                                {{ pageForm.text2 }}
                            </h2>
                        </v-card-title>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="10">
                                    {{ pageForm.content2 }}
                                </v-col>
                                <v-col
                                    class="hidden-sm-and-down text-right"
                                    md="2"
                                >
                                    <v-icon size="64">
                                        mdi-calendar-text
                                    </v-icon>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-timeline-item>

                <v-timeline-item
                    color="red lighten-1"
                    fill-dot
                    left
                    small
                    v-if="total == 4"
                >
                    <v-card>
                        <v-card-title class="red lighten-1 justify-end">
                            <h2
                                class="
                                    text-h4
                                    mr-4
                                    white--text
                                    font-weight-light
                                "
                            >
                                {{ pageForm.text3 }}
                            </h2>
                            <v-icon dark size="42"> mdi-email-outline </v-icon>
                        </v-card-title>
                        <v-container>
                            <v-row>
                                <v-col class="hidden-sm-and-down" md="2">
                                    <v-icon size="64">
                                        mdi-calendar-text
                                    </v-icon>
                                </v-col>
                                <v-col cols="12" md="10">
                                    {{ pageForm.content3 }}
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                    <span slot="opposite">{{ pageForm.date3 }}</span>
                </v-timeline-item>
            </v-timeline>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            total: 0,
            pageForm: {
                date: "",
                date1: "",
                date2: "",
                date3: "",
                text: "",
                text1: "",
                text2: "",
                text3: "",
                content: "",
                content1: "",
                content2: "",
                content3: "",
            },
            overlay:false
        };
    },
    activated() {
        this.getData();
    },
    methods: {
        getData() {
            this.overlay=true;
            this.post("getCountNotice", {}, (response) => {
                if (response.code == 200) {
                    this.total = response.data[0].total;
                    if (this.total > 4) this.total = 4;
                    const params = {
                        count: this.total,
                    };
                    this.post("getFourNotice", params, (response) => {
                        if (this.total == 1) {
                            this.getOne(response);
                             this.overlay=false;
                        } else if (this.total == 2) {
                            this.getOne(response);
                            this.getTwo(response);
                            this.overlay=false;
                        } else if (this.total == 3) {
                            this.getOne(response);
                            this.getTwo(response);
                            this.getThree(response);
                            this.overlay=false;
                        } else {
                            this.getOne(response);
                            this.getTwo(response);
                            this.getThree(response);
                            this.getFour(response);
                            this.overlay=false;
                        }
                    });
                }
            });
        },
        // 看那一个一个运动健儿们，洋溢着青春的气息，展现出卓越的体育精神。成为一个德智体美劳全面的高质量人才。
        getOne(response) {
            this.pageForm.text = response.data[0].title;
            this.pageForm.content = response.data[0].content;
            this.pageForm.date = this.formatDate(response.data[0].create_time);
        },
        getTwo(response) {
            this.pageForm.text1 = response.data[1].title;
            this.pageForm.content1 = response.data[1].content;
            this.pageForm.date1 = this.formatDate(response.data[1].create_time);
        },
        getThree(response) {
            this.pageForm.text2 = response.data[2].title;
            this.pageForm.content2 = response.data[2].content;
            this.pageForm.date2 = this.formatDate(response.data[2].create_time);
        },
        getFour(response) {
            this.pageForm.text3 = response.data[3].title;
            this.pageForm.content3 = response.data[3].content;
            this.pageForm.date3 = this.formatDate(response.data[3].create_time);
        },
    },
};
</script>