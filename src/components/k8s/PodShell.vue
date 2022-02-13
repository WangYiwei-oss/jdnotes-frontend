<template>
<div>
  <div id="terminal" ref="terminal"></div>
</div>
</template>

<script>
import { Terminal } from "xterm"
import "xterm/css/xterm.css"
export default {
  name: "PodShell",
  data(){
    return {
      rows: 40,
      cols: 100,
      term: null,
      wsClient: null,
      wsInited: false,
    }
  },
  mounted: function () {
    this.initWs();
    let term = new Terminal({
      rendererType: "canvas", //渲染类型
      rows: parseInt(this.rows),  //行数
      cols: parseInt(this.cols),
      convertEol: true,
      disableStdin: false, //是否禁用输入
      cursorStyle: "underline", //光标样式
      cursorBlink: true,  //光标闪烁
      theme: {
        foreground: "#7e9192",
        background: "#002833",
        cursor: "help", //设置光标
        lineHeight: 16,
      }
    });
    term.open(this.$refs["terminal"]);
    term.prompt=()=>{
      term.writeln("\n\n Welcome to jdk8s manager");
      term.writeln("\n 正在初始化终端")
    }
    term.prompt();
    term.onData((key)=>{
      if(this.wsInited){
        //term.write(key)
        this.wsClient.send(key)
      }
    });
    this.term=term;
  },
  methods:{
    //初始化ws客户端
    initWs(){
      this.wsClient=new WebSocket("ws://127.0.0.1:8082/v1/pod/exec/ws")
      this.wsClient.onopen=()=>{

        console.log("ws open")
      }
      this.wsClient.onmessage=(e)=>{
        this.wsInited=true
        if (e.data){
          this.term.write(e.data)
        }
      }
      this.wsClient.onclose=()=>{
        console.log("ws close")
      }
      this.wsClient.onerror=(e)=>{
        console.log("ws error",e)
      }
    }
  },
  beforeDestroy() {
    this.wsClient.close();
  },
}
</script>

<style scoped>

</style>
