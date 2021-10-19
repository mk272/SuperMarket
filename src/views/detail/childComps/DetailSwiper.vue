<template>
  <div >
    <swiper class="detail">
      <swiper-item  v-for="item in topImages">
          <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper} from "@/components/common/swiper";
import {SwiperItem} from "@/components/common/swiper";
export default {
  name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .detail{
    height: 300px;
    overflow: hidden;
  }
</style>
