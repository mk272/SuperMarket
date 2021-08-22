<template>
<!--  <div class="nav-bar" :style="background_color">-->
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props:{
    bcolor:{
      type:String,
      default:'pink'
    },
  },
  computed:{
    background_color(){
      return {backgroundColor:this.bcolor}
    }
  }
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .left,.right{
    width: 60px;
    /*background-color: #ff5777;*/
  }

  .center {
    flex: 1; /*占剩余部分的100%*/
    /*background-color: aquamarine;*/
  }
</style>
