<template>
  <div id="course" style="background:#000;">
    <ywBar :title="'服务承诺'" v-if="showBar"></ywBar>
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
      }
    },
    methods: {

    },
    mounted() {

    },
    activated() {
      if(this.$route.query.type=='1'){
        this.showBar = true;
      }
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

</style>
