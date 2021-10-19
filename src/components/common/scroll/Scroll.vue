<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:true
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        tap:true,
        mouseWheel:true,

        observeDOM: true,
        observeImage: true,

        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })

      // this.scroll.scrollTo(x,y,500);
      this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position)
      })

      this.scroll.on('pullingUp',()=>{
        // console.log('上啦加载更多');
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
