<template>
  <div id="address">
    <ywBar :title="'编辑收货地址'" :operateTxt="'保存'" :isClick="canClick" :operateFuc="holdAddress" type="white" :backFuc="sureBack"
      :hasBackFuc="true"></ywBar>
    <div class="content" v-show="loadingFinish">
      <ul class="myInfo">
        <li>
          <input type="text" placeholder="收货人" v-model="addressMy.receiver" v-on:input="changeFuc">
        </li>
        <li>
          <input type="text" placeholder="联系电话" v-model="addressMy.phone" v-on:input="changeFuc">
        </li>
        <li>
          <p class="on" @click="popupShow=!popupShow" v-if="!isInit && (addressMy.provinceShow || addressMy.cityShow ||addressMy.countryShow)">{{addressMy.provinceShow}} {{addressMy.cityShow}} {{addressMy.countryShow}}</p>
          <!-- <p class="on" @click="popupShow=!popupShow" v-if="!isInit && (addressMy.province || addressMy.city ||addressMy.country)">{{addressMy.province}} {{addressMy.city}} {{addressMy.country}}</p> -->
          <p v-else @click="openAndChoose">所在地区</p>
        </li>
        <li>
          <input type="text" placeholder="详细地址" v-model="addressMy.address" v-on:input="changeFuc">
        </li>
      </ul>
      <div class="isDefault">
        <span>设为默认地址</span>
        <span :class="{'on':addressMy.isDefault=='1','buy':'buy'==origin}" class="icon_default" @click="defaultFuc"></span>
      </div>
    </div>

    <div class="popupBox" v-show="popupShow" @click="popupShow=!popupShow">
      <footer class="flexEnd" @click="stop">
        <mu-icon value="clear" class="iconBtn" @click="popupShow=!popupShow"></mu-icon>
        <h3>选择地区</h3>
        <div class="demo-picker-container">
          <mt-picker :slots="slots" valueKey="name" @change="onValuesChange" :visibleItemCount='7'></mt-picker>
        </div>
      </footer>
    </div>

  </div>
</template>

<script>
  import {
    loadReceiverAddress,
    queryDic,
    addReceiverAddress,
    editReceiverAddress
  } from '../api/api'
  export default {
    data() {
      return {
        isInit: true, //是否新增
        isChange: false, //是否修改
        canClick: true, //按钮是否可点击
        popupShow: false, //弹窗是否显示
        loadingFinish: false, //数据请求完成
        origin: '', //页面来源，buy:买手app
        addressMy: { //当前地址信息
          id: '', //收货地址id
          province: '', //省
          city: '', //市
          country: '', //区、县
          provinceShow: '',
          cityShow: '',
          countryShow: '',
          address: '', //详细地址
          post: '', //邮编
          receiver: '', //收货人
          phone: '', //收货人电话
          isDefault: '0', //是否设为默认地址：0否，1是
        },
        slots: [{
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }, {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        }, {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }],
      }
    },
    methods: {
      //地址信息
      getAddressInfo(data) {
        loadReceiverAddress(data).then(res => {
          let $this = this;
          this.loadingFinish = true;
          this.ajaxResult(res, function () {
            $this.addressMy.id = res.data.body.id;
            $this.addressMy.province = res.data.body.province;
            $this.addressMy.city = res.data.body.city;
            $this.addressMy.country = res.data.body.country;
            $this.addressMy.provinceShow = res.data.body.provinceName;
            $this.addressMy.cityShow = res.data.body.cityName;
            $this.addressMy.countryShow = res.data.body.countryName;
            $this.addressMy.address = res.data.body.address;
            $this.addressMy.post = res.data.body.post;
            $this.addressMy.receiver = res.data.body.person;
            $this.addressMy.phone = res.data.body.phone;
            $this.addressMy.isDefault = res.data.body.deft;
            $this.myLevel("area", null, 0);
          });
        }).catch((err) => {
          this.axiosCatch(err);
        });
      },
      //返回执行
      sureBack() {
        if (this.isChange) {
          let nostyle = this.origin == 'buy' ?
            'linear-gradient(32deg,rgba(200,142,100,0.65) 0%,rgba(200,142,100,1) 100%)!important' : '';
          this.$confirm({
            title: '',
            content: '退出后将丢失您当前编辑的信息，是否退出？',
            yesText: "退出",
            noText: '取消',
            noStyle: {
              "background": nostyle
            },
          }).then(res => {
            this.toBack();
          }).catch(err => {});
        } else {
          this.toBack();
        }
      },
      //是否修改
      changeFuc() {
        this.isChange = true;
      },
      //返回
      toBack() {
        let device = this.whichDevice();
        let index = JSON.parse(window.sessionStorage.getItem("pageIndex"));
        //from是上一页，to是当前页
        if ((index.to == null && index.from == null) || (index.to == 1 && index.from > index.to)) {
          if (device == "androidApp") {
            window.Android.finish();
          } else if (device == "iosApp") {
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
      //地址保存
      holdAddress() {
        if (!this.addressMy.receiver || !this.addressMy.phone || !this.addressMy.province || !this.addressMy.city || !
          this.addressMy.country || !this.addressMy.address || this.isInit) {
          this.$alert({
            title: '',
            content: '信息不完整',
            btnText: '',
          });
          return false;
        }
        let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(this.addressMy.phone)) {
          this.$alert({
            title: '',
            content: '联系电话格式有误',
            btnText: '',
          });
          return false;
        }
        this.canClick = false;
        if (this.$route.query.id) {
          editReceiverAddress(this.addressMy).then(res => {
            let $this = this;
            this.canClick = true;
            this.ajaxResult(res, function () {
              window.history.back();
            });
          }).catch((err) => {
            this.canClick = true;
            this.axiosCatch(err);
          });
        } else {
          addReceiverAddress(this.addressMy).then(res => {
            let $this = this;
            this.canClick = true;
            this.ajaxResult(res, function () {
              window.history.back();
            });
          }).catch((err) => {
            this.canClick = true;
            this.axiosCatch(err);
          });
        }
      },
      //勾选取消默认
      defaultFuc() {
        this.changeFuc();
        this.addressMy.isDefault = this.addressMy.isDefault == '0' ? '1' : '0';
      },
      //阻止冒泡
      stop(event) {
        event.stopPropagation();
      },
      //打开地址选择，默认选中第一个
      openAndChoose() {
        this.isInit = false;
        this.popupShow = !this.popupShow;
      },
      //数据初始化
      dataInit() {
        this.isInit = true; //是否新增
        this.isChange = false; //是否修改
        this.canClick = true; //按钮是否可点击
        this.popupShow = false; //弹窗是否显示
        this.loadingFinish = false;
        this.addressMy = { //当前地址信息
          id: '', //收货地址id
          province: '', //省
          city: '', //市
          country: '', //区、县
          provinceShow: '',
          cityShow: '',
          countryShow: '',
          address: '', //详细地址
          post: '', //邮编
          receiver: '', //收货人
          phone: '', //收货人电话
          isDefault: '0', //是否设为默认地址：0否，1是
        };
      },
      //改变选中后触发
      onValuesChange(picker, values) {
        if(!this.popupShow){
          return false;
        }

        if (values[0] && values[1] && values[2] && values[0].code && values[0].code != this.addressMy.province) {
          queryDic({
            'type': 'area',
            "parent": values[0].code
          }).then(res => {
            this.addressMy.province = values[0].code;
            this.addressMy.provinceShow = values[0].name;
            picker.setSlotValues(1, this.getObjNoOne(res.data.body));
          })
        } else if (values[0] && values[1] && values[2] && values[1].code && values[1].code != this.addressMy.city) {
          queryDic({
            'type': 'area',
            "parent": values[1].code
          }).then(res => {
            this.addressMy.city = values[1].code;
            this.addressMy.cityShow = values[1].name;
            picker.setSlotValues(2, this.getObjNoOne(res.data.body));
            picker.setSlotValue(2, this.getObjNoOne(res.data.body)[0]);
          })
        } else if (values[0] && values[1] && values[2] && values[1].code && values[2].code != this.addressMy.country) {
          this.addressMy.country = values[2].code;
          this.addressMy.countryShow = values[2].name;
        }
        //console.log(values[0].code, values[1].code, values[2].code);
      },
      //将对象的某个key的value值组成数组
      getObjValues(array, name) {
        let arr = [];
        for (let j in array) {
          if (array[j].code.indexOf("1_") <= -1) { //过滤code有1_的数据
            arr.push(array[j][name]);
          }
        }
        return arr;
      },
      getObjNoOne(array) {
        let arr = [];
        for (let j in array) {
          if (array[j].code.indexOf("1_") <= -1) { //过滤code有1_的数据
            arr.push(array[j]);
          }
        }
        return arr;
      },
      //查询省市区
      myLevel(type, code, index) {
        queryDic({
          'type': type,
          "parent": code
        }).then(res => {
          this.loadingFinish = true;
          if (index == 0) {
            this.slots[0].values = res.data.body;
            this.addressMy.province = this.addressMy.province || res.data.body[0].code;

            let arr = this.getObjValues(res.data.body, 'code');
            let all = this.getObjNoOne(res.data.body);
            this.addressMy.provinceShow = all[arr.indexOf(this.addressMy.province)].name;
            this.slots[0].defaultIndex = arr.indexOf(this.addressMy.province);

            this.myLevel("area", this.addressMy.province, 1);
          } else if (index == 1) {
            this.slots[1].values = res.data.body;
            this.addressMy.city = this.addressMy.city || res.data.body[0].code;

            let arr = this.getObjValues(res.data.body, 'code');
            let all = this.getObjNoOne(res.data.body);
            this.addressMy.cityShow = all[arr.indexOf(this.addressMy.city)].name;
            this.slots[1].defaultIndex = arr.indexOf(this.addressMy.city);

            this.myLevel("area", this.addressMy.city, 2);
          } else if (index == 2) {
            this.slots[2].values = res.data.body;
            this.addressMy.country = this.addressMy.country || res.data.body[0].code;

            let arr = this.getObjValues(res.data.body, 'code');
            let all = this.getObjNoOne(res.data.body);
            this.addressMy.countryShow = all[arr.indexOf(this.addressMy.country)].name;
            this.slots[2].defaultIndex = arr.indexOf(this.addressMy.country);
          }
        })
      },
    },
    mounted() {

    },
    activated() {
      this.dataInit();
      this.origin = this.$route.query.origin;
      if (this.$route.query.id) {
        this.isInit = false;
        this.getAddressInfo({
          'id': this.$route.query.id
        });
      } else {
        this.isInit = true;
        this.myLevel("area", null, 0);
      }
    },
  };

</script>

<style scoped>
  #address {
    background: #FAFAFA;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1.1rem 0.3rem 0.5rem 0.3rem;
    text-align: justify;
    font-size: .28rem;
  }

  ul {
    padding: 0;
  }

  .myInfo {
    list-style: none;
    border-bottom: 1px solid #f5f6f6;
    background: #ffffff;
    padding: 0 0.3rem;
  }

  .myInfo li {
    border-bottom: 1px solid #f5f6f6;
  }

  .myInfo li:last-child {
    border-bottom: none;
  }

  .myInfo li input {
    height: 0.9rem;
    width: 100%;
    font-size: 0.28rem;
    border: none;
    outline: none;
    color: #000;
  }

  .myInfo li p {
    height: 0.9rem;
    line-height: 0.9rem;
    padding-right: 0.5rem;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/arrow_right_gray.png') no-repeat center right 0.3rem/.12rem;
  }

  .myInfo li p.on {
    color: #000;
  }

  input::-webkit-input-placeholder {
    color: #999999;
    opacity: 1;
  }

  .isDefault {
    height: 1rem;
    ;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.3rem;
    margin-top: 0.16rem;
  }

  .icon_default {
    display: inline-block;
    height: 0.57rem;
    width: 0.96rem;
    background: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_switch.png') no-repeat center/100% 100%;
  }

  .icon_default.on {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_switch_select.png');
  }

  .icon_default.buy.on {
    background-image: url('https://youwatch.oss-cn-beijing.aliyuncs.com/app/icon_switch_select_brown.png');
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
    text-align: center;
    position: relative;
  }

  .flexEnd h3 {
    font-weight: normal;
    padding: 0.2rem;
  }

  .flexEnd .iconBtn {
    position: absolute;
    top: 0.14rem;
    right: 0.2rem;
    font-size: 0.6rem;
  }

  .demo-picker-container {
    width: 100%;

  }

</style>
<style>
  #address .picker-item {
    font-size: .24rem;
  }

  #address .picker-item.picker-selected {
    font-size: .28rem;
  }

</style>
