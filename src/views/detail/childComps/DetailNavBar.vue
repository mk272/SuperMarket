<template>
  <div id="">
    <nav-bar>
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
          <div class="center-item" v-for="(item,index) in titles"
               @click="titleClick(index)" :class="{active:currentIndex === index}" >
            {{item}}
          </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .left img{
    margin-top:10px;
  }

  .center{
    display: flex;
  }
  .center-item{
    flex: 1;
  }
  .active{
    color: var(--color-tint);
  }
</style>
