<template>
  <div id="course" style="background:#000;">
    <div v-if="isApp " class="topBtnRight" @click="shareUrl()"></div>
    <div class="content">
      <img src="https://youwatch.oss-cn-beijing.aliyuncs.com/app/activity/find/find.PNG" alt="">
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
        isApp: false, //是否处于有表app里
      }
    },
    methods: {
      //分享网页
      shareUrl() {
        let device = this.whichDevice();
        let url = window.location.href;
        let name = '寻找YOUWATCH合伙人';
        let desc = '千元腕表免费领';
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
      let name = '寻找YOUWATCH合伙人';
      let desc = '千元腕表免费领';
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
