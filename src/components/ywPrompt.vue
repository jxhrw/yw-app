<template>
  <div id='ywPrompt' v-if="isShow" class="yw-mask yw-messagebox__mask--- yw-messagebox__mask-transition---">
    <div class="yw-popup yw-popup-in yw-messagebox__popup--- yw-messagebox__popup-transition---">
      <div class="yw-popup-inner">
        <div class="yw-popup-title">{{title}}</div>
        <div class="yw-popup-text">
          <input type="text" v-model="inputVal" />
          <img :src="'data:img/jpg;base64,'+imgUrl" alt="">
        </div>
      </div>
      <div class="yw-popup-buttons">
        <span @click="thenFuc" class="yw-popup-button yw-messagebox__btn--then">{{yesText}}</span>
        <span @click="catchFuc" class="yw-popup-button yw-messagebox__btn--catch" :class="origin">{{noText}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      origin: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '提示'
      },
      yesText: {
        type: String,
        default: '确定'
      },
      noText: {
        type: String,
        default: '取消'
      },
      imgUrl: {
        type: String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      },
      yesFuc: {
        type: Function,
        default: function () {}
      },
      noFuc: {
        type: Function,
        default: function () {}
      },
    },
    data() {
      return {
        inputVal: '',
      }
    },
    methods: {
      thenFuc() {
        this.closeThis();
      },
      catchFuc() {
        // console.log(this.inputVal)
        if (this.inputVal) {
          this.noFuc(this.inputVal);
          this.closeThis();
        }
      },
      closeThis() {
        this.$emit("toParent", false);
        this.inputVal = '';
      }
    }
  }

</script>

<style scoped>
  .yw-messagebox__mask-transition--- {
    transition: all .4s;
  }

  .yw-mask {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .4);
    z-index: 999998;
    font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }


  .yw-messagebox__popup-transition--- {
    -webkit-transition: all .4s;
    transition: all .4s;
  }

  .yw-popup {
    border-radius: 4px !important;
    background-color: #ffffff;
  }

  .yw-popup {
    position: fixed;
    z-index: 999999;
    top: 50%;
    left: 50%;
    overflow: hidden;
    width: 270px;
    -webkit-transform: translate3d(-50%, -50%, 0) scale(1.185);
    text-align: center;
    color: #000;
    -webkit-border-radius: 13px;
    border-radius: 13px;
  }

  .yw-messagebox__popup-transition--- {
    -webkit-transition: all .4s;
    transition: all .4s;
  }

  .yw-popup.yw-popup-in {
    display: block;
    opacity: 1;
  }

  .yw-popup.yw-popup-in,
  .yw-popup.yw-popup-out {
    -webkit-transform: translate3d(-50%, -50%, 0) scale(1);
    transform: translate3d(-50%, -50%, 0) scale(1);
  }

  .yw-popup-inner {
    border-radius: 4px 4px 0 0 !important;
    padding: 0.4rem 0.48rem 0.4rem 0.48rem !important;
  }

  .yw-popup-inner {
    position: relative;
    padding: 15px;
    -webkit-border-radius: 13px 13px 0 0;
    border-radius: 13px 13px 0 0;
    background: hsla(0, 0%, 100%, .95);
  }

  .yw-popup-title {
    font-size: .34rem !important;
    line-height: .36rem !important;
    font-weight: 500 !important;
    color: #000;
    text-align: left !important;
    margin-bottom: .25rem !important;
  }

  .yw-popup-title+.yw-popup-text {
    font-family: inherit;
    font-size: 14px;
    margin: 5px 0 0;
  }

  .yw-popup-text {
    font-size: .28rem !important;
    color: #999 !important;
    line-height: .4rem !important;
    text-align: left !important;
    word-wrap: break-word !important;
  }

  .yw-popup-buttons {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 44px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .yw-popup-button {
    font-size: 17px;
    line-height: 44px;
    position: relative;
    display: block;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 44px;
    padding: 0 5px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: hsla(0, 0%, 100%, .95);
    letter-spacing: .5px;
    cursor: pointer;
    font-size: .32rem !important;
    font-weight: 500 !important;
    color: #999;
  }

  .yw-popup-button.buy {
    background: linear-gradient(32deg, rgba(200, 142, 100, 0.65) 0%, rgb(200, 142, 100) 100%) !important;
  }

  .yw-popup-button:first-child {
    border-radius: 0 0 0 4px;
  }

  .yw-popup-button:last-child {
    color: #ffffff;
    background: linear-gradient(60deg, rgba(251, 100, 85, 1) 0%, rgba(254, 61, 54, 1) 100%);
    border-radius: 0 0 4px 0;
  }

</style>
