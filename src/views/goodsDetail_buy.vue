<template>
  <div id="goodsDetail">
    <scrollToTop :scTop="sctop" @click.native="goMyTop()" :style="{'position':'absolute','bottom': power>=0?'1.5rem':'0.5rem','right': '0.5rem'}"></scrollToTop>
    <ywBar v-if="isApp || true" type="shareBuyApp" :goodsId="goodsId" :goodsName="proName" :goodsImg="slides[0]" :shareBtnShow="showBuy"></ywBar>
    <footer v-if="power>=0">
      <!-- <div class="shadow"></div> -->
      <div class="btnBox">
        <template>
          <div class="kefu" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError">
            <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_kefu.png" alt="">
            <p>客服</p>
          </div>
          <ywBtn :class="{'no':!canClick || homeGoods=='1'||proPrice==-1 || totalStock<1 || secondKillStartTime>0}" class="cBtn cBtn-buy"
            :text="secondKillStartTime>0?`距开始 ${zeroFill(Math.floor((secondKillStartTime + 0.5) / (3600)))}:${zeroFill(Math.floor((secondKillStartTime + 0.5) / (60)) % 60)}:${zeroFill(secondKillStartTime % (60))}`:(totalStock==0?'已售罄':'立即下单')"
            @click.native="toBuy(goodsId,shopId)"></ywBtn>
          <ywBtn :class="{'no':!canClick || homeGoods=='1'||proPrice==-1 || totalStock==-1}" class="cBtn cBtn-ans" text="立即推⼴" @click.native="shareToImg(goodsId)"></ywBtn>
        </template>
      </div>
    </footer>

    <div class="content" ref="content">
      <div class="banner">
        <div class='swiperImg' v-if="slides.length==1" :style="{'background-image':'url('+slides[0]+')'}"></div>
        <swiper class='swiper' v-if="slides.length>1" :options="swiperOption">
          <swiper-slide v-for="(item, key) in slides" :key="key">
            <div class='swiperImg' :style="{'background-image':'url('+item+')'}"></div>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="proInfo">
        <div class="proBox">
          <p class="pro_price" v-if="proPrice==-1">
            <span>登录查看同行价</span>
          </p>
          <p class="pro_price" v-else>
            <span v-if='proPrice'>￥</span>{{proPrice}}
            <del v-if="retailPrice">￥{{retailPrice}}</del>
            <span class="bor-ra" v-if="discount">{{discount}}折</span>
            <span class="bor-ra" v-if="rakeBackShow">返佣{{rakeBackShow}}</span>
          </p>
          <p class="pro_name">{{proName}}</p>
        </div>
      </div>
      <div class="cutApart"></div>
      <div class="imgBox">
        <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/service.png" alt="" @click="toPromise">
      </div>
      <div class="cutApart"></div>
      <div class="imgBox">
        <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/process.png" alt="">
        <span style="display:block;width: 34%;height: 0.5rem;position: absolute;background: none;top: 0.45rem;left: 37%;opacity: 0.5;"
          @click="popupShow=!popupShow"></span>
      </div>
      <div class="cutApart"></div>
      <div class="proAttr">
        <h6>商品属性</h6>
        <ul>
          <li>
            <div class="left">商品成色</div>
            <div class="right">{{propsName.new_old_level||'—'}}</div>
          </li>
          <li>
            <div class="left">机芯类型</div>
            <div class="right">{{propsName.jixinleixing || '—'}}</div>
          </li>
          <li>
            <div class="left">表壳材质</div>
            <div class="right">{{propsName.watch_metal || '—'}}</div>
          </li>
          <li>
            <div class="left">表带材质</div>
            <div class="right">{{propsName.dai_metal || '—'}}</div>
          </li>
          <li>
            <div class="left">表盘形状</div>
            <div class="right">{{propsName.pan_xingzhuang || '—'}}</div>
          </li>
          <li>
            <div class="left">表盘颜色</div>
            <div class="right">{{propsName.dial_color || '—'}}</div>
          </li>
          <li>
            <div class="left">复杂功能</div>
            <div class="right">{{propsName.complex_function || '—'}}</div>
          </li>
          <li>
            <div class="left">适用人群</div>
            <div class="right">{{propsName.sex || '—'}}</div>
          </li>
          <li>
            <div class="left">适用场合</div>
            <div class="right">{{propsName.changhe || '—'}}</div>
          </li>
          <li>
            <div class="left">产地</div>
            <div class="right">{{propsName.manufacturePlace || '—'}}</div>
          </li>
        </ul>
      </div>
      <div class="cutApart"></div>
      <div class="proImg">
        <h6 style="padding-left:.3rem;padding-right:.3rem;">商品详情</h6>
        <div>
          <img v-if="'全新'!=propsName.new_old_level" src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/level.png" alt="">
          <div class="productClass" v-if="productDesc" v-html="productDesc">{{productDesc}}</div>
          <template v-for='(item,index) in otherImageUrlList'>
            <img :src="item" alt="" :key="index">
          </template>
        </div>
      </div>
      <div class="scrImg" v-if="false">
        <img class="img" src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/1.png" alt="">
        <img class="img" src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/2.png" alt="">
        <img class="img" src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/3.png" alt="">
      </div>
      <div class="cutApart"></div>
      <div class="proAttr">
        <h6>购表须知</h6>
        <ul>
          <li class="all" @click="toNotes('0')">注意事项</li>
          <li class="all" @click="toNotes('1')">物流须知</li>
          <li class="all" @click="toNotes('2')">退/换货政策</li>
          <li class="all" @click="toNotes('3')">温馨提示</li>
        </ul>
      </div>
      <div class="cutApart"></div>
    </div>

    <div class="popupBox" v-show="popupShow" @click="popupShow=!popupShow">
      <div class="flexEnd" @click="stop">
        <div style="text-align:right;">
          <span @click="popupShow=!popupShow">关闭</span>
        </div>
        <h3>交易流程</h3>
        <p>YOUWATCH合伙人在平台下单后，平台将在1~2个工作日安排发货至北京鉴定中心进行确认，之后将在1~3个工作日送达合伙人的收件地址。（如遇节假日或恶劣天气等特殊情况，物流时长会有相应延迟，具体情况平台客服会及时反馈。）</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    maiShouGoodsDetail, //商品详情
    loadMyGoodsDetailForShare, //分享后的商品详情
    collect, //收藏
    cancelCollect, //取消收藏
    askPriceApp, //询价
  } from '../api/api'
  export default {
    data() {
      return {
        device: '', //设备
        pageUrl: '', //当前页面，存在的值，goodsDetail_buy：详情app，goodsDetHv：详情h5,goodsDetRush：详情抢购
        sctop: false, //滚动到顶部的按钮是否出现
        slides: [], //轮播的banner图
        proName: '', //商品名称
        proPrice: '', //商品价格,sall代理价，shopPurchase平台采购价，retail零售价
        retailPrice: '', //抢购价格的原先价格
        rushBuyGoodsItemVO: {}, //抢购信息
        rushBuyStatus: '', //抢购状态,1：已结束，2：抢购中，3：在活动时间内未开始，4：非活动时间内未开始
        productAttributeList: [], //商品属性
        shopInfo: {}, //商家信息
        // baseInfo: {}, //基本信息
        otherImageUrlList: [], //商品图片
        goodsId: 0, //商品id
        shopId: 0, //商家id
        isApp: true, //是否处于有表app里
        canClick: true, //按钮是否可点击
        productDesc: '', //商品描述
        newOldLevel: {}, //新旧程度
        totalStock: -1, //商品库存
        homeGoods: 0, //自家商品，0不是自家，1是自家
        isCollect: null, //该商品是否收藏，0未收藏，1已收藏，null没有收藏功能
        propsName: {}, //商品属性
        power: 0, //权限，-1都隐藏，0都出现，1询价单个出现，2购买单个出现
        popupShow: false, //弹窗是否显示
        discount: '', //折扣
        rakeBackShow: '', //返佣
        message: 'YOUWATCH-KEFU',
        secondKillStartTime: 0, //秒杀时间
        showBuy: false, //页面顶部的分享显示隐藏
        countDownShow: true, //倒计时显示
        countDown: { //倒计时
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            clickableClass: 'my-pagination-clickable',
          },
        }
      }
    },
    methods: {
      detailInfo(data) {
        this.dataInterface(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.shopId = res.data.body.shopId;
            $this.slides = res.data.body.imgUrlList.length > 0 ? res.data.body.imgUrlList : [
              'https://youwatch.oss-cn-beijing.aliyuncs.com/app/img_default.png'
            ];
            $this.proName = res.data.body.goodsName;
            $this.productAttributeList = res.data.body.productAttributeList;
            $this.shopInfo = res.data.body.shopInfo;
            $this.otherImageUrlList = res.data.body.otherImageUrlList;
            $this.goodsId = res.data.body.goodsId;
            $this.productDesc = res.data.body.productDesc;
            $this.newOldLevel = res.data.body.newOldLevel;
            $this.totalStock = res.data.body.totalStock;
            $this.homeGoods = res.data.body.homeGoods;
            $this.isCollect = res.data.body.isCollect;
            $this.propsName = res.data.body.propsName || {};
            $this.propsName.manufacturePlace = res.data.body.manufacturePlace;
            $this.rushBuyGoodsItemVO = res.data.body.rushBuyGoodsItemVO || {};
            $this.discount = res.data.body.discount;
            $this.rakeBackShow = res.data.body.rakeBackShow;
            $this.secondKillStartTime = parseInt(res.data.body.secondKillLeftTime / 1000 || 0);
            let killsTime = setInterval(() => {
              if ($this.secondKillStartTime > 0) {
                $this.secondKillStartTime--;
              } else {
                clearInterval(killsTime);
              }
            }, 1000);
            if ($this.pageUrl == 'goodsDetail_buy') {
              $this.proPrice = res.data.body.showPrice;
              $this.retailPrice = res.data.body.marketPrice;
            }
            if ($this.pageUrl == 'goodsDetHv') {
              $this.proPrice = res.data.body.retailPrice || res.data.body.salePrice;
            }
            if ($this.pageUrl == 'goodsDetRush') {

              if ('{}' != JSON.stringify($this.rushBuyGoodsItemVO)) {
                $this.rushBuyStatus = $this.rushBuyGoodsItemVO.activityStatus;
                $this.postRushBuyStatus($this.rushBuyStatus);
              } else {
                $this.postRushBuyStatus("1");
              }
            }

            //微信分享
            let data = {
              'title': $this.shopInfo && $this.shopInfo.cnName ? $this.shopInfo.cnName : '有表',
              'desc': $this.proName,
              'imgUrl': $this.slides[0],
            };
            // console.log(data);
            $this.wxShare(data);

          });
        }).catch((err) => {
          console.log(err);
          this.axiosCatch(err, "on");
        });
      },
      //抢购状态
      postRushBuyStatus(status) {
        this.rushBuyStatus = status;
        if (status == '1') {
          let $this = this;
          this.activatedFuc('goodsDetail_buy');
          this.countDownShow = false;
          this.proPrice = this.rushBuyGoodsItemVO.shopPurchasePrice;
          this.retailPrice = '';
        }
        if (status == '2') {
          this.proPrice = this.rushBuyGoodsItemVO.grabPrice;
          this.retailPrice = this.rushBuyGoodsItemVO.shopPurchasePrice;
          this.countDownFuc(status, this.rushBuyGoodsItemVO.activityEndTime);
        }
        if (status == '3' || status == '4') {
          this.proPrice = this.rushBuyGoodsItemVO.shopPurchasePrice;
          this.retailPrice = '';
          this.countDownFuc(status, this.rushBuyGoodsItemVO.grabStartTime);
        }
      },
      //倒计时
      countDownFuc(status, timeStamp) {
        let nowTimes = new Date().getTime();
        let endTime = parseInt(timeStamp);
        let times = nowTimes > endTime ? 0 : parseInt((endTime - nowTimes) / 1000);
        let countDownTime = setInterval(() => {
          this.countDown.hours = Math.floor((times + 0.5) / (3600));
          this.countDown.minutes = Math.floor((times + 0.5) / (60)) % 60;
          this.countDown.seconds = times % (60);
          this.countDownShow = times >= 0;
          times--;
          if (times < 0) {
            clearInterval(countDownTime);
            status = status == '3' || status == '4' ? '2' : '1';
            this.postRushBuyStatus(status);
          }
        }, 1000);
      },
      //补0
      zeroFill(a) {
        if (10 > a) {
          return "0" + a;
        } else {
          return a;
        }
      },
      //页面接口
      dataInterface(data) {
        let thisPageUrl = this.pageUrl;
        return new Promise(function (resolve, reject) {
          if (thisPageUrl == 'goodsDetail_buy') {
            resolve(maiShouGoodsDetail(data));
          }
          if (thisPageUrl == 'goodsDetHv') {
            resolve(loadMyGoodsDetailForShare(data));
          }
        });
      },
      // 复制成功
      onCopy(e) {
        // this.goTel('4000116008');
        // return false;

        let nostyle = 'linear-gradient(32deg,rgba(200,142,100,0.65) 0%,rgba(200,142,100,1) 100%)!important';
        this.$confirm({
          title: ' ',
          content: '客服微信<' + this.message + '>已复制到剪贴板，快打开微信去添加吧~',
          yesText: "取消",
          noText: '去添加',
          noStyle: {
            "background": nostyle
          },
        }).then(res => {}).catch(err => {
          let device = this.whichDevice();
          if (device == "androidApp") {
            window.Android.callWeChat();
          } else if (device == "iosApp") {
            window.webkit.messageHandlers.callWeChat.postMessage('');
          }
        });
      },
      // 复制失败
      onError(e) {
        this.toast(`复制失败`);
      },
      toPromise() {
        this.$router.push({
          path: '/promise',
          query: {
            'type': '1',
          }
        });
      },
      //多接口数据统一处理
      // dataHandle(res) { // let $this = this; // },

      //初始化数据
      dataInit() {
        this.device = '';
        this.pageUrl = '';
        this.sctop = false;
        this.slides = [];
        this.proName = '';
        this.proPrice = '';
        this.retailPrice = '';
        this.rushBuyGoodsItemVO = {};
        this.rushBuyStatus = '';
        this.productAttributeList = [];
        this.shopInfo = {};
        // this.baseInfo = {};
        this.otherImageUrlList = [];
        this.goodsId = 0;
        this.shopId = 0;
        // this.isApp = true;
        this.canClick = true;
        this.productDesc = '';
        this.newOldLevel = {};
        this.totalStock = -1;
        this.homeGoods = 0;
        this.isCollect = null;
        // this.power = -1;
        this.popupShow = false; //弹窗是否显示
        this.discount = ''; //折扣
        this.rakeBackShow = ''; //返佣
        this.secondKillStartTime = 0;
        this.showBuy = false;
        this.countDownShow = true;
        this.propsName = {};
      },
      //分享
      shareToImg(id) {
        let device = this.whichDevice();
        if (device == "androidApp") {
          window.Android.shareNine(id);
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.shareNine.postMessage(id);
        }
      },
      //购买
      toBuy(goodsId, shopId) {
        this.$router.push({
          path: '/orderFirm',
          query: {
            'goodsId': goodsId,
            'origin': 'buy'
          }
        });
      },
      //阻止冒泡
      stop(event) {
        event.stopPropagation();
      },
      //登录
      toSignIn() {
        this.appSignIn();
      },
      goMyTop() {
        this.goTop(this.$refs.content, 0);
      },
      //页面滚动事件
      handleScroll() {
        let scrollTop = this.$refs.content.scrollTop;
        if (scrollTop > 300) {
          this.sctop = true;
        } else {
          this.sctop = false;
        }
        sessionStorage.setItem("detBuy", scrollTop);
      },
      //购买须知
      toNotes(type) {
        this.$router.push({
          path: '/goodsDetail_notes',
          query: {
            'type': type
          }
        });
      },
      //JS接收OC传值的代码
      payResult(str) {
        let askPrice = str.indexOf('ask-price') > -1;
        let goodsBuy = str.indexOf('goods-buy') > -1;
        if (askPrice && goodsBuy) {
          this.power = 0;
        } else if (askPrice) {
          this.power = 1;
        } else if (goodsBuy) {
          this.power = 2;
        } else {
          this.power = -1;
        }
      },

      //activated执行的方法
      activatedFuc(introduction) {
        this.dataInit();

        let thisPageUrl = window.location.href;
        if (introduction) {
          this.pageUrl = introduction;
        } else if (thisPageUrl.indexOf('goodsDetail_buy') > -1) {
          this.pageUrl = 'goodsDetail_buy';
        } else if (thisPageUrl.indexOf('goodsDetHv') > -1) {
          this.pageUrl = 'goodsDetHv';
        } else if (thisPageUrl.indexOf('goodsDetRush') > -1) {
          this.pageUrl = 'goodsDetRush';
        }

        let goodsId = this.$route.query.goodsId;
        let agentId = this.$route.query.goodsAgentId;
        let activityId = this.$route.query.activityId;
        let obj = {};
        if (this.pageUrl == 'goodsDetail_buy') {
          obj = {
            'goodsId': goodsId
          }
        }
        if (this.pageUrl == 'goodsDetRush') {
          obj = {
            'goodsId': goodsId,
            'activityId': activityId,
          }
        }
        if (this.pageUrl == 'goodsDetHv') {
          if (agentId) {
            obj = {
              'agentId': agentId
            }
          } else if (goodsId) {
            obj = {
              'goodsId': goodsId
            }
          }
        }
        this.detailInfo(obj);
      },
      //JS接收OC传值的代码
      getVersion(str) {
        str = str.split('v')[1];
        let device = this.whichDevice();
        let reqV = '1.2.3';
        if (device == "androidApp") {
          reqV = '1.2.1';
        } else if (device == "iosApp") {
          reqV = '1.2.3';
        }
        let arr1 = str.split('.'),
          arr2 = reqV.split('.');
        let minLength = Math.min(arr1.length, arr2.length),
          position = 0,
          diff = 0;
        //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
        while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
          position++;
        }
        diff = (diff != 0) ? diff : (arr1.length - arr2.length);
        //若curV大于reqV，则返回true
        this.showBuy = diff > 0;
      },
    },
    mounted() {
      window.payResult = this.payResult;
      window.getVersion = this.getVersion;
      let device = this.whichDevice();
      this.device = device;
      if (device != "androidApp" && device != "iosApp") {
        this.isApp = false;
      }
      this.$refs.content.addEventListener('scroll', this.handleScroll);
    },
    activated() {
      if (!this.$route.meta.isBack) {
        this.activatedFuc();
      } else {
        this.$refs.content.scrollTop = sessionStorage.getItem("detBuy");
      }
    },
    deactivated: function () {
      console.log("我已经离开了！");
    },
  };

</script>

<style scoped>
  #goodsDetail {
    background: #fff;
    height: 100%;
  }

  .cBtn.no {
    pointer-events: none;
    opacity: 0.2;
  }

  .cBtn.radius {
    border-radius: 1rem !important;
  }

  .cBtn-ans {
    background: linear-gradient(159deg, rgba(230, 193, 157, 1) 0%, rgba(200, 142, 100, 1) 100%) !important;
  }

  .cBtn-buy {
    background: linear-gradient(160deg, rgba(98, 98, 98, 1) 0%, rgba(51, 51, 51, 1) 100%) !important;
    /* margin-right: 0.2rem; */
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    /* padding-top: .3rem; */
    padding-bottom: 1rem;
  }

  .banner {
    width: 100%;
    margin: auto;
    min-height: 7.5rem;
  }

  .swiper {
    height: 7.5rem;
    box-sizing: initial;
  }

  .swiperImg {
    height: 7.5rem;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .proInfo,
  .proAttr,
  .shopInfo {
    width: 6.9rem;
    margin: auto;
  }

  .proAttr ul li,
  .shopInfo ul li,
  .baseInfo ul li {
    display: flex;
    font-size: .24rem;
    line-height: 1rem;
    border-bottom: 1px solid #F5F6F6;
  }

  .proAttr ul li:last-child {
    border-bottom: none;
  }

  .proAttr ul li.all {
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/arrow_right_gray.png') no-repeat center right/0.1rem;
  }

  .proAttr .left,
  .shopInfo .left,
  .baseInfo .left {
    width: 50%;
    color: #999;
    font-family: PingFangSC-Regular;
  }

  .proAttr .right,
  .shopInfo .right,
  .baseInfo .right {
    flex: 1;
    color: #333333;
    text-align: right;
  }

  .cutApart {
    height: .16rem;
    background: rgba(250, 250, 250, 1);
  }

  .proInfo {
    padding-top: .4rem;
    padding-bottom: .4rem;
    /* border-bottom: 1px solid #f5f6f6; */
    display: flex;
    align-items: center;
  }

  .proBox {
    flex: 1;
  }

  .collection {
    width: 0.8rem;
    margin-left: 0.5rem;
    position: relative;
    top: 1px;
    text-align: center;
  }

  .heart_shape {
    display: block;
    width: 0.47rem;
    height: 0.37rem;
    margin: auto;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Ficon_collectionNo.png') no-repeat center/100% 100%;
  }

  .heart_shape.selected {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Ficon_collection.png');
  }


  .pro_price {
    font-family: DINAlternate-Bold;
    font-size: .4rem;
    color: #333;
    line-height: .24rem;
  }

  .pro_price span {
    font-size: .24rem;
  }

  .pro_price del {
    font-size: .24rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #999;
    margin-left: 0.1rem;
  }

  .pro_price .bor-ra {
    font-size: .24rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #C88E64;
    margin-left: 0.1rem;
    border-radius: 1rem;
    border: 1px solid #C88E64;
    padding: 0 0.12rem;
  }

  .pro_name {
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #333333;
    line-height: .30rem;
    margin-top: .2rem;
  }

  .proImg {
    padding: 0 0.5rem;
  }

  .proImg img {
    width: 100%;
    display: block;
    margin-bottom: .2rem;
  }

  .btnShop {
    border: 1px solid #000000;
    border-radius: 22px;
    padding: 0 .2rem;
    width: auto;
    height: .44rem;
    line-height: .42rem;
    font-family: PingFangSC-Regular;
    font-size: .24rem;
    color: #000000;
    margin: auto;
    margin-top: .4rem;
  }

  h6 {
    font-family: PingFangSC-Medium;
    font-size: .24rem;
    color: #333333;
    font-weight: normal;
    padding-top: 0.6rem;
    padding-bottom: .4rem;
    text-align: center;
  }

  .imgBox {
    position: relative;
  }

  .imgBox img {
    display: block;
    width: 100%;
  }

  .proAttr,
  .shopInfo {
    width: 5rem;
    padding-top: 0;
    padding-bottom: .2rem;
    /* border-bottom: 1px solid #f5f6f6; */
  }

  .scrImg {
    padding: 0 0.5rem;
  }

  .scrImg img {
    width: 100%;
    display: block;
  }


  .scrImg .img {
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 15;
  }

  footer .shadow {
    opacity: 0.25;
    background-image: linear-gradient(-180deg, rgba(238, 238, 238, 0.00) 11%, rgba(181, 181, 181, 0.96) 100%);
    height: .31rem;
  }

  footer .btnBox {
    height: 1rem;
    background: #fff;
    display: flex;
    align-items: center;
  }

  footer .btnBox button {
    background-image: linear-gradient(-57deg, #fb6455 10%, #fe3d36 100%);
    /* border-radius: 1rem; */
    /* width: 1.80rem; */
    height: 100%;
    line-height: 1rem;
    color: #fff;
    width: 38.66%;
  }

  footer .btnBox .kefu {
    text-align: center;
    font-size: .20rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    flex: 1;
  }

  footer .btnBox .kefu img {
    display: block;
    width: 0.36rem;
    height: 0.36rem;
    margin: auto;
    margin-bottom: 0.06rem;
  }

  .productClass {
    padding: 0.1rem 0.3rem 0 0.3rem;
  }

  /* 抢购 */

  .rush_buy {
    width: 100%;
    height: .70rem;
    background: rgba(254, 235, 236, 1);
    display: flex;
    justify-content: space-between;
  }

  .rb_price {
    height: 100%;
    flex: 1;
    overflow: hidden;
    background: linear-gradient(44deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%);
    display: flex;
    align-items: center;
  }

  .rb_p1 {
    width: 1.38rem;
    height: .46rem;
    font-size: .22rem;
    font-family: PingFangSC-Medium;
    color: rgba(252, 89, 76, 1);
    background: #ffffff;
    text-align: center;
    line-height: 0.46rem;
    border-radius: 1rem;
    margin: 0 0.26rem;
  }

  .rb_p2 {
    font-size: .22rem;
    color: rgba(255, 255, 255, 1);
  }

  .rb_p3 {
    font-family: DINAlternate-Bold;
    font-size: 0.28rem;
    color: rgba(255, 255, 255, 1);
  }

  .rb_time {
    height: 100%;
    width: 37.86%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .22rem;
    font-family: PingFangSC-Medium;
    color: rgba(234, 60, 60, 1);
  }

  .rb_t2 {
    margin-left: 0.1rem;
  }

  .rb_t2 i {
    display: inline-block;
    padding: 0 0.02rem;
    height: .28rem;
    background: linear-gradient(45deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%);
    border-radius: .04rem;
    color: #ffffff;
    font-style: normal;
    text-align: center;
    line-height: .28rem;
    font-family: PingFangSC-Semibold;
  }

  .rb_t3 {
    font-weight: 100;
    width: 0.3rem;
    height: 0.32rem;
    margin-left: 0.05rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Farrow_right_red.png') no-repeat center/0.12rem;
  }

  .popupBox {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: flex-end;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }

  .flexEnd {
    width: 100%;
    background: #ffffff;
    padding: 0.3rem 0.4rem;
    border-radius: 4px 4px 0 0;
  }

  .flexEnd span {
    font-size: .26rem;
    color: #333333;
  }

  .flexEnd h3 {
    font-size: .33rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 0.87);
    padding-top: 0.6rem;
  }

  .flexEnd p {
    font-size: .28rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.87);
    line-height: .40rem;
    letter-spacing: 1px;
    padding: 0.37rem 0 1.4rem 0;
  }

</style>


<style>
  /* 主要用来修改组件css */

  #goodsDetail .productClass span {
    font-size: 0.26rem !important;
  }

  #goodsDetail .productClass img {
    width: 100% !important;
    height: auto !important;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    /* margin-left: -0.3rem; */
  }

  #goodsDetail .productClass table {
    width: 100% !important;
  }

  #goodsDetail .swiper-pagination-bullet {
    width: 4px;
    height: 4px;
    border-radius: 4px;
  }

  #goodsDetail .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 2px;
  }

  #goodsDetail .swiper-pagination-bullet-active {
    background: #000000;
    width: 10px;
    border-radius: 10px;
  }


  #goodsDetail .swiper-pagination-bullet,
  #goodsDetail .swiper-pagination-bullet:focus,
  #goodsDetail .swiper-pagination-bullet:hover,
  #goodsDetail .swiper-pagination-bullet:active,
  #goodsDetail .swiper-pagination-bullet:visited,
  #goodsDetail .swiper-pagination-bullet:link {
    outline: none;
  }

</style>
