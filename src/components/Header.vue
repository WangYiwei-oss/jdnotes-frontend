<template>
    <el-header height="220px">
      <el-row :gutter="30" id="upper_bar">
        <el-col :span="2"><div>
          <el-link :underline="false" id="LOGO">JDNotes</el-link>
        </div></el-col>
        <el-col :span="14" id="link_slot" style="padding: 0px"><div>
          <el-link :underline="false" v-for="item in info.links" :key="item.name" class="header_links" :href="item.router">
            <img :src="item.icon" class="icon" alt=""><span class="link_text">{{item.name}}</span></el-link>
        </div></el-col>
        <el-col :span="8" id="right_slot"><div>
          <el-dropdown>
            <el-avatar id="user_logo"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <el-dropdown-menu slot="dropdown" style="padding: 10px 30px 10px 30px">
              <el-dropdown-item v-for="item in info.person_center" :key="item.name" class="drop_item">
                <el-link :icon="item.icon"><span>{{item.name}}</span></el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div></el-col>
      </el-row>
      <el-row id="main_img" >
        <div id="controller" @mousemove="moveheader">
          <div :style="{transform:`translateX(${percentage*100}px)`,opacity:`${(percentage-0.65)/0.25}`}" class="first"></div>
          <div :style="{transform:`translateX(${percentage*80}px)`,opacity:`${(percentage-0.25)/0.25}`}" class="second"></div>
          <div class="third"></div>
        </div>
      </el-row>
    </el-header>
</template>

<script>

const links = [
  {
    name: "github",
    router: "https://github.com/WangYiwei-oss",
    icon: require("../assets/icon/github-fill.png"),
  },
  {
    name: "bilibili",
    router: "https://space.bilibili.com/15650467",
    icon: require("../assets/icon/bilibili-line.png"),
  },
];
const person_center = [
  {
    name: "个人中心",
    icon: "el-icon-user-solid",
  },
  {
    name: "注册组件",
    icon: "el-icon-s-home",
  },
  {
    name: "我的笔记",
    icon: "el-icon-s-order",
  },
  {
    name:"设置",
    icon: "el-icon-s-tools",
  }
]
export default {
  name: "Header",
  data(){
    return{
      info:{
        links:links,
        person_center:person_center,
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

<style scoped lang="scss">
@import '../style/common';
#LOGO{
  cursor: pointer;
  background-color:rgba(0,0,0,0);
  border: 0;
  vertical-align:middle;
  transform: translateY(-1px);
  margin-left: 10px;
  @include font_color("text-color");
}
.header_links{
  margin-left: 30px;
  padding-right: 10px;
  transform: translateY(-2px);
  .icon{
    width:20px;
    height: 20px;
    display: inline-flex;
    vertical-align:middle;
  }
  .link_text{
    margin-left: 5px;
    vertical-align:middle;
    font-size: 15px;
    letter-spacing:0.2rem;
    @include font_color("text-color");
  }
}
#right_slot{
  text-align:right;
  padding: 0px;
}
.drop_item{
  margin-top: 20px;
  margin-bottom: 20px;
}
#upper_bar{
  line-height: 30px;
  z-index: 30;
  font-weight: bolder;
}
#user_logo{
  margin-right: 20px;
  height: 30px;
  width: 30px;
}
#main_img{
  height: 190px;
  position: absolute;
  top: 30px;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  #controller{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    -webkit-filter: blur(1px);
  }
  .first, .second, .third{
    position: absolute;
    display: block;
    width: 115%;
    transform: translateX(-30px);
    height: 100%;
    background-size: cover;
    //object-fit: fill;
  }
  .first{
    z-index:20;
    background-image: url("../assets/Header/fengling01.jpg");
  }
  #controller:hover{
    -webkit-filter: blur(0px);
  }
  .second{
    z-index: 10;
    background-image: url("../assets/Header/fengling03.jpg");
  }
  .third{
    z-index: 0;
    background-image: url("../assets/Header/fengling02.jpg");
  }
}
</style>
