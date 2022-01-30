<template>
  <el-container id="NotePage" direction="vertical">
    <Header direction="horizontal"></Header>
    <ComponentBar></ComponentBar>
    <el-container direction="horizontal">
      <K8sSide></K8sSide>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import ComponentBar from "../components/ComponentBar";
import K8sSide from "../components/k8s/K8sSide";
export default {
  name: "K8sManagement",
  components:{
    Header,
    ComponentBar,
    K8sSide
  }
}
</script>

<style scoped>

</style>
