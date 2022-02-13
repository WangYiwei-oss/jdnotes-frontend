<template>
  <div id="dep_page">
    <ConfigBar @new-namespace="get_deployment_by_ns"></ConfigBar>
    <div id="dep_list_area">
      <el-table :data="deployments"
                :row-style="{height:'50px'}"
                :cell-style="{padding:'0px', fontSize:'15px'}"
                :header-cell-style="{fontSize:'15px'}"
                @expand-change="onListExpand"
                id="dep_table">
        <!--        显示详情-->
        <el-table-column label="" width="20" type="expand">
          <template slot-scope="scope">
            <el-card class="box-card">
              <div slot="header">
                <span>详情</span>
              </div>
              <div>
                <el-row>
                  <el-col :span="3"><h4>标签:</h4></el-col>
                  <el-col>{{scope.row.detail.labels}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><h4>注释:</h4></el-col>
                  <el-col>{{scope.row.detail.annotations}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><h4>期望副本:</h4></el-col>
                  <el-col :span="1">{{scope.row.replicas[0]}}</el-col>
                  <el-col :span="3"><h4>可用副本: </h4></el-col>
                  <el-col :span="1">{{scope.row.replicas[1]}}</el-col>
                  <el-col :span="3"><h4>不可用副本:</h4></el-col>
                  <el-col :span="1">{{scope.row.replicas[2]}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="3"><h4>错误信息:</h4></el-col>
                  <el-col>{{scope.row.message}}</el-col>
                </el-row>
                <h4>Pod详情</h4>
<!--                pod详情列表-->
                <el-table :data="scope.row.detail.pods"
                          :row-style="{height:'50px'}"
                          :cell-style="{padding:'0px', fontSize:'15px'}"
                          :header-cell-style="{fontSize:'13px'}"
                >
                  <el-table-column align="center" prop="name" label="Name" width="120"></el-table-column>
                  <el-table-column align="center" prop="images" label="Images" width="120"></el-table-column>
                  <el-table-column align="center" prop="node_name" label="NodeName" width="120"></el-table-column>
                  <el-table-column align="center" prop="ip[0]" label="PodIp" width="120"></el-table-column>
                  <el-table-column align="center" prop="ip[1]" label="NodeIp" width="120"></el-table-column>
                  <el-table-column align="center" prop="phase" label="Phase" width="120"></el-table-column>
                </el-table>
              </div>
            </el-card>
          </template>
        </el-table-column>
        <el-table-column align="center" label="index" width="90">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Status" width="100">
          <template slot-scope="scope">
            <p v-html="getStatus(scope.row)"></p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="Name" width="120"></el-table-column>
        <el-table-column align="center" prop="create_time" label="CreateTime" width="200"></el-table-column>
        <el-table-column align="center" prop="images" label="Images"></el-table-column>
        <el-table-column align="center" label="T/A/UA">
          <template slot-scope="scope">
            <p>{{scope.row.replicas[0]}}/{{scope.row.replicas[1]}}/{{scope.row.replicas[2]}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Options" width="100">
          <template slot-scope="scope">
            <el-popconfirm
              :title="'确定删除'+scope.row.name+'吗'"
              @confirm="onDeleteDeployment(scope.row)"
            >
              <el-button slot="reference" icon="el-icon-delete" circle size="small"></el-button>
            </el-popconfirm>
            <span>
              <el-tooltip effect="dark" :content="getMessage(scope.row)" placement="top-end">
                <svg-icon icon-class="icon-xinxi" :style="{color:getStatusColor(scope.row)}"></svg-icon>
              </el-tooltip>
            </span>
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
  name: "DeploymentPage",
  data(){
    return{
      deployments:[],
      wsClient:null,
      lock:false,
      current_namespace:"default",
      cccc:"green",
    }
  },
  methods:{
    //点击折叠框时
    onListExpand(row,ev){
      if (this.deployments[row.index].isexpand===false){
        this.deployments[row.index].isexpand=true //展开时获取详细信息
        axios({
          method: 'get',
          url: '/api/v1/deployment',
          params:{
            "name":row.name,
            "namespace":row.namespace,
          }
        }).then(res=>{
          if(res.data.success===true){
            let detail=JSON.parse(res.data.data)
            if (detail){
              this.deployments[row.index].detail=detail;
            }
          }else{
            this.$message.error(res.data.data)
          }
        })
      }else{
        this.deployments[row.index].isexpand=false
      }
    },
    //点击删除时
    onDeleteDeployment(row){
      axios({
        method: 'delete',
        url: '/api/v1/deployment',
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
    getStatusColor(row){
      if(row.is_complete===true){
        return "green"
      }
      return "red"
    },
    getStatus(row){
      if(row.is_complete===true){
        return "<span style='color: green'>Active</span>"
      }
      return "<span style='color: #d20000'>Waiting</span>"
    },
    getMessage(row){
      if(row.is_complete===false){
        return row.message
      }
      return "木有错误"
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
    get_deployment_by_ns(e){  //根据命名空间获取deployment列表
      if(this.lock) return
      this.current_namespace=e;
      this.wsClient.send(JSON.stringify({"namespace":this.current_namespace,"url":"deployments"}));
    },
    newclient(){
      this.wsClient=new WebSocket("ws://127.0.0.1:8082/v1/deployments_ws")
      this.wsClient.onopen=()=>{
        console.log("ws open")
        this.get_deployment_by_ns("default")  //初始化成功即获取列表
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
      this.deployments=[];
      let deps=JSON.parse(e.data);
      console.log(deps);
      if(deps){
        this.deployments=[]
        for(let i=0;i<deps.length;i++){
          let dep=deps[i];
          dep.index=i;
          dep.detail={};
          dep.isexpand=false;
          this.deployments.push(dep);
        }
      }
      this.$forceUpdate();
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
#dep_page{
  width: 100%;
  height: 100%;
  #dep_list_area{
    width: 100%;
    height: 100%;
    #dep_table{
      width: 100%;
    }
  }
}
</style>
