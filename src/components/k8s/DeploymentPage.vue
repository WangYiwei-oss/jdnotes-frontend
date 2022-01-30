<template>
  <div id="dep_page">
    <ConfigBar @new-namespace="get_deployment_by_ns"></ConfigBar>
    <div id="dep_list_area">
      <el-table :data="deployments" id="dep_table">
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="create_time" label="CreateTime"></el-table-column>
        <el-table-column prop="images" label="Images"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ConfigBar from "./ConfigBar";
export default {
  name: "DeploymentPage",
  data(){
    return{
      deployments:[],
    }
  },
  methods:{
    get_deployment_by_ns(e){
      axios({
        method: 'get',
        url: '/api/v1/deployments',
        params: {
          namespace:e,
        }
      }).then(res=>{
        this.deployments=[];
        if(res.data.success===true){
          let deps=JSON.parse(res.data.data)
          if(deps){
            for(let i=0;i<deps.length;i++){
              console.log(deps[i])
              this.deployments.push(deps[i])
            }
          }
        }else{
          this.$message.error(res.data.status)
        }
      })
    }
  },
  mounted(){
    axios({
      method: 'get',
      url: '/api/v1/namespaces'
    }).then(res=>{

    })
  },
  components:{
    ConfigBar
  }
}
</script>

<style scoped>
#dep_page{
  width: 100%;
  height: 100%;
}
#dep_list_area{
  width: 100%;
  height: 100%;
}
#dep_table{
  width: 100%;
}
</style>
