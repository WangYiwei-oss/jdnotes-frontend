<template>
  <el-aside width="20%" id="K8sSide">
    <el-menu :router=true
             :default-active="$route.name">
      <el-menu-item index="dashboard">Dashboard</el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i></i>Workloads</template>
        <el-menu-item index="deployments">Deployments</el-menu-item>
        <el-menu-item index="pods">Pods</el-menu-item>
        <el-menu-item index="services">Services</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>

export default {
  name: "K8sSide",
}
</script>

<style scoped>

</style>
