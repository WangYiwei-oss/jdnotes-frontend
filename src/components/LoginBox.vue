<template>
  <div id="login-box">
    <div id="front" :style="{transform: 'rotateY('+rotate+'deg)'}">
      <h1>Login</h1>
      <div>
        <mu-icon value="person"></mu-icon>
        <input style="overflow: hidden;backface-visibility: hidden;" type="text" placeholder="请输入用户名" v-model="form.username">
      </div>
      <div>
        <mu-icon value="lock"></mu-icon>
        <input style="overflow: hidden;backface-visibility: hidden;" type="password" placeholder="请输入密码" v-model="form.password">
      </div>
      <mu-appbar id="infopage" z-depth="0">
        <input style="overflow: hidden;backface-visibility: hidden;" slot="left" type="checkbox" class="checkbox">
        <p slot="left" style="margin-left: 10px;">记住我</p>
        <a slot="right" ref="#" style="margin-right: 40px;cursor: pointer">忘记密码?</a>
      </mu-appbar>
      <mu-button @click="login">登录</mu-button>
      <mu-button @click="turnback">注册</mu-button>
    </div>
    <div id="back" :style="{transform: 'rotateY('+(rotate+180)+'deg)'}">
      <h1>Register</h1>
      <div>
        <mu-icon value="person"></mu-icon>
        <input style="overflow: hidden;backface-visibility: hidden;" type="text" placeholder="请输入用户名" v-model="form_register.username">
      </div>
      <div>
        <mu-icon value="lock"></mu-icon>
        <input style="overflow: hidden;backface-visibility: hidden;" type="password" placeholder="请输入密码" v-model="form_register.password1">
      </div>
      <div>
        <mu-icon value="lock"></mu-icon>
        <input style="overflow: hidden;backface-visibility: hidden;" type="password" placeholder="请确认密码" v-model="form_register.password2">
      </div>
      <mu-button @click="login">注册</mu-button>
      <mu-button @click="turnback">登录</mu-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginBox",
  data () {
    return {
      form: {
        username:"",
        password:"",
      },
      form_register:{
        username:"",
        password1:"",
        password2:"",
      },
      rotate: 0,
    }
  },
  methods:{
    login(){
      axios.post("http://localhost:8081/login",{
        username: this.form.username,
        password: this.form.password,
      })
    },
    turnback(){
      this.rotate+=180
    }
  }
}
</script>

<style scoped>
  #login-box {
    text-align: center;
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(3px);
    box-shadow:  5px 20px 20px rgba(0,0,0,0.4), inset 5px 5px 5px rgba(0,0,0,0.2);
    margin: 0px auto;
    margin-top: 10%;
    width: 360px;
    height: 400px;
    padding-top: 25px;
    border-radius: 20px;
    transition: 0.5s;
  }
  #login-box #front, #login-box #back {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    backface-visibility: hidden;
    position: absolute;
    transition: .6s linear;
  }
  #login-box #front{
    transform: perspective(600px) rotateY(0deg);
  }
  #login-box #back{
    transform: perspective(600px) rotateY(180deg);
  }
  #login-box:hover{
    transform: scale(1.05);
  }
  #login-box h1{
    font-size: 40px;
    font-family: Georgia;
    font-weight: lighter;
    color: #e8e8e8;
  }
  #login-box div{
    margin-top: 25px;
  }
  #login-box #infopage{
    background: none;
    color: #b7b7b7;
  }
  #login-box i{
    color: rgba(255,255,255,0.5);
    display: inline-flex;
  }
  #login-box input{
    display: inline-flex;
    transform: translateY(-10px);
    width:70%;
    height: 100%;
    margin-left: 10px;
    border: none;
    background: none;
    border-bottom: #e8e8e8 2px solid;
    padding: 5px 10px;
    outline: none;
    color: #ffffff;
    font-size: 1.2em;
  }
  #login-box .checkbox{
    height: 15px;
    width: 15px;
    border: white 1px solid;
    margin-left: 40px;
    display: inline-flex;
    transform: translateY(1px);
  }
  #login-box button{
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: rgba(255,255,255,0.2);
    color: white;
    font-weight: bold;
    font-family: 微软雅黑;
    letter-spacing: 5px;
    border-radius: 10%;
    box-shadow: 0px 2px 2px rgba(100 ,100,100,0.3);
  }
</style>