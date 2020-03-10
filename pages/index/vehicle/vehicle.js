// 车物调查
import {
  IndexModel
} from '../models/index.js'

var indexModel = new IndexModel()
var app = getApp()
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
        name: '预结案',
        id: 4
      },
      {
        name: '已结案',
        id: 5
      },
      {
        name: '转单',
        id: 6
      }
    ],
    selected: 1,
    page: 1,
    pageSize: 15,
    hasNoData: false,
    navScrollLeft: 0,
    marginTop: 84
  },

  onLoad: function(options) {
    this.setData({
      serviceId: app.globalData.userInfo.id
    })
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
    this.data.vehicleList = []
    let params = {
      key: 'traffic',
      page: this.data.page,
      keywords: this.data.keywords ? this.data.keywords : ''
    }
    indexModel.getWorkList(params, res => {
      wx.stopPullDownRefresh()
      this.setData({
        isRefresh: false,
        marginTop: 84
      })
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
      this.setData({
        navScrollLeft: 0
      })
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
        this.setData({
          navScrollLeft: 0
        })
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
        this.setData({
          navScrollLeft: 800
        })
        this.data.vehicleTempList.forEach((item, index) => {
          if (item.status == 4) {
            tempList.push(item)
          }
        })
      }else if (this.data.selected === 6) {
        this.setData({
          navScrollLeft: 800
        })
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
    if (this.data.endTime - this.data.startTime < 350) {
      wx.navigateTo({
        url: './vehicle-details/vehicle-details?listId=' + e.currentTarget.dataset.id,
      })
    }
    
  },

  // 添加车物调查案件
  addVehicle() {
    wx.navigateTo({
      url: './add-vehicle/add-vehicle',
    })
  },

  // 搜索
  search(e) {
    wx.showLoading({
      title: '加载中...'
    })
    if (this.data.selected != 1) {
      this.setData({
        selected: 1
      })
    }
    this.data.keywords = e.detail.value
    this.getVehicleList()
  },

  // 删除业务列表
  toDelVehicleItem(e) {
    let caseStatus = e.currentTarget.dataset.status
    wx.showModal({
      title: '提示',
      content: '是否删除该案件？',
      success: res=> {
        if (res.confirm) {
          if (caseStatus == 1) {
            wx.showToast({
              title: '已分配状态下不可以删除案件',
              icon: 'none'
            })
          } else if (caseStatus == 2) {
            wx.showToast({
              title: '进行中状态下不可以删除案件',
              icon: 'none'
            })
          }else {
            let params = {
              key: 'traffic',
              id: e.currentTarget.dataset.id
            }
            indexModel.delBusiness(params, res => {
              if (res.data.status == 1) {
                this.getVehicleList()
              } else {
                wx.showToast({
                  title: res.data.msg ? res.data.msg : '操作超时',
                  icon: 'none'
                })
              }
            })
          }
        }
      }
    })
  },

  bindTouchStart(e) {
    this.data.startTime = e.timeStamp
  },
  
  bindTouchEnd(e) {
    this.data.endTime = e.timeStamp
  },

  // 下拉刷新方法
  onPullDownRefresh: function () {
    this.setData({
      isRefresh: true,
      marginTop: 0
    })
    this.getVehicleList()
  }
})