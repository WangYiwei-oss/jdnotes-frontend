<template>
  <div id="k8s_config_bar">
    <el-menu mode="horizontal" menu-trigger="click">
      <el-submenu index="1">
        <template slot="title">
          <span>Namespace</span> <span style="font-size: smaller;color: gray">{{current_ns}}</span></template>
        <el-menu-item
          v-for="ns in namespace_list"
          :index="ns"
          :key="ns" @click="changeNamespace(ns)">{{ns}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ConfigBar",
  data(){
    return{
      namespace_list:[],
      current_ns:"default",
    }
  },
  methods:{
    changeNamespace(ns){
      this.current_ns=ns;
      this.$emit('new-namespace',ns);
    }
  },
  mounted(){
    axios({
      method: 'get',
      url: '/api/v1/namespaces'
    }).then(res=>{
      if(res.data.success===true){
        let namespaces=JSON.parse(res.data.data)
        for(let i=0;i<namespaces.length;i++){
          this.namespace_list.push(namespaces[i].name)
        }
      }else{
        this.$message.error(res.data.status);
      }
    })
  }
}
</script>

<style scoped>
#k8s_config_bar{
  height: 10%;
  width: 100%;
}
</style>
