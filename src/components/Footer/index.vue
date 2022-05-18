<template>
  <div class="footer">
    <div class="footer-container">
      <div class="footerList clearfix">
        <div class="footerItem">
          <h4>购物指南</h4>
          <ul class="footerItemCon">
            <li>购物流程</li>
            <li>会员介绍</li>
            <li>生活旅行/团购</li>
            <li>常见问题</li>
            <li>购物指南</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>配送方式</h4>
          <ul class="footerItemCon">
            <li>上门自提</li>
            <li>211限时达</li>
            <li>配送服务查询</li>
            <li>配送费收取标准</li>
            <li>海外配送</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>支付方式</h4>
          <ul class="footerItemCon">
            <li>货到付款</li>
            <li>在线支付</li>
            <li>分期付款</li>
            <li>邮局汇款</li>
            <li>公司转账</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>售后服务</h4>
          <ul class="footerItemCon">
            <li>售后政策</li>
            <li>价格保护</li>
            <li>退款说明</li>
            <li>返修/退换货</li>
            <li>取消订单</li>
          </ul>
        </div>
        <div class="footerItem">
          <ul class="footerItemCon">
            <h4>特色服务</h4>
            <li>夺宝岛</li>
            <li>DIY装机</li>
            <li>延保服务</li>
            <li>尚品汇E卡</li>
            <li>尚品汇通信</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>帮助中心</h4>
          <img src="./images/kf.png" />
        </div>
      </div>
      <div class="copyright">
        <ul class="helpLink">
          <li>
            <a href="###" target="_blank">关于我们</a>
            <span class="space"></span>
          </li>
          <li>
            <a href="###" target="_blank">联系我们</a>
            <span class="space"></span>
          </li>
          <li>
            <a href="###" target="_blank">关于我们</a>
            <span class="space"></span>
          </li>
          <li>
            <a href="###" target="_blank">商家入驻</a>
            <span class="space"></span>
          </li>
          <li>
            <a href="###" target="_blank">营销中心</a>
            <span class="space"></span>
          </li>
          <li>
            <a href="###" target="_blank">友情链接</a>
            <span class="space"></span>
          </li>
          <li>
            <a href="###" target="_blank">关于我们</a>
          </li>
        </ul>
        <p>地址:北京市昌平区宏福科技园综合楼6层</p>
        <p>京ICP备19006430号</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
}
</script>
<style lang="less" scoped>
.footer {
  background: #eaeaea;

  .footer-container {
    width: 1200px;
    height: 380px;
    margin: 0 auto;
    padding: 0 15px;

    .footerList {
      height: 250px;
      padding: 20px;
      border-top: 1px solid #e4e1e1;
      border-bottom: 1px solid #e4e1e1;

      .footerItem {
        width: calc(100% / 6);
        float: left;
        padding-left: 55px;

        h4 {
          font-size: 15px;
          line-height: 50px;
        }

        img {
          width: 85px;
        }

        .footerItemCon {
          li {
            line-height: 18px;
          }
        }
      }
    }

    .copyright {
      padding: 20px;

      .helpLink {
        display: flex;
        justify-content: center;

        li {
          margin-right: 10px;

          a {
            line-height: 15px;
          }

          .space {
            margin-left: 10px;
            display: inline;
            height: 15px;
            border-left: 1px solid #aaaaaa;
          }
        }
      }

      p {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
}
</style>