//首页
var app = getApp()
import {
  PersonnelModel
} from '../personnel/models/personnel.js'
import {
  IndexModel
} from './models/index.js'

var personnelModel = new PersonnelModel()
var indexModel = new IndexModel()
Page({
  data: {
    dataStatisticsArray: [],
    work_status: '',
    status: '',
    page: 1,
    isAddModule: false,
    orderList: [],
    moduleArray: [],
    businessArray: [],
    spinShow: true
  },
  onLoad() {
    this.setData({
      serviceType: app.globalData.userInfo.type
    })
  },
  onReady() {
    // this.getDataStatics()
    this.getOrderList()
  },
  onShow() {
    this.getModule()
  },

  // 添加模块按钮
  okEvent() {
    this.getModule()
  },

  // 首页获取数据统计
  getDataStatics() {
    indexModel.dataStatistics(res=> {
      if(res.data.status == 1) {
       this.setData({
         dataStatisticsArray: res.data.data
       })
      }
    })
  },

  // 进入数据统计详情
  toDataDetails() {
    wx.navigateTo({
      url: './data-details/data-details',
    })
  },

  // 进入业务列表
  toItemList(e) {
    let key = e.currentTarget.dataset.key
    if(key == 'survey') {
      wx.navigateTo({
        url: './survey/survey',
      })
    } else if(key == 'push') {
      wx.navigateTo({
        url: './push/push',
      })
    } else if(key == "rescue") {
      wx.navigateTo({
        url: './rescue/rescue',
      })
    } else if(key == 'trailer') {
      wx.navigateTo({
        url: './trailer/trailer',
      })
    } else if (key == 'hurt') {
      wx.navigateTo({
        url: './hurt/hurt',
      })
    } else if (key == 'risk') {
      wx.navigateTo({
        url: './risk/risk',
      })
    }
  },

  // 添加模块
  addModule() {
    this.setData({
      isAddModule: true
    })
    indexModel.getAllModule(res => {
      if (res.data.status == 1) {
        res.data.data.forEach((item, index) => {
          item.selected = false
          item.img = '/images/index/' + item.key + '.png'
          this.data.businessArray.forEach((its, ins)=> {
            if(item.id == its.id) {
              item.selected = true
            }
          })
        })
        this.setData({
          moduleArray: res.data.data
        })
        console.log(this.data.moduleArray)
      }
    })
  },

  // 获取服务商拥有的模块
  getModule() {
    personnelModel.getModule(res => {
      if (res.data.status == 1) {
        let module = []
        res.data.data.forEach((item, index) => {
          item.img = '/images/index/' + item.key + '.png'
          module.push(item.id)
        })
        console.log(module)
        wx.setStorageSync('module', module)
        let modules = res.data.data.reverse()
       
        this.setData({
          businessArray: modules
        })

      }
    })
  },

  // 获取订单列表
  getOrderList() {
    indexModel.getOrderList(res=> {
      if(res.data.status == 1) {
        console.log(res)
        res.data.data.data.forEach((item, index)=> {
          if (item.classify_id == 14) {
            item.img = '/images/index/order/icon_daibannianshen.png'
          } else if (item.classify_id == 15 || item.classify_id == 16) {
            item.img = '/images/index/order/icon_daibanfuwu.png'
          } else if (item.classify_id == 17) {
            item.img = '/images/index/order/icon_cheliangjiance.png'
          } else if (item.classify_id == 18) {
            item.img = '/images/index/order/icon_daijia.png'
          } else if (item.classify_id == 19 || item.classify_id == 22) {
            item.img = '/images/index/order/icon_tuoche.png'
          } else if (item.classify_id == 20 || item.classify_id == 31) {
            item.img = '/images/index/order/icon_xiche.png'
          } else {
            item.img = '/images/index/order/icon_huantai.png'
          }
        })
        this.data.orderList = res.data.data.data
        this.getOrderClassify()
      }
    })
  },

  // 获取项目分类
  getOrderClassify() {
    indexModel.orderClassify(res=> {
      this.setData({
        spinShow: false
      })
      if(res.data.status == 1) {
        this.data.orderList.forEach((item, index) => {
          res.data.data.forEach((its,ins) => {
            if (item.classify_id == its.id) {
              item.name = its.name
            }
          })
        })
        this.setData({
          orderList: this.data.orderList,
        })
      }
    })
  },

  // 进入订单详情
  toOrderDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: './order/order-detail/order-detail?orderId=' + e.currentTarget.dataset.id + '&orderImg=' + e.currentTarget.dataset.img + '&orderName=' + e.currentTarget.dataset.name,
    })
  }
})