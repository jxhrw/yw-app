<template>
  <div id="appraisal">
    <!-- <ywBar :title="'有表优选'" type="white"></ywBar> -->
    <!-- <div v-if="isApp" class="topBtnRight" @click="shareUrl()"></div> -->
    <div class="backBtn" @click="toBack"></div>
    <div class="content" ref="bodyhtml">
      <!-- <ywTopLoad v-if="!isApp"></ywTopLoad> -->
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/appraisal/appr_01.png" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/appraisal/appr_02.png" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/appraisal/appr_03.png" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/appraisal/appr_04.png" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/appraisal/appr_05.png" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/appraisal/appr_06.png" alt="">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/appraisal/appr_07.png" alt="">
    </div>
  </div>
</template>

<script>
  import {
    queryActivitys
  } from '../api/api'
  export default {
    data() {
      return {
        infoList: [],
        isApp: false, //是否处于有表app里
        message: 'youwatchyunying',
      }
    },
    methods: {
      getData() {},
      handleScroll() {
        let scrollTop = this.$refs.bodyhtml.scrollTop;
        sessionStorage.setItem("pageAppraisal", scrollTop);
      },
      //分享网页
      shareUrl() {
        let device = this.whichDevice();
        let url = window.location.href;
        let name = '有表鉴定';
        let desc = '有表·腕表养护服务';
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
      // 复制成功
      onCopy(e) {
        this.$alert({
          title: ' ',
          content: '已经复制微信号：youwatchyunying，请到微信进行添加',
          btnText: '',
        });
      },
      // 复制失败
      onError(e) {
        this.toast(`复制失败`);
      },
      toBack() {
        let device = this.whichDevice();
        let index = JSON.parse(window.sessionStorage.getItem("pageIndex"));
        //from是上一页，to是当前页
        if ((index.to == null && index.from == null) || (index.to == 1 && index.from > index.to) || this.finishView) {
          if (device == "android") {
            window.Android.finish();
          } else if (device == "ios") {
            //ActionName：原生中对应的方法名；parameter：回传的参数
            // window.webkit.messageHandlers.ActionName.postMessage('parameter');
            window.webkit.messageHandlers.finish.postMessage('');
          } else {
            window.history.back();
          }
        } else {
          window.history.back();
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
      let name = '有表鉴定';
      let desc = '有表·腕表养护服务';
      let imgUrl = 'https://youwatch.oss-cn-beijing.aliyuncs.com/system/youwatch_logo.png';
      let data = {
        'title': name,
        'desc': desc,
        'imgUrl': imgUrl,
        'url': window.location.href
      };
      this.wxShare(data);

      this.$refs.bodyhtml.addEventListener('scroll', this.handleScroll);
      if (!this.$route.meta.isBack) {
        // this.getData();
      } else {
        this.$refs.bodyhtml.scrollTop = sessionStorage.getItem("pageAppraisal");
      }
    },
  };

</script>

<style scoped>
  #appraisal {
    background: rgba(27, 27, 27, 1);
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 0 0 0;
    text-align: justify;
    font-size: .28rem;
  }

  .content img{
    display: block;
    width: 100%;
  }

  .backBtn{
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    left: 0.3rem;
    top: 0.48rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_forward.png') no-repeat center/100%;
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
  }

</style>
