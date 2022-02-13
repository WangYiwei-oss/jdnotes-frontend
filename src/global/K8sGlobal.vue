<script>

const NewClient=function(){
  var ws=new WebSocket("ws://127.0.0.1:8082/v1/deployments_ws")
  ws.onopen=function (){
    console.log("ws open")
  }
  ws.onclose=function (){
    console.log("ws close")
  }
  ws.onerror=function (e){
    console.log("ws error",e)
  }
  return ws
}

const ResourceType = {
  NULL: 0,
  POD: 1,
  DEPLOYMENT: 2,
  SERVICE: 3,
  CONFIGMAP: 4,
  SECRET: 5,
}

function K8sManagerWebSocket(){
  this.resource_type=ResourceType.NULL;
  this.current_namespace="default";
  this.client = NewClient();
}

K8sManagerWebSocket.getInstance = (function (){
  let instance;
  return function (){
    instance = instance ? instance: new K8sManagerWebSocket();
    return instance;
  }
})();

export default {
  name: "K8sGlobal",
  K8sManagerWebSocket,
  ResourceType,
}
</script>

<style scoped>

</style>
