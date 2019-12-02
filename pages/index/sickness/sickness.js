// 疾病调查
import {
  IndexModel
} from '../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
   sickList: [],
   statusList: [
     { name: '全部案件', id: 1},
     { name: '进行中', id: 3 },
     { name: '待审核', id: 4 },
     { name: '已结案', id: 5 }
   ],
   selected: 1,
   page: 1,
   pageSize: 15,
   hasNoData: false,
  },
  onLoad: function (options) {
   
  },

  onShow() {
    this.setData({
      sickList: [],
      page: 1,
      spinShow: true
    })
    this.getSickList()
  },

  // 获取疾病调查列表
  getSickList() {
    let key = 'sickness'
    indexModel.getWorkList(key, this.data.page, res=> {
      let sickList = this.data.sickList
      let sickInfo = res.data.data.data
      if(res.data.status == 1) {
        res.data.data.data.forEach((item, index) => {
          item.sick_address = item.sick_address?item.sick_address.substring(0, 3): ''
        })
        if (this.data.page == 1 && sickInfo.length == 0) {
          return this.setData({
            hasNoData: true,
            spinShow: false
          })
        }
        this.setData({
          hasNoData: false,
          spinShow: false
        })
        if (sickInfo.length < this.data.pageSize) { 
          this.setData({
            sickList: sickList.concat(sickInfo),
            hasMoreData: false
          })
        } else {
          this.setData({
            sickList: sickList.concat(sickInfo),
            hasMoreData: true
          })
        }
        this.data.sickTempList = this.data.sickList
        
      } else {
        this.setData({
          hasNoData: true
        })
        if (res.data.msg.match('Token已过期或失效')) {
        } else {
          wx.showToast({
            title: res.data.msg ? res.data.msg : '请求超时',
            icon: 'none'
          })
        }
      }
    })
  },

  getMoreData() {
    this.setData({
      page: this.data.page + 1
    })
    this.getSickList()
  },

  changeStatus(e) {
    this.setData({
      selected: e.target.dataset.index
    })
    // console.log(this.data.selected)
    let tempList = []
    if (this.data.selected === 1) {
      tempList = this.data.sickTempList
    } else if (this.data.selected === 3) {    
      this.data.sickTempList.forEach((item, index) => {
        if(item.status == 3) {
          tempList.push(item)
        }
      })
    } else if (this.data.selected === 4) {
      this.data.sickTempList.forEach((item, index) => {
        if (item.status == 4) {
          tempList.push(item)
        }
      })
    } else if (this.data.selected === 5) {
      this.data.sickTempList.forEach((item, index) => {
        if (item.status == 5) {
          tempList.push(item)
        }
      })
    }
    this.setData({
      sickList: tempList
    })
  },

  toSicknessDetails(e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: './sickness-details/sickness-details?listId=' + e.currentTarget.dataset.id,
    })
  }
})