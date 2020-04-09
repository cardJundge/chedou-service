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
    orderList: [],
    moduleArray: [],
    businessArray: [],
    spinShow: true,
  },
  onLoad() {
    this.setData({
      serviceType: app.globalData.userInfo.type
    })
  },
  onReady() {
    this.getOrderList()
  },
  onShow() {
    this.getDataStatics()
    this.getModule()
    this.setData({
      editIconshow: false
    })
  },

  // 首页获取数据统计
  getDataStatics() {
    let params = {
      service_id: app.globalData.userInfo.id
    }
    indexModel.dataStatistics(params, res => {
      if (res.data.status == 1) {
        this.setData({
          dataStatisticsArray: res.data.data
        })
      }
    })
  },

  // 进入数据统计详情
  toDataDetails() {
    wx.navigateTo({
      url: './statistics/statistics',
    })
  },

  // 进入业务列表
  toItemList(e) {
    let key = e.currentTarget.dataset.key
    if (key == 'survey') {
      wx.navigateTo({
        url: './survey/survey',
      })
    } else if (key == 'sickness') {
      wx.navigateTo({
        url: './sickness/sickness',
      })
    } else if (key == 'traffic') {
      wx.navigateTo({
        url: './vehicle/vehicle',
      })
    }
    //  else if (key == 'push') {
    //   if (this.data.serviceType == 1 || this.data.serviceType == 4) {
    //     wx.navigateTo({
    //       url: './push/push',
    //     })
    //   } else if (this.data.serviceType == 2 || this.data.serviceType == 3) {
    //     wx.navigateTo({
    //       url: './repair/repair',
    //     })
    //   }
    // } else if (key == "rescue") {
    //   wx.navigateTo({
    //     url: './rescue/rescue',
    //   })
    // } else if (key == 'trailer') {
    //   wx.navigateTo({
    //     url: './trailer/trailer',
    //   })
    // } else if (key == 'hurt') {
    //   wx.navigateTo({
    //     url: './hurt/hurt',
    //   })
    // } else if (key == 'risk') {
    //   wx.navigateTo({
    //     url: './risk/risk',
    //   })
    // }
  },

  // 进入新添加的模块详情
  toItemListSelf(e) {
    let id = e.currentTarget.dataset.id,
    name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: './taskflow/taskflow?moduleId=' + id + '&moduleName=' + name,
    })
  },

  // 管理
  toManage() {
    this.setData({
      editIconshow: true
    })
  },

  // 添加模块
  toAddModule() {
    let data = JSON.stringify(this.data.businessArray)
    wx.navigateTo({
      url: './add-module/zero/zero?businessArray=' + data,
    })
  },

  // 获取服务商拥有的模块
  getModule() {
    personnelModel.getModule(res => {
      if (res.data.status == 1) {
        let module = []
        res.data.data.forEach((item, index) => {
          item.img = '/images/index/' + item.key + '.png'
          if(item.icon) {
            item.img = item.icon
          }
          module.push(item.id)
        })
        wx.setStorageSync('module', module)
        let modules = res.data.data

        this.setData({
          businessArray: modules
        })

      }
    })
  },

  // 管理自定义模块
  toEditDefineModule(e) {
    let id = e.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['编辑模块','删除模块'],
      success: res=> {
        if(res.tapIndex == 0) {
          wx.navigateTo({
            url: './add-module/edit/edit?moduleId=' + id,
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '确定删除该模块吗？',
            success: res=> {
              if(res.confirm) {

              } else {
                
              }
            }
          })
        }
      }
    })
  },

  // 获取订单列表
  getOrderList() {
    indexModel.getOrderList(res => {
      if (res.data.status == 1) {
        res.data.data.data.forEach((item, index) => {
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
    indexModel.orderClassify(res => {
      this.setData({
        spinShow: false
      })
      if (res.data.status == 1) {
        this.data.orderList.forEach((item, index) => {
          res.data.data.forEach((its, ins) => {
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
    wx.navigateTo({
      url: './order/order-detail/order-detail?orderId=' + e.currentTarget.dataset.id + '&orderImg=' + e.currentTarget.dataset.img + '&orderName=' + e.currentTarget.dataset.name,
    })
  }
})