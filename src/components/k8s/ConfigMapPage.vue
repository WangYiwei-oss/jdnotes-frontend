<template>
  <div id="configmap_page">
    <ConfigBar @new-namespace="get_configmap_by_ns"></ConfigBar>
    <!--    创建ingress区域-->
    <div id="configmap_panel">
      <el-button type="primary" @click="visbleConfigMapCreateDialog">创建ConfigMap</el-button>
      <el-dialog title="创建ConfigMap" :visible.sync="dialogFormCreateConfigMapVisible">
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
              <span>Data Config</span>
              <el-button @click="addDataCfg">+</el-button>
              <a href="javascript:" class="file">导入文件
                <input multiple="multiple" @change="()=>fileChange()" type="file" ref="files" accept=".txt">
              </a>
              <div>
                <template v-for="(data,data_index) in create_form.datas">
                    <el-row>
                      <el-col :span="11">
                        <el-form-item label="Key">
                          <el-input v-model="data.key" placeholder="key"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="Value">
                          <el-input v-model="data.value" placeholder="value"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-button @click="delDataCfg(data_index)">-</el-button>
                      </el-col>
                    </el-row>
                </template>
              </div>
            </div>
            <div>
            </div>
          </el-card>
          <el-button type="primary" @click="onCreateConfigMap">立即创建</el-button>
        </el-form>
      </el-dialog>
    </div>
    <!--    列表显示区域-->
    <div id="configmap_list_area">
      <el-table :data="configmaps" id="configmap_table">
<!--        显示详情-->
        <el-table-column label="" width="20" type="expand">
          <template slot-scope="scope">
            <div style="background-color: #eeeeee;margin: 0;padding: 10px;width: 100%">
              <h4>Data</h4>
              <div>
                <el-row v-for="(d,index) in scope.row.data" :key="index">
                    <el-col :span="1">Key:</el-col>
                    <el-col :span="8">
                      <el-input type="textarea" autosize v-model="d.key"></el-input>
                    </el-col>
                    <el-col :span="1">Value:</el-col>
                    <el-col :span="8">
                      <el-input type="textarea" autosize v-model="d.value"></el-input>
                    </el-col>
                </el-row>
                <el-popconfirm
                  title="确定修改吗"
                  @confirm="onPatchConfigMap(scope.row)"
                >
                  <el-button slot="reference">修改</el-button>
                </el-popconfirm>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="index" width="90">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="create_time" label="CreateTime"></el-table-column>
        <el-table-column label="Options">
          <template slot-scope="scope">
            <el-popconfirm
              :title="'确定删除'+scope.row.name+'吗'"
              @confirm="onDeleteConfigMap(scope.row)"
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
  name: "ConfigMapPage",
  data(){
    return{
      configmaps:[],
      wsClient:null,
      lock:false,
      current_namespace:"default",
      dialogFormCreateConfigMapVisible: false,
      namespace_list:[],
      create_form:{
        name: '',
        namespace: '',
        datas: [
          {key:'',value:''},
        ],
      },
    }
  },
  methods:{
    fileChange(){
      let files=this.$refs["files"].files
      if (files.length>0){
        console.log(files)
        for(let i=0;i<files.length;i++){
          let reader = new FileReader();
          reader.readAsText(files[i],'utf-8')
          reader.filename = files[i].name.substring(0,files[i].name.lastIndexOf("."));
          reader.onload=(e)=>{
            this.create_form.datas.push({
              key: e.target.filename,
              value: e.target.result,
            })
          }
        }
      }
    },
    //发送修改请求
    onPatchConfigMap(row){
      console.log(row)
      let c_data={};
      for (let i=0;i<row.data.length;i++){
        c_data[row.data[i].key]=row.data[i].value
      }
      axios({
        method: 'put',
        url: '/api/v1/configmap',
        data: {
          name: row.name,
          namespace: row.namespace,
          data: c_data,
        },

      }).then(res=>{
        if(res.data.success!==true){
          this.$message.error(res.data.status);
        }else{
          this.dialogFormCreateConfigMapVisible=false;
          this.$message.success("修改成功");
        }
      })
    },
    //发送创建请求
    onCreateConfigMap(){
      let c_data={};
      for (let i=0;i<this.create_form.datas.length;i++){
        c_data[this.create_form.datas[i].key]=this.create_form.datas[i].value
      }
      axios({
        method: 'post',
        url: '/api/v1/configmap',
        data: {
          name: this.create_form.name,
          namespace: this.create_form.namespace,
          data: c_data,
        },

      }).then(res=>{
        if(res.data.success!==true){
          this.$message.error(res.data.status);
        }else{
          this.dialogFormCreateConfigMapVisible=false;
          this.$message.success("创建成功");
        }
      })
    },
    visbleConfigMapCreateDialog(){
      this.dialogFormCreateConfigMapVisible = true;
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
    //添加data选项
    addDataCfg(){
      this.create_form.datas.push({key:'',value:''})
    },
    delDataCfg(data_index){
      this.create_form.datas.splice(data_index,1);
    },
    //点击删除时
    onDeleteConfigMap(row){
      axios({
        method: 'delete',
        url: '/api/v1/configmap',
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
    get_configmap_by_ns(e){  //根据命名空间获取deployment列表
      if(this.lock) return
      this.current_namespace=e;
      this.wsClient.send(JSON.stringify({"namespace":this.current_namespace,"url":"configmaps"}));
    },
    newclient(){
      this.wsClient=new WebSocket("ws://127.0.0.1:8082/v1/configmaps_ws")
      this.wsClient.onopen=()=>{
        console.log("ws open")
        this.get_configmap_by_ns("default")  //初始化成功即获取列表
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
      this.configmaps=[];
      let cfgmaps=JSON.parse(e.data)
      if(cfgmaps){
        this.configmaps=[]
        for(let i=0;i<cfgmaps.length;i++){
          let mdata = []
          for (let mkey in cfgmaps[i].data){
            mdata.push({key:mkey,value:cfgmaps[i].data[mkey]})
          }
          let element = {
            name: cfgmaps[i].name,
            namespace: cfgmaps[i].namespace,
            create_time: cfgmaps[i].create_time,
            data: mdata,
          }
          this.configmaps.push(element)
        }
      }
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
#configmap_page{
  width: 100%;
  height: 100%;
  #configmap_list_area{
    width: 100%;
    height: 100%;
    #configmap_table{
      width: 100%;
    }
  }
}
</style>
