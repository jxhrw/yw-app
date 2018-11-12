import Vue from 'vue'
import Router from 'vue-router'

// const Test1 = ()=> import('../views/test1.vue');
// const Test2 = ()=> import('../views/test2.vue');

Vue.use(Router);


export default new Router({
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
      path: '/',
      redirect: '/shopOnline'
    },
    {
      // 商品详情，适用我的商店，需要token（由shopOnline进,不需要询价按钮）
      path: '/goodsDetail',
      component: resolve => {
        return require(['@/views/goodsDetail'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    {
      // 商品详情，适用其他商家，不需要token（由shopHv进）(逻辑goodsDetailH5和goodsDetail2一致,现已取消goodsDetailH5)
      path: '/goodsDetHv',
      component: resolve => {
        return require(['@/views/goodsDetail2'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    {
      // 商品详情，适用有表市集，不需要token（由app进）,唯一区别：返回直接关闭webview，(逻辑goodsDetailH5和goodsDetail2一致，现已取消goodsDetailH5)
      path: '/goodsDetail2',
      component: resolve => {
        return require(['@/views/goodsDetail2'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    {
      // 商品详情，适用抢购，需要token,
      path: '/goodsDetRush',
      component: resolve => {
        return require(['@/views/goodsDetail2'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    {
      // 商品详情,买手app
      path: '/goodsDetail_buy',
      component: resolve => {
        return require(['@/views/goodsDetail_buy'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    {
      // 商品详情,购买须知
      path: '/goodsDetail_notes',
      component: resolve => {
        return require(['@/views/goodsDetail_notes'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    {
      // 商家信息，本商家，需要token
      path: '/shopOnline',
      component: resolve => {
        return require(['@/views/shopOnline'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    {
      // 商家信息，其他商家，不需要token
      path: '/shopHv',
      component: resolve => {
        return require(['@/views/shopOnlineH5'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //消息列表
    {
      path: '/notice',
      component: resolve => {
        return require(['@/views/notice'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //消息详情
    {
      path: '/noticeDetail',
      component: resolve => {
        return require(['@/views/noticeDetail'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //消息详情
    {
      path: '/noticeDetailFra',
      component: resolve => {
        return require(['@/views/noticeDetailIFrame'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //帮助中心
    {
      path: '/problem',
      component: resolve => {
        return require(['@/views/problem'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //关于我们
    {
      path: '/about',
      component: resolve => {
        return require(['@/views/about'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //关于我们-买手app
    {
      path: '/aboutBuy',
      component: resolve => {
        return require(['@/views/aboutBuy'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //关于我们
    {
      path: '/policy',
      component: resolve => {
        return require(['@/views/about_policy'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //关于我们——有表服务号
    {
      path: '/qrcode',
      component: resolve => {
        return require(['@/views/about_qrcode'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //关于我们——协议
    {
      path: '/agreement',
      component: resolve => {
        return require(['@/views/about_agreement'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //确认订单
    {
      path: '/orderFirm',
      component: resolve => {
        return require(['@/views/orderFirm'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //选择支付方式
    {
      path: '/payChannel',
      component: resolve => {
        return require(['@/views/payChannel'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //选择收货地址
    {
      path: '/address',
      component: resolve => {
        return require(['@/views/address'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //编辑收货地址
    {
      path: '/arsChange',
      component: resolve => {
        return require(['@/views/address_change_old'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //活动地址1105 -- 采访
    {
      path: '/act1105',
      component: resolve => { return require([ '@/views/activity_1105cf' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //活动地址1113 -- 采访
    {
      path: '/act1113',
      component: resolve => { return require([ '@/views/activity_1113cf' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //活动地址1029 -- 采访
    {
      path: '/act1029',
      component: resolve => { return require([ '@/views/activity_1029' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //活动地址1110
    {
      path: '/act1110',
      component: resolve => { return require([ '@/views/activity_1110' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //活动地址1102
    {
      path: '/act1102',
      component: resolve => { return require([ '@/views/activity_1102' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //活动地址1106
    {
      path: '/act1106',
      component: resolve => { return require([ '@/views/activity_1106' ], resolve) },
      meta: {
        keepAlive: true,
        isBack:false,
      }
    },
    //员工管理
    {
      path: '/staffManage',
      component: resolve => {
        return require(['@/views/staff_manage'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //员工新增
    {
      path: '/staffAdd',
      component: resolve => {
        return require(['@/views/staff_add'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //员工信息修改
    {
      path: '/staffEdit',
      component: resolve => {
        return require(['@/views/staff_add'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //员工信息
    {
      path: '/staffInfo',
      component: resolve => {
        return require(['@/views/staff_info'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //有表鉴定：清洗打磨
    {
      path: '/appraisal',
      component: resolve => {
        return require(['@/views/appraisal'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //物流
    {
      path: '/logistics',
      component: resolve => {
        return require(['@/views/order_logistics'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //教程
    {
      path: '/course',
      component: resolve => {
        return require(['@/views/course'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //教程
    {
      path: '/promise',
      component: resolve => {
        return require(['@/views/course_1'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //寻找合伙人
    {
      path: '/find',
      component: resolve => {
        return require(['@/views/course_2'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //寻找合伙人
    {
      path: '/invite',
      component: resolve => {
        return require(['@/views/course_3'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //新手引导
    {
      path: '/guide',
      component: resolve => {
        return require(['@/views/course_4'], resolve)
      },
      meta: {
        keepAlive: true,
        isBack: false,
      }
    },
    //财务管理
    // {
    //   path: '/financeManage',
    //   component: resolve => {
    //     return require(['@/views/finance_manage'], resolve)
    //   },
    //   meta: {
    //     keepAlive: true,
    //     isBack: false,
    //   }
    // },
    
    
    
  ]
})
