<template>
  <div class="spec-preview">
    <img v-lazy="currentImg.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img v-lazy="currentImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: { imgList: Array, currentIndex: Number },
  computed: {
    currentImg() {
      const imgList = this.imgList || []
      return imgList[this.currentIndex] || {}
    }
  },
  methods: {
    handler(e) {
      let { mask, bigImg } = this.$refs
      // 遮罩的大小
      let [maskWidth, maskHeight] = [mask.offsetWidth, mask.offsetHeight]
      // 获取鼠标的位置
      let [mouseX, mouseY] = [e.offsetX, e.offsetY]
      let [left, top] = [mouseX - maskWidth / 2, mouseY - maskHeight / 2]
      // 限制不超过边框
      left < 0 && (left = 0)
      left > maskWidth && (left = maskWidth)

      top < 0 && (top = 0)
      top > maskHeight && (top = maskHeight)
      // 改变遮罩的位置
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      // 改变放大镜图片位置
      bigImg.style.left = -2 * left + 'px'
      bigImg.style.top = -2 * top + 'px'
    }
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  // border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
    border: 1px solid #ccc;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(150, 150, 150, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 399px;
    border: 1px solid #ccc;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>