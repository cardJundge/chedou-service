// 订单详情
var app = getApp()
import {
  IndexModel
} from '../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    detailData: []
  },

  onLoad(options) {
    console.log(options)
    this.data.orderId = options.orderId
    this.setData({
      orderImg: options.orderImg,
      orderName: options.orderName
    })
  },
  onShow() {
    this.getDetail(this)
  },

  getDetail() {
    let params = {
      id: this.data.orderId
    }
    indexModel.getOrderDetails(params, res=> {
      if (res.data.status == 1) {
        this.setData({
          detailData: res.data.data,
          schedule: res.data.schedule
        })
      }
    })
  }
})