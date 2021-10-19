<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab" :titles="titles" @tabClick="tabClick"
                  ref="tabControl1"  v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="titles" @tabClick="tabClick"
                    ref="tabControl" ></tab-control>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackTop" />
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";

  import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
  import RecommendView from "@/views/home/childComponents/HomeRecommendView";
  import FeatureView from "@/views/home/childComponents/FeatureView";

  import {getHomeMultidata,getHomeGoods} from "@/network/home";
  // import Swiper from "@/components/common/swiper/Swiper";
  // import SwiperItem from "@/components/common/swiper/SwiperItem";
  // import {Swiper,SwiperItem} from 'components/common/swiper';

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
      return {
        banners:[],
        recommends:[],
        titles:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        iid:0
      }
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted(){
      this.$refs.tabControl.$el.offsetTop
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    methods:{
      /**
       * 事件监听相关的方法
       * */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.itemindex = index;
        this.$refs.tabControl.itemindex = index;
      },

      backClick(){
        console.log('click');
        // this.$refs.scroll.scroll.scrollTo(0,0,500);
        this.$refs.scroll.scrollTo(0,0);
      },
      contentScroll(position){
        this.isBackTop = ( -position.y ) >1000?true:false

        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore(){
        // console.log('上啦加载更多');
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.scroll.refresh();
      },
      swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },

      /**
       *网络请求相关的方法
       * */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          console.log(res);
          // this.result = res;
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          console.log(res.data);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
        // this.$refs.scroll.refresh();
      },

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: white;

    /*原生滚动使用*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right:0;*/
    /*top:0;*/
    /*z-index: 9;*/
  }

  /*!**top必须设置**!*/
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  background-color: white;*/
  /*  z-index: 9;*/
  /*}*/

  /*.content{*/
  /*  height: calc(100vh - 93);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  .content{
    height: calc(100vh - 93);;
    overflow: hidden;

    position: absolute;
    top:44px;
    bottom: 49px;
    left:0;
    right:0;
  }
  .tab{
    position: relative;
    z-index:9;
    background-color: white;
  }
</style>
