<template>
  <div>
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