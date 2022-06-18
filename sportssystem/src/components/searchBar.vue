<template>
    <div style="margin-top: 25px">
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-text-field
                     class="input_width"
                    v-on="on"
                    :label="$t('navMenu[0].search')"
                    :placeholder="$t('navMenu[0].search')"
                    prepend-inner-icon="mdi-magnify"
                    v-model="search"
                    @input="searchValue"
                    outlined
                    dense
                   
                ></v-text-field>
            </template>
            <v-list v-if="searchData.length > 0" style="background-color: #fff">
                <v-list-item-group>
                    <v-list-item v-for="(item, index) in searchData" :key="index">
                        <v-list-item-content>
                            <v-list-item-title
                                style="color:black"
                                @click="toRouter(item.path)"
                                v-text="item.text"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group> 
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            searchList: [], //获取所有的数据
            searchData: [], //遍历所需要的数据
        };
    },
    methods: {
        //获取所有路径
        getSearch(allPath,auth) {
            this.searchList = [];
            let allMenu = allPath;
            allMenu.forEach((child) => {
            if(auth===child.auth){ //根据权限展示功能菜单
                let allChlid = child.children;
                allChlid.forEach((subChild) => {
                    this.searchList.push(subChild);
                });
                }
            });
        },
        //遍历可能出现的值,@input聚焦模型实时监听
        searchValue() {
            var search = this.search;
            if (search) {
                this.searchData = this.searchList.filter(function(product) {
                    // 每一项数据
                    // console.log(product);
                    return Object.keys(product).some(function(key) {
                        // 每一项数据的参数名
                        // console.log(key)
                        return (
                            String(product[key])
                                // toLowerCase() 方法用于把字符串转换为小写。
                                .toLowerCase()
                                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                                .indexOf(search) > -1
                        );
                    });
                });
            } else {
                this.searchData = [];
            }
        },
        toRouter(path){
            this.routerJump(path);
            this.searchData = [];
            this.search = "";
            this.$emit("refresh",path)
        }
    }
      
};
</script>
<style lang="stylus" scoped>
@media screen and (max-device-width: 500px) {
    // 窗口可视化宽度小于等于500px  设置宽度
    .input_width {
        width: 125px;
    }
}
</style>