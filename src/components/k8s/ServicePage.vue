<template>
  <div id="service_page">
    <ConfigBar @new-namespace="get_services_by_ns"></ConfigBar>
    <div id="service_list_area">
      <el-table :data="services" id="service_table">
        <el-table-column label="" width="20" type="expand">
          <template slot-scope="scope">
            <el-card class="box-card">
              <div slot="header">
                <span>详情</span>
              </div>
            </el-card>
          </template>
        </el-table-column>
        <el-table-column align="center" label="index" width="90">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="service_type" label="Type"></el-table-column>
        <el-table-column prop="cluster_ip" label="ClusterIP"></el-table-column>
        <el-table-column prop="ports" label="Ports"></el-table-column>
        <el-table-column prop="create_time" label="CreateTime"></el-table-column>
        <el-table-column label="Options">
          <template slot-scope="scope">
            <el-popconfirm
              :title="'确定删除'+scope.row.name+'吗'"
              @confirm="onDeleteService(scope.row)"
            >
              <el-button slot="reference" icon="el-icon-delete" circle size="small"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import ConfigBar from "./ConfigBar";
import axios from "axios";

export default {
  name: "ServicePage",
  data(){
    return{
      services:[],
      wsClient:null,
      lock:false,
      current_namespace:"default",
    }
  },
  methods:{
    //点击删除时
    onDeleteService(row){
      axios({
        method: 'delete',
        url: '/api/v1/service',
        params:{
          "name":row.name,
          "namespace":row.namespace,
        }
      }).then(res=>{
        if(res.data.success===true){
          this.$message.success("删除成功")
        }else{
          this.$message.error("删除失败")
        }
      })
    },
    reconnect(){
      if(this.lock) return;
      this.lock=true;
      console.log('正在重连');
      setTimeout(()=>{
        this.wsClient=this.newclient();
        this.lock=false;
      },2000);
    },
    get_services_by_ns(e){  //根据命名空间获取deployment列表
      if(this.lock) return
      this.current_namespace=e;
      this.wsClient.send(JSON.stringify({"namespace":this.current_namespace,"url":"services"}));
    },
    newclient(){
      this.wsClient=new WebSocket("ws://127.0.0.1:8082/v1/services_ws")
      this.wsClient.onopen=()=>{
        console.log("ws open")
        this.get_services_by_ns("default")  //初始化成功即获取列表
      }
      this.wsClient.onclose=()=>{
        console.log("ws close")
        this.reconnect()
      }
      this.wsClient.onerror=(e)=>{
        console.log("ws error",e)
        this.reconnect()
      }
    },
  },
  created() {
    this.lock=false;
    this.newclient();
    this.wsClient.onmessage=(e)=>{
      if (e.data==="ping"){
        return
      }
      this.services=[];
      let svs=JSON.parse(e.data)
      if(svs){
        this.services=[]
        for(let i=0;i<svs.length;i++){
          this.services.push(svs[i])
        }
      }
      this.$forceUpdate()
    };
  },
  beforeDestroy() {
    this.lock=true;
    this.wsClient.close();
  },
  components:{
    ConfigBar
  }
}
</script>

<style scoped lang="scss">
#service_page{
  width: 100%;
  height: 100%;
  #service_list_area{
    width: 100%;
    height: 100%;
    #service_table{
      width: 100%;
    }
  }
}
</style>
