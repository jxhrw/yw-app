<template>
  <button v-if='type=="default"' class="btn-default" :class="{active:isActive}"><span class="btn-default-span" style="margin-top:0px;">{{text}}</span></button>
  <button v-else-if='type=="drop-down"' class="btn-drop-down" :class="{active:isActive}">
    {{text}}
    <span></span>
  </button>
  <button v-else-if='type=="sort"' class='btn-sort' :class="{active:isActive}">{{text}}
    <span v-if='sortType==1' :style="{'background-image':'url('+iconUrl1+')'}"></span>
    <span v-else-if='sortType==2' :style="{'background-image':'url('+iconUrl2+')'}"></span>
    <span v-else :style="{'background-image':'url('+iconUrl0+')'}"></span>
  </button>
  <button v-else-if='type=="icon"' class='btn-icon' :class="{active:isActive}">{{text}}
    <span :style="{'background-image':'url('+iconUrl+')'}"></span>
  </button>
</template>
<script>
  // 标签名：<ywBtn></ywBtn>
  //type 按钮类型
  //default 只有字
  //drop-down 下拉箭头
  //sort 排序，状态：没选、选中向上、选中向下
  //icon 带特殊icon

  //text 按钮显示的值
  //isActive 按钮是否选中
  //isUse 属性是否禁用为布尔值
  //iconUrl 按钮的icon
  //sortType 排序按钮的类型，0默认，1向上，2向下
  export default {
    props: {
      type: {
        type: String,
        default: 'default'
      },
      text: {
        type: String,
        default: 'button'
      },
      isUse: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: false
      },
      iconUrl: {
        type: String,
        default: ''
      },
      sortType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        iconUrl1: 'https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_price_filter_three.png',
        iconUrl2: 'https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_price_filter_two.png',
        iconUrl0: 'https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_price_filter_one.png',
      }
    }
  }

</script>
<style scoped>
  button {
    padding: 0;
    margin: 0;
    border: 0;
    box-shadow: none;
    background: #fff;
    outline: none;
    box-sizing: border-box;
    color: #666;
    text-align: center;
    height: .52rem;
    width: 1rem;
    font-size: .26rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button.active {
    color: #fe3d36;
    
  }

  .btn-default {
    text-align: center;
  }

  .btn-default-span{
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  .btn-drop-down {
    background-color: #fafafa;
  }
  .btn-drop-down.active{
    background: #feebec;
  }

  .btn-drop-down span {
    display: block;
    width: .2rem;
    height: .52rem;
    background: url('') no-repeat center center/contain;
  }

  .btn-sort span {
    display: block;
    width: .2rem;
    height: .52rem;
    background: url('') no-repeat center;
    background-size: 56% 48%;
    margin-left: 0.1rem;
  }

  .btn-icon span {
    display: block;
    width: .2rem;
    height: .52rem;
    background: url('') no-repeat center/100% 100%;
  }

  button:active{
    opacity: 0.8;
  }

</style>
