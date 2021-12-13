<template>
  <el-container id="NotePage" direction="vertical">
    <Header direction="horizontal"></Header>
    <ComponentBar></ComponentBar>
    <el-container direction="horizontal">
      <NoteSide></NoteSide>
      <NodeMainArea></NodeMainArea>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import NodeMainArea from "../components/NoteMainArea"
import NoteSide from "../components/NoteSide"
import ComponentBar from "../components/ComponentBar";

export default {
  name: "Notes",
  data(){
    return {
      //设置theme的名字，要与theme.scss中的名字相对应
      theme:"light",
    }
  },
  mounted() {
    //设置data-theme，会在handle.scss中被使用
    window.document.documentElement.setAttribute("data-theme",this.theme)
  },
  components:{
    Header,
    NodeMainArea,
    NoteSide,
    ComponentBar,
  }
}
</script>

<style scoped lang="scss">
  @import '../style/common';
  #NotePage{
    padding: 0px;
    margin:0px;
    @include background_color("background_color");
  }
</style>
