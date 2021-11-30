<template>
  <div class="common">
    <div id="loginbackground">
      <SampleHeader></SampleHeader>
      <LoginBox></LoginBox>
    </div>
  </div>
</template>

<script>
import LoginBox from "@/components/LoginBox";
import SampleHeader from "@/components/SampleHeader";
export default {
  name: "Login",
  components:{
    LoginBox,
    SampleHeader
  }
}
</script>

<style scoped>
#loginbackground{
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/Login/loginbackground.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-size: 100%;
  margin: 0;
  padding: 0;
}
</style>