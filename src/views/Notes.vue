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
  name: 'notes',
  components: {
    Header,
    ApplicationBar
  }
}
</script>

<style scoped>

</style>