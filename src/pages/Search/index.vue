<template>
  <div class="Search">
    <div>Search</div>
    <!-- <h3>{{ $route.params.keyword }}</h3>
    <h3>{{ $route.query.keyword2 }}</h3> -->
    <h3>{{ keyword }}</h3>
    <h3>{{ keyword2 }}</h3>
  </div>

</template>
<script>
export default {
  name: 'Search',
  props: ['keyword', 'keyword2']
}
</script>
<style lang="less" scoped>
</style>