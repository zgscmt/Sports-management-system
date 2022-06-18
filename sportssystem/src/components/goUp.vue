<template>
    <div class="goUp">
        <img v-if="btnFlag" src="../assets/images/goup.png" alt="错误" style="width:45px;height:45px" @click="backTop" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            btnFlag:false,
            scrollTop: 0
        };
    },

    mounted() {
        window.addEventListener("scroll", this.scrollToTop);
    },
    destroyed() {
        window.removeEventListener("scroll", this.scrollToTop);
    },

    methods: {   
        // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事
        // 点击图片回到顶部方法，加计时器是为了过渡顺滑
        backTop() {
            const that = this;
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
                if (that.scrollTop === 0) {
                    clearInterval(timer);
                }
            }, 16);
        },

        // 为了计算距离顶部的高度，当高度大于650显示回顶部图标，小于650则隐藏
        scrollToTop() {
            const that = this;
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            that.scrollTop = scrollTop;
            if (that.scrollTop > 650) {
                that.btnFlag = true;
            } else {
                that.btnFlag = false;
            }
        },
    },
};
</script>
