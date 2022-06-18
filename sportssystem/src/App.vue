<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import storage from "good-storage"
export default {
  data() {
    return {

    }
  },
  mounted(){
      this.checkAuth();
  },
  methods:{
        checkAuth(){
            let myAuth =storage.get("sports_token");
            if(!myAuth){
                storage.clear();
                this.routerJump('/login');
            }
        }
  }
};
</script>

<style lang="stylus">
#app {
  height: 100%;
}
</style>

