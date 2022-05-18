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
    <Floor />
    <!--楼层-->
    <Floor />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import Brand from './Brand'
import Floor from './Floor'
import Like from './Like'
import ListContainer from './ListContainer'
import Rank from './Rank'
import TodayRecommend from './TodayRecommend'
import { reqCategoryList } from '@/api/index'
export default {
  name: 'Home',
  data() {
    return {
      result: []
    }
  }
  ,
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
  async mounted() {
    const result = await reqCategoryList()
    if (result.code === 200) {
      this.result = result.data
    }

  }
}
</script>

<style lang="less" scoped>
</style>