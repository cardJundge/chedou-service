// 加入联盟
import {
  UnionModel
} from './../models/union.js'
var unionModel = new UnionModel()
Page({
  data: {
    
  },
  onLoad: function (options) {
    this.getUnionList()
  },

  getUnionList() {
    unionModel.getUnionList(res=> {
      
    })
  },

  // 去申请加入（未申请||已申请）
  toJoin() {
    wx.navigateTo({
      url: './join-details/join-details',
    })
  },

  // 已加入(进入详情)

})