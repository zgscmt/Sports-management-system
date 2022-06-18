<template>
    <div class="full_screen" @click="fullScreen()" style="padding-left:10px">
        <a >
            <v-icon large>mdi-fullscreen</v-icon>
        </a>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isfullScreen: true,
        };
    },
    methods: {
        fullScreen() {
            if (this.isfullScreen) {
                var docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
                this.isfullScreen = false;
            } else {
                if (document.exitFullscreen) {
                    // document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                this.isfullScreen = true;
            }
        },
    },
};
</script>
<style lang="stylus" scoped>
@media screen and (max-device-width: 500px){
    .full_screen{
        padding :0px;
        display :none
    }
}
</style>
