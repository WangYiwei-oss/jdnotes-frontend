<template>
  <div id="ingress_page">
    <ConfigBar @new-namespace="get_ingresses_by_ns"></ConfigBar>
<!--    创建ingress区域-->
    <div id="ingress_panel">
      <el-button type="primary" @click="visbleIngressCreateDialog">创建Ingress</el-button>
      <el-dialog title="创建Ingress" :visible.sync="dialogFormCreateIngressVisible">
        <el-form :model="create_form" :inline="true">
          <el-card class="box-card" shadow="never" style="margin: 3px">
            <div slot="header">
              <span>Basic Config</span>
            </div>
            <div>
              <el-form-item label="Name">
                <el-input v-model="create_form.name" placeholder="ingress名称"></el-input>
              </el-form-item>
              <el-form-item label="Namespace">
                <el-select
                  v-model="create_form.namespace"
                  placeholder="命名空间"
                  @change="namespaceChange"
                >
                  <el-option
                    v-for="(ns,index) in namespace_list"
                    :key="index"
                    :label="ns"
                    :value="ns"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-card>
          <el-card class="box-card" shadow="never" style="margin: 3px">
            <div slot="header">
              <span>Rule Config</span>
              <el-button @click="addRuleCfg">+</el-button>
              <el-button @click="delRuleCfg">-</el-button>
            </div>
            <div>
              <template v-for="(rule,rule_index) in create_form.rules">
                <el-card>
                  <el-row>
                    <el-col :span="11">
                      <el-form-item label="Hostname">
                        <el-input class="create_form_input" v-model="rule.host" placeholder="host url"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-button @click="addPathCfg(rule_index)">+</el-button>
                    </el-col>
                  </el-row>
                  <template v-for="(path,pth_index) in rule.paths">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="Path" :inline="true">
                          <el-input v-model="path.path" placeholder="path"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="Service Name">
                          <el-select v-model="path.svc_name" placeholder="service name">
                            <el-option
                              v-for="svc in create_ingress_namespaced_service_list"
                              :key="svc" :label="svc" :value="svc"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="Port">
                          <el-input v-model="path.port" placeholder="port"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-button @click="delPathCfg(rule_index,pth_index)">-</el-button>
                      </el-col>
                    </el-row>
                  </template>
                </el-card>
              </template>
            </div>
          </el-card>
          <el-button type="primary" @click="onCreateIngress">立即创建</el-button>
        </el-form>
      </el-dialog>
    </div>
<!--    列表显示区域-->
    <div id="ingress_list_area">
      <el-table :data="ingresses" id="service_table" @expand-change="onListExpand">
        <el-table-column label="" width="20" type="expand">
          <template slot-scope="scope">
            <div style="background-color: #eeeeee;margin: 0;padding: 10px">
              <h4>域名</h4>
              <div><a :href="'http://'+host" v-for="host in scope.row.detail.hosts">{{host}}</a></div>
              <h4>详细配置</h4>
              <div>
                <span>支持跨域</span>
                <el-switch
                  v-model="scope.row.detail.is_cors"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :disabled="true">
                </el-switch>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="index" width="90" prop="index"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="create_time" label="CreateTime"></el-table-column>
        <el-table-column label="Options">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" circle size="small" @click="onDeleteIngress(scope.row)"></el-button>
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
  name: "IngressPage",
  data(){
    return{
      ingresses:[],
      wsClient:null,
      lock:false,
      current_namespace:"default",
      dialogFormCreateIngressVisible: false,
      namespace_list:[],
      create_ingress_namespaced_service_list:[],
      activeNames: ['1'],
      create_form:{
        name:'',
        namespace:'',
        rules:[
          {host:"",paths:[{path:"",svc_name:"",port:80}]},
        ],
      },
    }
  },
  methods:{
    //点击删除时
    onDeleteIngress(row){
      axios({
        method: 'delete',
        url: '/api/v1/ingress',
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
    //点击折叠框时
    onListExpand(row,ev){
      if (this.ingresses[row.index].isexpand===false){
        this.ingresses[row.index].isexpand=true //展开时获取详细信息
        axios({
          method: 'get',
          url: '/api/v1/ingress_detail',
          params:{
            "name":row.name,
            "namespace":row.namespace,
          }
        }).then(res=>{
          if(res.data.success===true){
            let detail=JSON.parse(res.data.data)
            if (detail){
              this.ingresses[row.index].detail=detail;
            }
          }
        })
      }else{
        this.ingresses[row.index].isexpand=false
      }
    },
    namespaceChange(newNs){
      this.getServiceListByApi(newNs);
    },
    getServiceListByApi(ns){
      axios({
        method: 'get',
        url: '/api/v1/services',
        params:{
          "namespace":ns,
        }
      }).then(res=>{
        if(res.data.success===true){
          this.create_ingress_namespaced_service_list=[]
          let svcs=JSON.parse(res.data.data)
          if (svcs){
            for(let i=0;i<svcs.length;i++){
              this.create_ingress_namespaced_service_list.push(svcs[i].name)
            }
          }
        }else{
          this.$message.error(res.data.status);
        }
      })
    },
    onCreateIngress(){
      axios({
        method: 'post',
        url: '/api/v1/ingress',
        data: this.create_form,
      }).then(res=>{
        if(res.data.success!==true){
          this.$message.error(res.data.status);
        }else{
          this.dialogFormCreateIngressVisible=false;
          this.$message.success("创建成功");
        }
      })
    },
    addRuleCfg(){
      this.create_form.rules.push({host:"",paths:[{path:"",svc_name:"",port:80}]})
    },
    delRuleCfg(){
      this.create_form.rules.splice(this.create_form.rules.length-1,1)
    },
    addPathCfg(rule_index){
      this.create_form.rules[rule_index].paths.push({path:"",svc_name:"",port:80});
    },
    delPathCfg(rule_index,index){
      this.create_form.rules[rule_index].paths.splice(index,1);
    },
    visbleIngressCreateDialog(){
      this.dialogFormCreateIngressVisible = true;
      this.getNamespaceList();
    },
    getNamespaceList(){
      axios({
        method: 'get',
        url: '/api/v1/namespaces',
        }).then(res=>{
         if(res.data.success===true){
           let namespaces=JSON.parse(res.data.data)
           for(let i=0;i<namespaces.length;i++){
             this.namespace_list.push(namespaces[i].name)
           }
         } else{
           this.$message.error(res.data.status)
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
    get_ingresses_by_ns(e){  //根据命名空间获取deployment列表
      if(this.lock) return
      this.current_namespace=e;
      this.wsClient.send(JSON.stringify({"namespace":this.current_namespace,"url":"ingresses"}));
    },
    newclient(){
      this.wsClient=new WebSocket("ws://127.0.0.1:8082/v1/ingresses_ws")
      this.wsClient.onopen=()=>{
        console.log("ws open")
        this.get_ingresses_by_ns("default")  //初始化成功即获取列表
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
      let ings=JSON.parse(e.data)
      this.ingresses=[]
      if(ings){
        for(let i=0;i<ings.length;i++){
          let ingress=ings[i]
          ingress.index=i;
          ingress.detail={};
          ingress.isexpand=false;
          this.ingresses.push(ingress);
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
#ingress_page{
  width: 100%;
  height: 100%;
  #ingress_list_area{
    width: 100%;
    height: 100%;
    #ingress_table{
      width: 100%;
    }
  }
  #ingress_panel{
    margin: 10px;
  }
}
</style>
