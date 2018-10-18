<template>
  <div id="goodsDetail_notes">
    <ywBar v-if="true" type="whiteIcon"></ywBar>

    <div class="content" ref="content">

      <div class="cBox">
        <template v-for="(item, index) in all">
          <swiper class='swiper' v-if="type == index" :options="item.opt" :key="index">
            <swiper-slide>
              <div class='swiperImg'>
                <h6>全自动机械表使用注意事</h6>
                <p>非专业人士请勿打开后盖以防损坏</p>
                <p>在晚上十点至凌晨二点之间禁止调时</p>
                <p>手表调校后务必将柄头推回到底</p>
                <p>表带长度调整：小幅度调整可移动针扣位置，大幅调整需拆装表带带粒</p>
                <p>机械自动表在佩戴者活动较小时走时可能偏慢，此属于正常现象。首次使用请旋转柄头20-30次，使发条初始上旋。</p>
                <h6>手表机械表使用注意事</h6>
                <p>每24小时上满发条一次，以保证走时跳日所需的足够力。上发条时12点向上持表，按顺时针方向旋转表把至上满条。注意上满发条后不要用力旋转表把，以免拧断上条柄轴或发条。</p>
                <p>快速调整日历需拔出表把，将时分针对准12点逆时针方向拨3-4小时，再顺时针方向拨回12点日历即快调一日。或拔出表把转动，使时分针方向旋转两圈，也可使日历顺跳一日。</p>
                <p>表带长度调整：小幅度调整可移动针扣位置，大幅调整需拆装表带带轴。</p>
                <p>使用时尽量不接触水、蒸汽、高温以及腐蚀性气体，以免对机芯和外观造成不必要的损害。同时要避免强烈震动，并远离强磁场环境。</p>
                <h6>石英表使用注意事</h6>
                <p>非专业人士请勿打开后盖以防损坏。</p>
                <p>在晚上十点至凌晨二点之间禁止调时。</p>
                <p>手表调校后务必将柄头推回到底。</p>
                <div style="height:1rem;"></div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class='swiperImg'>
                <ul>
                  <li>·“YOUWATCH”在核对您所订购的商品、邮寄地址、款项支付等信息无误后确认订单，订单确认后会尽快给您发货。</li>
                  <li>· 发货时间：正常情况下，我们将会在确认订单后48小时之内发货。如若碰到恶劣天气等其他特殊情况，我们会及时通知您并另行安排发货时间。</li>
                  <li>· 包裹发出后，您可以在账户的订单信息中，实时查询包裹在途情况。 ·平台默认发顺丰快递，由退款/退货产生的运费，将有责任方承担。</li>
                </ul>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class='swiperImg'>
                <div style="height:0.3rem;"></div>
                <h5>一、服务承诺</h5>
                <p>对于“YOUWATCH”售出的商品，我们为您提供3天退货保障，考虑到本站商品的特性，大多数商品只有一件，因此暂不支持换货。</p>
                <div style="height:0.1rem;"></div>
                <h5>二、退款、退货规细则</h5>
                <h5>关于退款</h5>
                <p>1）买家在完成订单支付且卖家未点击“发货”的状态下，可申请退款，否则无法申请退款。
                  <br>2）退款金额将在7个工作日之内原路返还至账户中。</p>
                <div style="height:0.1rem;"></div>
                <h5>关于退货</h5>
                <p>商品如若出现以下情况，自商品签收次日起3日内可提出退货请求：</p>
                <p>1）商品实际品相与评估分级描述不符的可申请退货。 2）商品自签收日期3日内，商品本身出现质量问题，如机芯故障影响使用，经鉴定属实，我们可以为您提供退货或维修服务。</p>
                <div style="height:0.1rem;"></div>
                <h5>不可办理退货条件：</h5>
                <p>1）腕表类商品均属于高档特殊商品， 购买成功后，非质量问题，不予退货。
                  <br>2) 商品任何因不当使用及未妥善保管而导致的质量问题的。
                  <br>3) 因非正常使用/滥用、粗心大意、过失、意外（撞击、敲击、挤压、表面破损及其他)、 不正确使用、不遵守品牌提供的使用说明而造成的手表任何部件的任何破损。
                  <br>4) 商品防损吊牌出现变形、破损、断裂等与出库原貌不同的。
                  <br>5) 商品产品标识、包装、吊牌、三包卡、说明书、发票、赠品、配件等缺失的。
                  <br>6) 商品经使用、佩戴、遭污损、损坏、磨损等情形的。
                  <br>7) 商品出现外观问题（不属于国家三包政策规定的质量问题），如：如壳、面、针、柄头、玻璃，外观固定件及表带等。
                  <br>8) 电池的使用寿命，非腕表本身质量问题。
                  <br>9) 手表表带经过调整，不予退货。</p>
                <div style="height:1rem;"></div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class='swiperImg'>
                4
              </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>

          </swiper>
        </template>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: 0,
        all: [{
            'opt': {
              loop: false,
              initialSlide: '0',
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
                clickableClass: 'my-pagination-clickable',
                renderBullet: function (index, className) {
                  let text = '';
                  switch (index) {
                    case 0:
                      text = '注意事项';
                      break;
                    case 1:
                      text = '物流须知';
                      break;
                    case 2:
                      text = '退换货政策';
                      break;
                    case 3:
                      text = '温馨提示';
                      break;
                  }
                  return '<span class="' + className + '">' + text + '</span>';
                },
              },
              scrollbar: {
                el: '.swiper-scrollbar',
                dragSize: 10,
              },
            }
          },
          {
            'opt': {
              loop: false,
              initialSlide: '1',
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
                clickableClass: 'my-pagination-clickable',
                renderBullet: function (index, className) {
                  let text = '';
                  switch (index) {
                    case 0:
                      text = '注意事项';
                      break;
                    case 1:
                      text = '物流须知';
                      break;
                    case 2:
                      text = '退换货政策';
                      break;
                    case 3:
                      text = '温馨提示';
                      break;
                  }
                  return '<span class="' + className + '">' + text + '</span>';
                },
              },
              scrollbar: {
                el: '.swiper-scrollbar',
                dragSize: 10,
              },
            }
          },
          {
            'opt': {
              loop: false,
              initialSlide: '2',
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
                clickableClass: 'my-pagination-clickable',
                renderBullet: function (index, className) {
                  let text = '';
                  switch (index) {
                    case 0:
                      text = '注意事项';
                      break;
                    case 1:
                      text = '物流须知';
                      break;
                    case 2:
                      text = '退换货政策';
                      break;
                    case 3:
                      text = '温馨提示';
                      break;
                  }
                  return '<span class="' + className + '">' + text + '</span>';
                },
              },
              scrollbar: {
                el: '.swiper-scrollbar',
                dragSize: 10,
              },
            }
          },
          {
            'opt': {
              loop: false,
              initialSlide: '3',
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
                clickableClass: 'my-pagination-clickable',
                renderBullet: function (index, className) {
                  let text = '';
                  switch (index) {
                    case 0:
                      text = '注意事项';
                      break;
                    case 1:
                      text = '物流须知';
                      break;
                    case 2:
                      text = '退换货政策';
                      break;
                    case 3:
                      text = '温馨提示';
                      break;
                  }
                  return '<span class="' + className + '">' + text + '</span>';
                },
              },
              scrollbar: {
                el: '.swiper-scrollbar',
                dragSize: 10,
              },
            }
          }
        ],
      }
    },
    methods: {

    },
    mounted() {

    },
    activated() {
      this.type = this.$route.query.type;
    },
    deactivated: function () {
      console.log("我已经离开了！");
    },
  };

</script>

<style scoped>
  #goodsDetail_notes {
    background: #fff;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 1rem;
    padding-bottom: 0;
  }

  .cBox {
    height: 100%;
  }

  .swiperImg {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .swiperImg img {
    display: block;
    width: 100%;
  }

  .swiperImg h6 {
    height: .58rem;
    line-height: 0.58rem;
    background: rgba(51, 51, 51, 1);
    font-size: .24rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    padding: 0 0.3rem;
    margin: 0.4rem 0;
  }

  .swiperImg p,
  h5 {
    font-size: .24rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: .36rem;
    letter-spacing: 1px;
    padding: 0.1rem 0.54rem;
  }

  .swiperImg h5 {
    padding-bottom: 0.2rem;
  }

  .swiperImg ul {
    list-style: none;
    padding: 0.3rem 0.5rem;

  }

  .swiperImg ul li {
    font-size: .26rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: .37rem;
    padding: 0.15rem 0;
  }

</style>

<style>
  /* 主要用来修改组件css */

  #goodsDetail_notes .swiper-container {
    height: 100%;
    padding-top: 1rem;
  }

  #goodsDetail_notes .swiper-pagination {
    height: 1rem;
    background: #fff;
    top: 0;
    line-height: 1rem;
    display: flex;
    justify-content: space-around;
  }

  #goodsDetail_notes .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    width: auto;
    height: 100%;
    color: #333333;
    opacity: 1;
    background: none;
    width: 1.5rem;
  }

  #goodsDetail_notes .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet-active {
    color: #C88E64;
  }

  #goodsDetail_notes .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet-active::after {
    /* content: '';
    width: .20rem;
    height: 0.04rem;
    display: block;
    background: rgba(200, 142, 100, 1);
    border-radius: 0.1rem;
    position: relative;
    top: -0.05rem;
    margin: auto; */
  }


  #goodsDetail_notes .swiper-pagination-bullet,
  #goodsDetail_notes .swiper-pagination-bullet:focus,
  #goodsDetail_notes .swiper-pagination-bullet:hover,
  #goodsDetail_notes .swiper-pagination-bullet:active,
  #goodsDetail_notes .swiper-pagination-bullet:visited,
  #goodsDetail_notes .swiper-pagination-bullet:link {
    outline: none;
  }

  #goodsDetail_notes .swiper-container-horizontal>.swiper-scrollbar {
    width: 77.8%;
    top: 0.92rem;
    left: 11%;
    height: 0.06rem;
    background: none;
  }

  #goodsDetail_notes .swiper-scrollbar-drag {
    background: rgba(200, 142, 100, 1);
  }

</style>
