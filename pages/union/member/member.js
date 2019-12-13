// 联盟成员
import {
  py
} from '../../../dist/pinyin.js'
import {
  PersonnelModel
} from '../../personnel/models/personnel.js'
import {
  UnionModel
} from '../models/union.js'
var app = getApp()

var unionModel = new UnionModel()
var personnelModel = new PersonnelModel()
let storeData = new Array(26)
const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
Page({
  data: {
    memberData: {},
  },
  
  onLoad: function(options) {
    this.setData({
      imgUrl: app.globalData.imgUrl,
      serviceId: app.globalData.userInfo.id
    })
    if(options.data) {
      this.data.unionId = options.data
    }
  },

  onShow: function() {
    this.getMemberList()
  },
  
  rendering() {
    words.forEach((item, index) => {
      storeData[index] = {
        key: item,
        list: []
      }
    })

    this.data.memberData.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1)
      let index = words.indexOf(firstName)
      storeData[index].list.push({
        id: item.id,
        name: item.name,
        face: item.face,
        key: firstName
      })
    })
    this.data.member = storeData
    this.setData({
      member: this.data.member
    })
    console.log(this.data.member)
  },

  // 获取作业员列表
  getMemberList() {
    let params = this.data.unionId
    unionModel.getMemberList(params, res => {
      if (res.data.status == 1) {
        this.setData({
          memberData: res.data.data.service
        })
        this.data.memberData.forEach((item, index) => {
          item.pinyin = py.getPinyin(item.name).toUpperCase()
          if (this.data.serviceId == item.id) {
            this.setData({
              leaderInfo: item
            })
          }
        })
        this.rendering()
      } else {

      }
    })
    // personnelModel.getTaskList(params, (res) => {
    //   if (res.data.status == 1) {
    //     this.setData({
    //       memberData: res.data.data
    //     })
    //     this.data.memberData.forEach((item, index) => {
    //       item.pinyin = py.getPinyin(item.nickname).toUpperCase()
    //     })
    //     this.rendering()
    //   } else if (res.data.status == 0) {
    //     this.setData({
    //       memberData: []
    //     })
    //   }
    // })
  },

  // 移除成员
  delMember(e) {
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确定移除该成员吗'
    })
  },

  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  }

})