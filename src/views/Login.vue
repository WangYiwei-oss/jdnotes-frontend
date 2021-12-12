<template>
  <div class="backgd">
    <div id="login-box" >
      <!--这是登录的框-->
      <div id="front" :style="{transform: 'rotateY('+rotate+'deg)'}">
        <el-form ref="ref_login_form" :model="login_form" :rules="login_rules">
          <h1>Login</h1>
          <el-form-item class="inputitem"  label="账户" prop="name">
            <el-input class="inputarea" type="text" prefix-icon="el-icon-user-solid" placeholder="请输入用户名" v-model="login_form.name"></el-input>
          </el-form-item>
          <el-form-item class="inputitem" label="密码" prop="password">
            <el-input class="inputarea" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="login_form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="l-button" @click="submit_login('ref_login_form')">登录</el-button>
            <el-button class="l-button" @click="turnback">注册账号</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--这是注册的框-->
      <div id="back" :style="{transform: 'rotateY('+(rotate+180)+'deg)'}">
        <el-form ref="ref_register_form" :model="register_form" :rules="register_rules">
          <h1>Register</h1>
          <el-form-item class="inputitem" label="账户" prop="name">
            <el-input class="inputarea" type="text" prefix-icon="el-icon-user-solid" placeholder="请输入用户名" v-model="register_form.name"></el-input>
          </el-form-item>
          <el-form-item class="inputitem" label="密码" prop="password1">
            <el-input class="inputarea" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="register_form.password1" show-password></el-input>
          </el-form-item>
          <el-form-item class="inputitem" label="确认密码" prop="password2">
            <el-input class="inputarea" type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="register_form.password2" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="l-button" @click="submit_register('ref_register_form')">注册</el-button>
            <el-button class="l-button" @click="turnback">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data(){
    return{
      //登录的数据
      login_form:{
        name:'',
        password:'',
      },
      //登录的规则
      login_rules:{
        name:[{
          required: true,
          message: "请输入用户名",
          trigger: 'blur'
        }],
        password:[{
          required: true,
          message: "请输入密码",
          trigger: 'blur'
        }],
      },
      //注册的数据
      register_form:{
        name:'',
        password1:'',
        password2:'',
      },
      //注册的规则
      register_rules:{
        name:[{
          required: true,
          message: "请输入用户名",
          trigger: 'blur'
        }],
        password1:[{
          required: true,
          message: "请输入密码",
          trigger: 'blur'
        }],
        password2:[{
          required: true,
          message: "请输入密码",
          trigger: 'blur'
        }],
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
    turnback(){
      this.rotate+=180
    },
    //提交登录
    submit_login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: '/api/v1/login',
            data: this.login_form,
          }).then(res=>{
            if(res.data.success===true){
              sessionStorage.setItem("isLogin",'true');
              this.$router.push('/notes');
            }else{
              this.$message.error('用户名或密码错误');
            }
          })
        } else {
          return false;
        }
      });
    },
    //提交注册
    submit_register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push('/notes');
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/common";
.backgd{  //背景div
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-image: url("../assets/WallPaper/LoginBack01.jpg");
  background-size: cover;
  width: 100%;
  height: 100vh;
}
#login-box{
  text-align: center;
  background-color: rgba(0,0,0,0.3);
  backdrop-filter: blur(3px);
  box-shadow:  5px 20px 20px rgba(0,0,0,0.4), inset 5px 5px 5px rgba(0,0,0,0.2);
  margin: 0px auto;
  margin-top: 5%;
  width: 360px;
  height: 500px;
  border-radius: 20px;
  transition: 0.5s;
  padding: 0px;
  h1{
    //login和register标题
    font-size: 30px;
    color: #e8e8e8;
    margin-top: 30px;
  }
  //输入框
  /deep/ .el-input__inner {
    background-color: transparent;
    font-size: 14px;
    border: 0;
    border-bottom: 2px solid #dddddd;
    border-radius: 0px;
    color: #dddddd;
  }
  //输入框前面的文字
  /deep/ .el-form-item__label{
    color:#dddddd;
    font-weight: bolder;
    font-size: 15px;
  }
  .l-button{
    margin-top: 20px;
    width: 100px;
    height: 30px;
    background-color: #eeeeee;
    /deep/ span{
      font-size: 15px;
    }
  }
  #front, #back {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    backface-visibility: hidden;
    transition: .6s linear;
    text-align: center;
    .inputitem{
      display: block;
      font-size: 15px;
      width: 90%;
      margin: 20px;
      .inputarea{
        width: 100%;
      }
    }
  }
  #front{
    transform: perspective(600px) rotateY(0deg);
  }
  #back{
    transform: perspective(600px) rotateY(180deg);
  }
}
#login-box:hover{
  transform: scale(1.05);
}
</style>

