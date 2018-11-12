<template>
  <div id="app">
    <mt-picker :slots="slots" valueKey="name" @change="onValuesChange"></mt-picker>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    watch: {
      value1(curVal, oldVal) {　　　　　　　　　　 //console.log(curVal);
        　　　　　　　　},
      　　　　　　
    },
    data() {
      return {
        value1: '',
        value2: '',
        value3: '',
        slots: [{
          flex: 1,
          defaultIndex: 0,
          values: [{
            type: '1',
            name: '年假'
          }, {
            type: '2',
            name: '病假'
          }, {
            type: '3',
            name: '婚假'
          }, {
            type: '4',
            name: '其他'
          }],
          className: 'slot1',
          textAlign: 'left'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          defaultIndex: 0,
          values: ['2015-11', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'right'
        }]
      }
    },
    mounted: function () {

      let arr = this.getObjValues(this.slots[0].values, "type");
      // debugger
      this.slots[0].defaultIndex = arr.indexOf("2")
    },
    methods: {
      onValuesChange(picker, values, index) {
        console.log(values)
        this.value1 = values;
        picker.setSlotValues(1, this.slots[0].values);

        // console.log(values[0].type)
        // console.log(index)
      },
      //将对象的某个key的value值组成数组
      getObjValues(array, name) {
        let arr = [];
        for (let j in array) {
          arr.push(array[j][name]);
        }
        return arr;
      },
    }
  }

</script>

<style>


</style>
