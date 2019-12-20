// 车务调查
import {
  IndexModel
} from '../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    vehicleList: [],
    statusList: [{
        name: '全部案件',
        id: 1
      },
      {
        name: '已分配',
        id: 2
      },
      {
        name: '进行中',
        id: 3
      },
      {
        name: '已结案',
        id: 4
      },
      {
        name: '转单',
        id: 5
      }
    ],
    selected: 1,
    page: 1,
    pageSize: 15,
    hasNoData: false,
  },

  onLoad: function(options) {

  },

  onShow: function() {
    this.setData({
      vehicleList: [],
      page: 1,
      spinShow: true,
      selected: 1
    })
    this.getVehicleList()
  },

  // 获取疾病调查列表
  getVehicleList() {
    let key = 'traffic'
    indexModel.getWorkList(key, this.data.page, res => {
      let vehicleList = this.data.vehicleList
      let vehicleInfo = res.data.data.data
      if (res.data.status == 1) {
        if (this.data.page == 1 && vehicleInfo.length == 0) {
          return this.setData({
            hasNoData: true,
            spinShow: false
          })
        }
        this.setData({
          hasNoData: false,
          spinShow: false
        })
        if (vehicleInfo.length < this.data.pageSize) {
          this.setData({
            vehicleInfo: vehicleInfo,
            vehicleList: vehicleList.concat(vehicleInfo),
            hasMoreData: false
          })
        } else {
          this.setData({
            vehicleInfo: vehicleInfo,
            vehicleList: vehicleList.concat(vehicleInfo),
            hasMoreData: true
          })
        }
        this.data.vehicleTempList = this.data.vehicleList

      } else {
        this.setData({
          hasNoData: true
        })
        if (res.data.msg.match('Token已过期或失效')) {} else {
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
    this.getVehicleList()
  },

  changeStatus(e) {
    this.setData({
      selected: e.target.dataset.index
    })
    // console.log(this.data.selected)
    let tempList = []
    if (this.data.selected === 1) {
      tempList = this.data.vehicleTempList
      if (this.data.vehicleInfo.length >= this.data.pageSize) {
        this.setData({
          hasMoreData: true
        })
      } else {
        this.setData({
          hasMoreData: false
        })
      }
    } else {
      this.setData({
        hasMoreData: false
      })
      if (this.data.selected === 2) {
        this.data.vehicleTempList.forEach((item, index) => {
          if (item.status == 1) {
            tempList.push(item)
          }
        }) 
      } else if (this.data.selected === 3) {
        this.data.vehicleTempList.forEach((item, index) => {
          if (item.status == 2) {
            tempList.push(item)
          }
        })
      } else if (this.data.selected === 4) {
        this.data.vehicleTempList.forEach((item, index) => {
          if (item.status == 3) {
            tempList.push(item)
          }
        })
      } else if (this.data.selected === 5) {
        this.data.vehicleTempList.forEach((item, index) => {
          if (item.turn_service_id) {
            tempList.push(item)
          }
        })
      }
    }
    this.setData({
      vehicleList: tempList
    })
  },

  toVehicleDetails(e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: './vehicle-details/vehicle-details?listId=' + e.currentTarget.dataset.id,
    })
  },

  // 添加车务调查案件
  addVehicle() {
    wx.navigateTo({
      url: './add-vehicle/add-vehicle',
    })
  }
})