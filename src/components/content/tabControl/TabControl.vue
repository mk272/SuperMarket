<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-bar-item"
         @click="itemClick(index)"
         :class="{active:index === itemindex}">
      <span >{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data(){
    return {
      itemindex:0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  computed:{
  },
  methods:{
    itemClick(index){
      this.itemindex = index;
      // console.log(index)
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 44px;
    padding-top:10px;
  }
  .tab-bar-item{
    flex: 1;
  }
  .tab-bar-item span{
    padding: 10px 5px;
  }
  .active span {
    border-bottom: 2px solid deeppink;
    color:deeppink;
    /*padding-bottom: 10px;*/
  }
</style>
