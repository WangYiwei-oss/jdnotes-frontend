<template>
  <div id="componentbar">
    <el-row style="margin: 0;padding: 0;text-align: center;width: 100%;height: 100%;">
      <el-button class="bean_button" circle v-for="bean in beans" :key="bean.name" :icon="bean.icon" @click="tolink(bean.link)"></el-button>
    </el-row>
  </div>
</template>

<script>
const beans=[
  {
    name:"笔记",
    link:"/notes",
    icon:"el-icon-s-order",
  },
  {
    name:"K8s集群管理",
    link:"/k8s_management",
    icon:"el-icon-s-grid",
  },
  {
    name:"普罗米修斯监控",
    link:"/prometheus_manage",
    icon:"el-icon-s-data",
  },
]

export default {
  name: "ComponentBar",
  data(){
    return{
      beans:beans,
    }
  },
  methods:{
    tolink(link){
    this.$router.push(link)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../style/common';
  #componentbar{
    margin-top: 5px;
    margin-bottom: 5px;
    width:100%;
    height: 40px;
    @include background_color(component_bar_background_color);
    box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
  }
  .bean_button{
    margin: 2px 10px 0;
    padding: 7px;
    background-color: #f3f4f6;
    box-shadow: -3px 3px 3px rgba(255,255,255,0.4),
                3px 3px 3px rgba(0,0,0,0.1);
    border: 0;
  }
  .bean_button:hover{
    box-shadow: inset -3px 3px 3px rgba(255,255,255,0.4),
    inset 3px 3px 3px rgba(0,0,0,0.1);
  }
</style>
