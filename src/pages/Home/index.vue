<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floors " :key="floor.id" :floor=floor></Floor>
    <!--楼层-->
    <!-- <Floor /> -->
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Brand from './Brand'
import Floor from './Floor'
import Like from './Like'
import ListContainer from './ListContainer'
import Rank from './Rank'
import TodayRecommend from './TodayRecommend'
export default {
  name: 'Home',
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
  computed: {
    ...mapState({
      floors: state => state.home.floors
    })
  },
  mounted() {
    this.$store.dispatch('getBanner')
    this.$store.dispatch('getRecommends')
    this.$store.dispatch('getFloors')
    this.$store.dispatch('getLikes')
    this.$store.dispatch('getRanks')
  }
}
</script>
