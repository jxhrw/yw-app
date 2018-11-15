<template>
  <div id="course" style="background:#000;">
    <ywBar :title="'YOUWATCH服务承诺'" v-if="showBar"></ywBar>
    <div v-if="isApp " class="topBtnRight" @click="shareUrl()"></div>
    <div class="content" :style="{'padding-top':showBar?'0.9rem':'0'}">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_01.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_02.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_03.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_04.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_05.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_06.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_07.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_08.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_09.jpg" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/promise/p_10.jpg" alt="">
    </div>
  </div>
</template>

<script>
  import {
    listReceiverAddress,
  } from '../api/api'
  export default {
    data() {
      return {
        showBar:false,
        isApp: false, //是否处于有表app里
      }
    },
    methods: {
      //分享网页
      shareUrl() {
        let device = this.whichDevice();
        let url = window.location.href;
        let name = 'YOUWATCH全方位服务保障体系';
        let desc = '假一赔十、权威鉴定、免费养护、无忧售后';
        let imgUrl = 'https://youwatch.oss-cn-beijing.aliyuncs.com/system/youwatch_logo.png';
        if (device == "androidApp") {
          window.Android.getShareContent(name, url, desc, imgUrl);
        } else if (device == "iosApp") {
          window.webkit.messageHandlers.getShareContent.postMessage({
            title: name,
            url: url,
            content: desc,
            iconImg: imgUrl
          });
        }
      },
    },
    mounted() {
      let device = this.whichDevice();
      if (device == "androidApp" || device == "iosApp") {
        this.isApp = true;
      }
    },
    activated() {
      if(this.$route.query.type=='1'){
        this.showBar = true;
      }
      let name = 'YOUWATCH全方位服务保障体系';
      let desc = '假一赔十、权威鉴定、免费养护、无忧售后';
      let imgUrl = 'https://youwatch.oss-cn-beijing.aliyuncs.com/system/youwatch_logo.png';
      let data = {
        'title': name,
        'desc': desc,
        'imgUrl': imgUrl,
        'url': window.location.href
      };
      this.wxShare(data);
    },
  };

</script>

<style scoped>
  #course {
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 0 0 0;
  }

  img {
    display: block;
    width: 100%;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1rem;
    background: #fff;
  }

  .footBtn {
    display: block;
    background: #feebec;
    border-radius: 0.5rem;
    width: 2.5rem;
    height: .60rem;
    line-height: .60rem;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: .28rem;
    color: #333333;
  }

  .footBtn.red {
    background: linear-gradient(45deg, rgba(200, 142, 100, 0.71) 0%, rgba(200, 142, 100, 1) 100%);
    color: #fff;
  }

  .topBtnRight {
    width: .6rem;
    height: .6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app%2Factivity%2F180918%2Fshare.png');
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    z-index: 2;
    background-color: #fff;
    border-radius: 1rem;
    /* display: none; */
  }

</style>
