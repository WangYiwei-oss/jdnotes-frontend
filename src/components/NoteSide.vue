<template>
  <el-aside width="200px" id="NoteASide">
    <el-menu id="NoteMenu">
      <el-submenu class="note_group" :index="i" v-for="(group,i) in notes_info" :key="i">
        <template slot="title"><i></i>{{i}}</template>
          <el-menu-item class="note_title" index="note" v-for="note in group" :key="note">{{note}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
const notes_info={
  "go语言基础":[
    "1.数组",
    "2.for循环",
  ],
  "goweb编程":[
    "1.后台三层"
  ],
}

export default {
  name: "NoteSide",
  data(){
    return{
      notes_info:notes_info,
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../style/common";
  #NoteASide{
    @include background_color("note-side-color");
    padding-top: 20px;
    #NoteMenu{
      background-color: rgba(0,0,0,0);
      width: 100%;
      margin: 0px;
      .note_group{
        @include background_color("note-side-group");
        font-size: 15px;
      }
      .note_title{
        @include background_color("note-side-title");
        font-size: 15px;
      }
    }
  }
</style>
