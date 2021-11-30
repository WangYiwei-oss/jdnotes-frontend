<template>
  <div id="indexmaindiv">
    <Header></Header>
    <ApplicationBar></ApplicationBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import ApplicationBar from "@/components/ApplicationBar";
export default {
  name: 'index',
  components: {
    Header,
    ApplicationBar
  }
}
</script>
<style scoped>
#indexmaindiv{
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
}
</style>