<template>
  <div class="cart">
    <h4>我的购物车</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartItem in cartInfoList" :key="cartItem.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartItem.isChecked"
              @click="changeIsChecked($event, cartItem)" />
          </li>
          <li class="cart-list-con2">
            <img v-lazy="cartItem.imgUrl" />
            <div class="item-msg">
              {{ cartItem.skuName && cartItem.skuName.substring(0, 62) + '...' }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:;" class="mins" @click="changeCartNum($event, cartItem, -1, true)">
              -
            </a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value='cartItem.skuNum' @change="
              changeCartNum($event, cartItem, $event.target.value * 1, false)
            " />
            <a href="javascript:;" class="plus" @click="changeCartNum($event, cartItem, 1, true)">
              +
            </a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">
              {{ cartItem.skuPrice * cartItem.skuNum }}
            </span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="delShopCart(cartItem.skuId)">
              删除
            </a>
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model='isAllChecked' />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="delCheckShopCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ isCheckedNum }}</span>
          件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  created() {
    this.getCartList()
  },
  computed: {
    ...mapGetters(['cartInfoList']),
    //是否全部选中
    isAllChecked: {
      get() { return this.cartInfoList.every(item => item.isChecked === 1) && this.cartInfoList.length > 0 },
      async set(newValue) {
        try {
          await this.$store.dispatch('updAllCartCheck', newValue ? 1 : 0)
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      }

    },
    //选中商品的数量
    isCheckedNum() {
      return this.cartInfoList.reduce((pre, item) => {
        if (item.isChecked) {
          return (pre + item.skuNum)
        } else {
          return pre
        }

      }, 0)
    },
    //总价
    totalPrice() {
      return this.cartInfoList.reduce((pre, item) => {
        if (item.isChecked) {
          return (pre + item.skuPrice * item.skuNum)
        }
        else {
          return pre
        }
      }, 0)
    }
  },
  methods: {
    // 获取商品数据
    getCartList() {
      this.$store.dispatch('getShopCartList')
    },
    /**修改购物车商品数量 */
    async changeCartNum(event, cartItem, num, flag) {
      let skuNum = num
      if (!flag) {
        skuNum = num - cartItem.skuNum
        if (!(num >= 1)) {
          alert('购物车商品只能为数字且不小于1')
          event.target.value = cartItem.skuNum
          return
        }
      }
      if (skuNum + cartItem.skuNum < 1) {
        alert('购物车商品不能小于1')
        event.target.value = cartItem.skuNum
        return
      }
      let skuInfo = { skuId: cartItem.skuId, skuNum }
      try {
        await this.$store.dispatch('addOrUpdCart', skuInfo)
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    /**
     *修改单个是否选中 
     */
    async changeIsChecked(e, cartItem) {
      let { skuId, isChecked } = cartItem
      try {
        await this.$store.dispatch('updCartIsCheck', {
          skuId,
          isChecked: isChecked ? 0 : 1
        })
        this.getCartList()
      } catch (error) {
        e.target.checked = isChecked
        alert(error.message)
      }
    },
    /**
  * 删除购物车中单个商品
  */
    async delShopCart(skuId) {
      try {
        await this.$store.dispatch('delShopCart', skuId)
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    /**
     * 删除购物车中选中商品
     */
    async delCheckShopCart() {
      try {
        await this.$store.dispatch('delCheckShopCart')
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    }
  },

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 20%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 28%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 13%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          line-height: 82px;
          width: 10%;

          &>input {
            caret-color: transparent;
          }
        }

        .cart-list-con2 {
          width: 38%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 11%;
          line-height: 82px;
        }

        .cart-list-con5 {
          width: 16%;
          padding-top: 24.2px;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 15px;
            text-align: center;
            padding: 8px 0;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33.6px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 15px;
            text-align: center;
            padding: 8px 0;
          }

          .mins:hover,
          .plus:hover {
            background: #ddd;
          }
        }

        .cart-list-con6 {
          width: 12%;
          line-height: 82px;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;
          line-height: 41px;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin-bottom: 10px;

    &>* {
      line-height: 32px;
    }

    .select-all {
      padding: 8px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        caret-color: transparent;
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        float: left;
        padding: 0 10px;
        line-height: 50px;
      }

      .sumprice {
        width: 200px;
        float: left;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;

        em {
          font-size: 14px;
        }

        .summoney {
          color: #c81623;
          font-size: 15px;
          vertical-align: middle;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>