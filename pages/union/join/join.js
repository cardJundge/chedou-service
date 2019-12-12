// 加入联盟
import {
  UnionModel
} from './../models/union.js'
var unionModel = new UnionModel()
var app = getApp()
Page({
  data: {
    someUnion: false,
    unionList: []
  },
  onLoad: function (options) {
    this.getUnionList()
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
  },

  getUnionList() {
    let params = {
      type: 0
    }
    unionModel.getUnionList(params, res=> {
      if(res.data.status == 1) {
        if (res.data.data.length == 0) {
          this.setData({
            someUnion: false
          })
        } else {
          res.data.data.forEach((item, index) => {
            item.module = item.module.split(',')
          })
          this.setData({
            unionList: res.data.data,
            someUnion: true
          })
        }
      } else {

      }
    })
  },

  // 去申请加入（未申请||已申请）
  toJoin(e) {
    console.log(e.currentTarget.dataset)
    let items = JSON.stringify(e.currentTarget.dataset.item)
    let status = e.currentTarget.dataset.status
    if (status == '已加入') {
      wx.navigateTo({
        url: '../union-details/union-details?data=' + items,
      })
    } else {
      wx.navigateTo({
        url: './join-details/join-details?data=' + items,
      })
    }
  },

  // 已加入(进入详情)

})