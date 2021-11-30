<template>
  <mu-button icon class="app_button" :title="type" :color="activeIcon?'#00e676':''">
      <mu-icon :value="icon" :size="size"></mu-icon>
  </mu-button>
</template>

<script>
export default {
  props: {
    type: String,
    icon: String,
    activeIcon: Boolean,
  },
  name: "ApplicationIcon",
  data(){
    return{
      active:false,
      size:25,
    }
  },
}
</script>

<style scoped>
  .app_button {
    margin-left: 10px;
    margin-right: 10px;
    height: 35px;
    width: 35px;
    background-color: #e8e8e8;
    box-shadow: -5px 5px 5px rgba(255,255,255,0.6), 5px 5px 5px rgba(0,0,0,0.1);
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .app_button:hover {
    box-shadow: inset -5px 5px 5px rgba(255,255,255,0.6), inset 5px 5px 5px rgba(0,0,0,0.1);
  }
</style>