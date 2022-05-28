<template>
  <swiper :options="options">
    <swiper-slide class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
      <img v-lazy="img.imgUrl" :class='{ active: index === currentIndex }' @click="changeCurrentIndex(index)" />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>

export default {
  name: "ImageList",
  props: { imgList: Array },
  data() {
    return {
      options: {

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 5,
        slidesPerGroup: 5
      },
      currentIndex: 0
    }
  },
  methods: {
    changeCurrentIndex(index) {
      if (this.currentIndex === index) return
      this.currentIndex = index
      this.$emit('changeImgIndex', index)
    }

  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 400px;
  padding: 0 12px;

  .swiper-slide {
    // width: 56px;
    // height: 56px;

    img {
      border: 1px solid #ccc;
      padding: 2px;
      width: 54px;
      height: 100%;
      display: block;
      cursor: pointer;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>