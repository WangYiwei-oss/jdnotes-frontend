<template>
  <div id="application_bar">
      <mu-appbar id="application_appbar" z-depth="5">
        <ApplicationIcon slot="left" v-for="(app,index) in info.applicaitons" :key="app.type"
                         v-bind:type="app.type" v-bind:icon="app.icon" v-bind:activeIcon="index===info.lightIndex"></ApplicationIcon>
      </mu-appbar>
  </div>
</template>

<script>
import ApplicationIcon from "@/components/ApplicationIcon";
const applicaitons = [
  {
    type: "zxcx",
    icon: "home",
  },
  {
    type: "asd",
    icon: "home",
  },
  {
    type: "retert",
    icon: "home",
  },
]

export default {
  name: "ApplicationBar",
  props:{
    lightIndex: {
      type: Number,
      default: 0,
    },
    background:{
      type: String,
    }
  },
  data(){
    return{
      info:{
        applicaitons:applicaitons,
        activeIndex:1,
      }
    }
  },
  components:{
    ApplicationIcon
  }
}
</script>

<style scoped>
  #application_bar {
    height: 50px;
  }
  #application_appbar {
    width: 100%;
    height: 100%;
    background-color: #f2f3f4;
  }
</style>