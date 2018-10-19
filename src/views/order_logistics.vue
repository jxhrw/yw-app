<template>
  <div id="logistics">
    <ywBar :title="'物流详情'" type="white"></ywBar>
    <div class="content">
      <div class="gray"></div>
      <div class="baseInfo">
        <img v-lazy="totalData.logo" :key="totalData.logo" class="base_left" alt="">
        <div class="base_right">
          <p>物流公司：
            <span>{{expressName}}</span>
          </p>
          <p>物流单号：
            <span>{{mailNo}}</span>
          </p>
        </div>
      </div>
      <div class="wlList">
        <ul class="wlList_ul">
          <template v-for="(item,index) in items">
            <li :key="index">
              <h6>{{item.detail}}</h6>
              <p>{{item.timeShow}}</p>
            </li>
          </template>
          <li v-if="totalData.platformAuthenticateStatus">
            <h6>{{totalData.platformAuthenticateStatus}}</h6>
          </li>
          <li v-if="totalData.businessSendStatus">
            <h6>{{totalData.businessSendStatus}}</h6>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    maishouLogisticsDetail
  } from '../api/api'
  export default {
    data() {
      return {
        totalData: {},
        items: [],
        expressName: '',
        mailNo: '',
      }
    },
    methods: {
      getData(data) {
        maishouLogisticsDetail(data).then(res => {
          let $this = this;
          this.ajaxResult(res, function () {
            $this.totalData = res.data.body;
            $this.items = res.data.body.items || [];
            $this.expressName = res.data.body.expressName || "—";
            $this.mailNo = res.data.body.mailNo || "—";
          })
        }).catch((err) => {
          this.axiosCatch(err);
        })
      },
      dataInit() {
        this.totalData = {};
        this.items = [];
        this.expressName = '';
        this.mailNo = '';
      },
    },
    mounted() {

    },
    activated() {
      this.dataInit();
      this.getData({
        'mailNo': this.$route.query.mailNo
      });
    },
  };

</script>

<style scoped>
  #logistics {
    background: #ffffff;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0.9rem 0 0.5rem;
  }

  .gray {
    height: .16rem;
    background: rgba(250, 250, 250, 1);
  }

  .baseInfo {
    display: flex;
    padding: 0.3rem 0.32rem;
    align-items: center;
    border-bottom: 1px solid #f5f6f6;
  }

  .base_left {
    height: 0.76rem;
    width: 0.76rem;
    border-radius: 2px;
    border: 1px solid rgba(231, 231, 231, 1);
    display: block;
  }

  .base_right {
    margin-left: 0.2rem;
    flex: 1;
    word-break: break-all;
    color: #999999;
  }

  .base_right span {
    color: #333333;
  }

  .wlList {
    padding-left: 0.3rem;
    border-bottom: 1px solid #f5f6f6;
    overflow: hidden;
  }

  .wlList_ul {
    list-style: none;
    padding-left: 0.35rem;
  }

  .wlList_ul li {
    position: relative;
    padding: 0.2rem 0.3rem 0.2rem 0;
    border-bottom: 1px solid #f5f6f6;
    color: #999999;
  }

  .wlList_ul li:first-child {
    color: #333333;
  }

  .wlList_ul li:last-child {
    border-bottom: none;
  }

  .wlList_ul li::before {
    content: "";
    display: block;
    height: 100%;
    border-left: 1px solid #f5f6f6;
    position: absolute;
    left: -0.35rem;
    top: 0.3rem;
  }

  .wlList_ul li::after {
    content: "";
    display: block;
    height: .21rem;
    width: 0.21rem;
    position: absolute;
    left: -0.45rem;
    top: 0.32rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_process1.png') no-repeat center/50%;
  }

  .wlList_ul li:first-child:after {
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_process0.png') no-repeat center/100%;
  }

  .wlList_ul h6 {
    font-size: .28rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 0.4rem;
  }

  .wlList_ul p {
    font-size: .24rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: .33rem;
    margin-top: 0.1rem;
  }

</style>
