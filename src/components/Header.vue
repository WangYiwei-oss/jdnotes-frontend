<template>
  <div id="headerdiv">
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
      }
    }
  }
}
</script>

<style scoped>
  #homeicon {
    cursor: pointer;
  }
  #headerdiv {
    height: 200px;
    background: url("../assets/Header/headerbackground.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  #maininfo {
    width:100%;
    height: 30%;
    background-color: rgba(255,255,255,0);
    color: #fff;
  }
</style>