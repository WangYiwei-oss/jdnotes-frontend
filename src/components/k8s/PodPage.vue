<template>
<div id="pod_page">
  <ConfigBar @new-namespace="get_pods_by_ns"></ConfigBar>
  <div id="pod_list_area">
    <el-table
      :data="pods"
      id="pod_table"
      @expand-change="onListExpand"
    >
      <el-table-column label="" width="20" type="expand">
        <template slot-scope="scope">
<!--          详情组件-->
          <el-card class="box-card">
            <div slot="header">
              <span>详情</span>
            </div>
            {{ scope.row.detail }}
          </el-card>
        </template>
      </el-table-column>
      <el-table-column align="center" label="index" width="90">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="phase" label="Phase"></el-table-column>
      <el-table-column prop="node_name" label="NodeName"></el-table-column>
      <el-table-column prop="create_time" label="CreateTime"></el-table-column>
      <el-table-column prop="images" label="Images"></el-table-column>
      <el-table-column label="Options">
        <template slot-scope="scope">
          <el-popconfirm
            :title="'确定删除'+scope.row.name+'吗'"
            @confirm="onDeletePod(scope.row)"
          >
            <el-button slot="reference" icon="el-icon-delete" circle size="small"></el-button>
          </el-popconfirm>
          <el-button @click="onLogDialog(scope.row)" icon="el-icon-document" circle size="small"></el-button>
          <el-dialog title="logs" :visible.sync="dialogLogVisible">
            <div>
              <el-select
                placeholder="选择容器"
                v-model="log_form.container_name"
                @change="changeContainerGetLog(scope.row)"
              >
                <el-option
                  v-for="(c,c_index) in containers"
                  :key="c_index"
                  :label="c.name"
                  :value="c.name"></el-option>
              </el-select>
              <div><p>{{log}}</p></div>
            </div>
          </el-dialog>
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
  name: "PodPage",
  data(){
    return{
      pods:[],
      containers:[],
      wsClient:null,
      lock:false,
      current_namespace:"default",
      dialogLogVisible: false,
      log: "",
      log_form: {
        name: "",
        namespace: "",
        container_name: "",
      },
    }
  },
  methods:{
    //点击折叠框时
    onListExpand(row,ev){
      if (this.pods[row.index].isexpand===false){
        this.pods[row.index].isexpand=true //展开时获取详细信息
        axios({
          method: 'get',
          url: '/api/v1/pod',
          params:{
            "name":row.name,
            "namespace":row.namespace,
          }
        }).then(res=>{
          if(res.data.success===true){
            let detail=JSON.parse(res.data.data)
            if (detail){
              this.pods[row.index].detail=detail;
            }
          }else{
            this.$message.error(res.data.data)
          }
        })
      }else{
        this.pods[row.index].isexpand=false
      }
    },
    changeContainerGetLog(row){
      this.log=""
      axios({
        method:'get',
        url: '/api/v1/pod/container/log',
        params:{
          name: this.log_form.name,
          namespace: this.log_form.namespace,
          container_name: this.log_form.container_name,
        },
        timeout: 3000000000,
        onDownloadProgress: (e)=>{
          console.log("触发事件")
          const dataChunk = e.currentTarget.response;
          this.log+=dataChunk;
        },
      }).then(res=>{
        console.log(res.data)
      })
    },
    onLogDialog(row){
      this.log_form.container_name=""
      this.log_form.name=row.name;
      this.log_form.namespace=row.namespace;
      this.dialogLogVisible = true;
      axios({
        method: 'get',
        url: '/api/v1/pod/containers',
        params: {
          name: row.name,
          namespace: row.namespace,
        }
      }).then(res=>{
        this.containers=[]
        if(res.data.success===true){
          let cs = JSON.parse(res.data.data)
          this.containers=cs
        }else{
          this.$message.error("获取容器失败，请重试")
        }
      })
    },
    //点击删除时
    onDeletePod(row){
      axios({
        method: 'delete',
        url: '/api/v1/pod',
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
    get_pods_by_ns(e){  //根据命名空间获取deployment列表
      if(this.lock) return
      this.current_namespace=e;
      this.wsClient.send(JSON.stringify({"namespace":this.current_namespace,"url":"pods"}));
    },
    newclient(){
      this.wsClient=new WebSocket("ws://127.0.0.1:8082/v1/pods_ws")
      this.wsClient.onopen=()=>{
        console.log("ws open")
        this.get_pods_by_ns("default")  //初始化成功即获取列表
      }
      this.wsClient.onclose=()=>{
        console.log("ws close")
        //this.reconnect()
      }
      this.wsClient.onerror=(e)=>{
        console.log("ws error",e)
        //this.reconnect()
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
      this.pods=[];
      let ps=JSON.parse(e.data)
      if(ps){
        this.pods=[]
        for(let i=0;i<ps.length;i++){
          let p=ps[i];
          p.index=i;
          p.detail={}
          p.isexpand=false;
          this.pods.push(p)
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
  },
}
</script>

<style scoped>
#pod_page{
  width: 100%;
  height: 100%;
}
#pod_list_area{
  width: 100%;
  height: 100%;
}
#pod_table{
  width: 100%;
}
</style>
