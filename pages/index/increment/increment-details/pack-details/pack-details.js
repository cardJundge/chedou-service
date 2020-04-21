// 增值服务包使用详情
import {
  IndexModel
} from '../../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    packDetails: [{time: '2020-04-20 14:20:30', status: '已完成', name: '上线检测', money: '80.00'}]
  },

  onLoad(options) {
    // 获取增值服务包详情
    this.getPackDetails()
  },

  getPackDetails() {

  }
})