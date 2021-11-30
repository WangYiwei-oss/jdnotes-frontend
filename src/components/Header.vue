<template>
  <div id="headerdiv" @mousemove="moveheader" >
    <mu-appbar id="maininfo" z-depth="0">
<!--      home按钮-->
      <mu-button slot="left" flat>
        <mu-icon value="home"></mu-icon>
        <span id="homeicon">JDNotes</span>
      </mu-button>

<!--右边连接栏-->
      <mu-button flat slot="left" v-for="item in info.links" :key="item.name">
        <mu-icon size="16" :value="item.icon"></mu-icon>
        {{item.name}}
      </mu-button>
<!--      主题切换-->
      <mu-menu slot="right" open-on-hover>
        <mu-button flat>
          <mu-icon value="home"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button v-for="theme in info.themes" :key="theme.name">
            <mu-list-item-action>
              <mu-icon :value="theme.icon"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{theme.name}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
<!--个人菜单-->
      <mu-menu slot="right" open-on-hover>
        <mu-button icon>wyw</mu-button>
        <mu-list slot="content">
          <mu-list-item button v-for="item in info.person_center" :key="item.name">
            <mu-list-item-action>
              <mu-icon :value="item.icon"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>{{item.name}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <div id="view">
    <img src="../assets/Header/header4.jpg" alt="" :style="{transform:`translateX(${percentage*100}px)`,opacity:`${(percentage-0.55)/0.25}`}" class="first">
    <img src="../assets/Header/header3.jpg" alt="" :style="{transform:`translateX(${percentage*50}px)`,opacity:`${(percentage-0.25)/0.25}`}" class="second">
    <img src="../assets/Header/header1.jpg" alt="" class="third">
    </div>
  </div>
</template>

<script>
const links = [
  {
    name: "github",
    router: "github",
    icon: "work",
  },
  {
    name: "bilibili",
    router: "bilibili",
    icon: "print",
  },
];
const themes = [
  {
    name: "dark",
    icon: "home",
  },
  {
    name: "light",
    icon: "home",
  },
];
const person_center = [
  {
    name: "login",
    icon: "home",
  },
  {
    name: "register",
    icon: "touch_app",
  },
]

export default {
  name: "Header",
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
        links: links,
        themes: themes,
        person_center: person_center,
      },
      percentage : 0,
    }
  },
  methods:{
    moveheader(event){
      this.percentage = event.clientX / window.outerWidth
      console.log(this.percentage)
    }
  }
}
</script>

<style scoped>
  #homeicon {
    cursor: pointer;
  }
  #headerdiv {
    position: relative;
    height: 30%;
    width: 100%;
  }
  #headerdiv #view{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #headerdiv .first, #headerdiv .second,#headerdiv .third{
    position: absolute;
    display: block;
    width: 120%;
    height: 100%;
    object-fit: cover;
  }
  #headerdiv .first{
    z-index:20;
  }
  #headerdiv .second{
    z-index: 10;
  }
  #maininfo {
    position: relative;
    width:100%;
    height: 30%;
    background-color: rgba(255,255,255,0);
    color: #fff;
    z-index: 100;
  }
</style>