<template>
    <v-app id="inspire">
        <!-- 侧边栏 -->
        <v-navigation-drawer v-model="drawer" app class="siderBox">
            <div class="sider">
                <v-toolbar-title
                    style="
                        color: #fff;
                        text-align: center;
                        padding-top: 15px;
                        font-weight: initial;
                    "
                >
                    <span>{{ $t("navMenu[0].systemTitle") }}</span>
                </v-toolbar-title>
                <hr
                    style="
                        background: #fff;
                        width: 90%;
                        margin: 0 auto;
                        margin-top: 10px;
                    "
                />
                <v-list dark>
                    <v-list-item link @click="getActiveRouter('/index')">
                        <v-list-item-action>
                            <v-icon
                                :class="
                                    '/index' === activeRouter
                                        ? 'actived'
                                        : 'unactive'
                                "
                                >mdi-view-dashboard</v-icon
                            >
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title
                                :class="
                                    '/index' === activeRouter
                                        ? 'actived'
                                        : 'unactive'
                                "
                                >{{
                                    $t("navMenu[0].pageIndex")
                                }}</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-group
                        v-for="(item, index) in authMenu"
                        :key="index"
                        v-model="item.active"
                        v-show="item.auth == auth ? true : false"
                        :prepend-icon="item.icon"
                        no-action
                        color="yellow"
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title
                                    v-text="item.text"
                                ></v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item
                            v-for="child in item.children"
                            :key="child.title"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    <a
                                        :class="
                                            child.path === activeRouter
                                                ? 'actived'
                                                : 'unactive'
                                        "
                                        @click="getActiveRouter(child.path)"
                                        >{{ child.text }}</a
                                    >
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </div>
        </v-navigation-drawer>
        <!--主要展示内容  -->
        <v-main :class="$vuetify.theme.dark ? 'mianBlack' : 'mainWhite'">
            <v-container class="fill-height" fluid>
                <!-- 标题栏 -->
                <v-app-bar
                    app
                    id="app-bar"
                    fixed
                    flat
                    :color="$vuetify.theme.dark ? '#121212' : '#eeeeee'"
                >
                    <!-- 控制左边展示隐藏 -->
                    <v-btn
                        :class="$vuetify.theme.dark ? 'iconBlack' : 'iconWhite'"
                        icon
                        @click.stop="drawer = !drawer"
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    <!-- 设置面包屑 -->
                    <v-toolbar-title>
                        <v-breadcrumbs
                            class="hidden-sm-and-down"
                            large
                            style="padding: 0px !important"
                        >
                            <v-breadcrumbs-item :disabled="false">
                                <a
                                    v-if="breadcrumbs.active"
                                    style="color: #1976d2"
                                    @click="getActiveRouter('/index')"
                                >
                                    {{ $t("navMenu[0].pageIndex") }}
                                </a>
                            </v-breadcrumbs-item>
                            <img
                                v-if="breadcrumbs.active"
                                style="height: 18px; width: 18px"
                                :src="
                                    $vuetify.theme.dark
                                        ? require('../assets/images/slash_white.png')
                                        : require('../assets/images/slash_black.png')
                                "
                                alt="斜杆"
                            />
                            <v-breadcrumbs-item :disabled="false">
                                <span>{{ breadcrumbs.parent }}</span>
                            </v-breadcrumbs-item>
                            <img
                                v-if="breadcrumbs.active"
                                style="height: 18px; width: 18px"
                                :src="
                                    $vuetify.theme.dark
                                        ? require('../assets/images/slash_white.png')
                                        : require('../assets/images/slash_black.png')
                                "
                                alt="斜杆"
                            />
                            <!-- <v-icon v-if="breadcrumbs.active">mdi-chevron-right</v-icon> -->
                            <v-breadcrumbs-item :disabled="true">
                                <span style="color: gray">{{
                                    breadcrumbs.active
                                }}</span>
                            </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </v-toolbar-title>

                    <v-spacer />
                    <!-- 搜索框 -->
                    <searchBar
                        ref="getSearchData"
                        @refresh="render"
                    ></searchBar>
                    <!-- 放大缩小 -->
                    <tabNav />
                    <!-- 设置主题颜色 -->
                    <a>
                        <img
                            v-if="$vuetify.theme.dark === false"
                            src="../assets/images/月亮.png"
                            width="24px"
                            height="24px"
                            style="
                                margin-left: 2px;
                                margin-right: 10px;
                                color: black;
                            "
                            @click="exchange"
                            alt="转换"
                        />

                        <img
                            v-else
                            src="../assets/images/son_white.png"
                            width="23px"
                            height="23px"
                            style="margin-left: 2px; margin-right: 10px"
                            @click="exchange"
                            alt="转换"
                        />
                    </a>
                    <!-- 中英文切换 -->
                    <v-menu  offset-y>
                        <template v-slot:activator="{ on }">
                            <a v-on="on">
                                <img
                                    :src="
                                        $vuetify.theme.dark
                                            ? require('../assets/images/int_white.png')
                                            : require('../assets/images/int_black.png')
                                    "
                                    alt="错误"
                                    style="
                                        height: 20px;
                                        width: 20px;
                                        margin-right: 8px;
                                    "
                                />
                            </a>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    <div
                                        style="display: flex; flex-flow: column"
                                    >
                                        <div>
                                            <a @click="changeLanguage('zh')"
                                                >中文</a
                                            >
                                        </div>
                                        <div style="margin-top: 10px">
                                            <a @click="changeLanguage('en')"
                                                >English</a
                                            >
                                        </div>
                                    </div>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <!-- 用户退出 -->
                    <v-menu  offset-y>
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-account</v-icon>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>
                                    <a @click="log_out()">{{
                                        $t("navMenu[0].logout")
                                    }}</a>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-app-bar>
                <!-- 主要内容 -->
                <v-row fluid>
                    <go-up/>
                    <div class="margin_top_20">
                        <!-- <v-card elevation="6" height="89vh !important"> -->
                            <keep-alive>
                                <router-view
                                    v-if="$route.meta.keepAlive"
                                ></router-view>
                            </keep-alive>
                            <router-view
                                v-if="undefined == $route.meta.keepAlive"
                            ></router-view>
                        <!-- </v-card> -->
                    </div>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import goUp from "../components/goUp.vue";
import tabNav from "../components/tabNav.vue";
import searchBar from "../components/searchBar.vue";
import storage from "good-storage"
export default {
    props: {
        source: String,
    },
    components: {
        goUp,
        tabNav,
        searchBar,
    },
    data() {
        return {
            drawer: null,
            authMenu: this.$t("navMenu"), //侧边栏信息展示
            auth: 1, //权限展示
            activeRouter: "", //触发路由
            breadcrumbs: {
                parent: "",
                active: "",
            }, //面包屑导航
        };
    },
    mounted() {
        this.auth=storage.get("auth");  //获取权限列表
        this.getStart();
        this.refresh();
        this.setTheme();
    },
    methods: {
        //动态赋值
        getStart() {
            let locale = window.localStorage.getItem("local");
            if (!locale) {
                window.localStorage.setItem("local", "zh");
                this.$refs.getSearchData.getSearch(this.authMenu, this.auth);
            } else {
                if (locale === "zh") {
                    this.$i18n.locale = "zh";
                    this.authMenu = this.$t("navMenu");
                    this.$refs.getSearchData.getSearch(
                        this.authMenu,
                        this.auth
                    );
                }
                if (locale === "en") {
                    this.$i18n.locale = "en";
                    this.authMenu = this.$t("navMenu");
                    this.$refs.getSearchData.getSearch(
                        this.authMenu,
                        this.auth
                    );
                }
            }
        },
        //设置路由
        getActiveRouter(router) {
            this.routerJump(router);
            this.activeRouter = router;
            this.setActive(router);
        },
        //设置当前触发的系列内容
        setActive(router) {
            let allUrl = window.location.href;
            for (let i in this.authMenu) {
                let routerAll = this.authMenu[i].children;
                this.authMenu[i].active = false;
                for (let j in routerAll) {
                    //存在参数router
                    if (router === routerAll[j].path) {
                        this.breadcrumbs.active = routerAll[j].text;
                        this.breadcrumbs.parent = this.authMenu[i].text;
                        this.authMenu[i].active = true;
                    }
                    //存在路由，且当前的路由是首页index
                    if (router === "/index") {
                        this.breadcrumbs.active = "";
                        this.breadcrumbs.parent = "";
                    }
                }
            }
        },
        // 初始化
        setTheme() {
            let theme = window.localStorage.getItem("theme");
            if (!theme) {
                window.localStorage.setItem("theme", false);
            } else {
                if (theme === "false") {
                    this.$vuetify.theme.dark = false;
                } else {
                    this.$vuetify.theme.dark = true;
                }
            }
        },
        // 设置主题颜色
        exchange() {
            if (this.$vuetify.theme.dark) {
                this.$vuetify.theme.dark = false;
                window.localStorage.setItem("theme", false);
            } else {
                this.$vuetify.theme.dark = true;
                window.localStorage.setItem("theme", true);
            }
        },
        //页面刷新
        refresh() {
            let url = window.location.pathname;
            this.activeRouter = url;
            this.setActive(this.activeRouter);
        },
        render(path) {
            this.activeRouter = path;
            this.setActive(path);
        },
        //退出登录
        log_out() {
            storage.clear();
            this.routerJump("/login");
        },
        //切换语言
        changeLanguage(type) {
            this.$i18n.locale = type;
            this.$addStorageEvent(1, "local", type);
            this.authMenu = this.$t("navMenu");
            this.$refs.getSearchData.getSearch(this.authMenu, this.auth);
            this.setActive(this.activeRouter);
        },
    },
};
</script>

<style lang="stylus" scoped>
.container.fill-height {
    align-items: flex-start;
}

.siderBox {
    background: rgba(0, 0, 0, 0.6) url('~@/assets/images/sport.jpg') !important;
    background-size: 100% 100%;

    .sider {
        background: black;
        opacity: 0.7;
        filter: alpha;
        height: 100%;
    }
}

.actived {
    text-decoration: none;
    color: yellow !important;
}

.unactive {
    text-decoration: none;
    color: #fff !important;
}

.mianBlack {
    background: #121212;
    height: 100%;
}

.mainWhite {
    background: #eeeeee;
    height: 100%;
}

.iconBlack {
    background: #272727;
    border-radius: 40px;
    margin-left: 5px !important;
}

.iconWhite {
    background: #fff;
    border-radius: 40px;
}

.margin_top_20 {
    width: 98%;
    padding-left: 2%;
}
</style>