//首页
var test = getApp().globalData.hostName
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
    work_status: '',
    status: '',
    page: 1,
    isAddModule: false,
    orderList: [],
    moduleArray: [],
    businessArray: []
  },
  onLoad() {
    // this.data.sessionId = wx.getStorageSync('PHPSESSID')
    // this.data.sessionId = '5ig1lq31b2kprkatmjpvv93b90'
    // this.data.userId = wx.getStorageSync('userid')
    // this.data.userId = '3941'
  },
  onReady() {
    // this.getOrderList()
  },
  onShow() {
    this.getModule()
  },
  // 进入数据统计详情
  toDataDetails() {
    wx.navigateTo({
      url: './data-details/data-details',
    })
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
        res.data.data.forEach((item, index) => {
          item.img = '/images/index/' + item.key + '.png'
        })
        this.setData({
          businessArray: res.data.data
        })

      }
    })
  },

  getOrderList() {
    wx.request({
      url: test + 'service/order/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + this.data.sessionId
      }, // 默认值
      data: {
        service_id: this.data.userId,
        page: this.data.page,
        status: this.data.status,
        work_status: this.data.work_status
      },
      success: (res) => {
        console.log(res)

        if (res.data.status == 1) {
          for (var i in res.data.data) {
            this.data.orderList.push(res.data.data[i])
          }
          this.setData({
            orderList: this.data.orderList
          })
        } else {
          wx.showToast({
            title: '订单获取失败',
          })
        }
      }
    })
  }
})