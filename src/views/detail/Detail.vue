<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll :probe-type="3" class="content" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramsInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackTop" />
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";
  import BackTop from "@/components/content/backTop/BackTop";

  import {getDetail, Goods, GoodsParam, Shop,getRecommend} from "@/network/detail";

  import {debouce} from '@/common/utils'


  export default {
    name: "Detail",
    data(){
      return{
        iid:null,
        topImages:[],
        goods: {},
        shop:{},
        detailInfo:{},
        paramsInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY: null,
        currentIndex:0,
        isBackTop:false
      }
    },
    created() {
      //1.获取商品的id
      this.iid = this.$route.params.iid

      //2.根据id请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        // this.$nextTick(()=>{
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs);
        // })

      })

      //3.请求评论数据
      getRecommend().then( res=>{
        // console.log(res);
        this.recommends = res.data.list
      })

      //4.给getThemeTopY赋值
      this.getThemeTopY = debouce(()=> {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      },)
    },
    updated() {
      // this.$refs.scroll.scroll.refresh()
      // console.log('updated')
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      BackTop,
      DetailBottomBar
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])
      },
      contentScroll(position){
        //1.获取y值
        const positionY = -position.y

        //2.positionY和主题中值进行对比
        //[ 0，7938，9120，9452 ]
        //positionY 在 0 和 7938 之间，index = 0
        //positionY 在 7938 和 9120 之间，index = 1
        //positionY 在 9120 和 9452 之间，index = 2
        //positionY 超过9452，index = 3
        for(let i=0; i<this.themeTopYs.length;i++){
          // let i in this.themeTopYs i 为 str i=0 i+1=>01
          if( this.currentIndex !== i && ( (i <this.themeTopYs.length-1 && positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i+1] ) || ( i === this.themeTopYs.length -1 && positionY >= this.themeTopYs[i] ) ) ){
            this.currentIndex = i;
            console.log(i);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.isBackTop = ( -position.y ) >1000?true:false
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0);
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid

        //2.将商品添加到购物车里
        this.$store.commit('addCart',product)

      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100vh - 44px);
  }
</style>
