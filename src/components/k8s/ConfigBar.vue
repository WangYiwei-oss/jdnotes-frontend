<template>
  <div id="k8s_config_bar">
    <el-menu mode="horizontal">
      <el-submenu index="1">
        <template slot="title">Namespace</template>
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
    }
  },
  methods:{
    changeNamespace(ns){
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
