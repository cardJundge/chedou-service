// 业务列表
import {
  IndexModel
} from '../../pages/index/models/index.js'

var indexModel = new IndexModel()
var app = getApp()
Component({
  properties: {
    typeKey: {
      type: String
    },
    businessList: {
      type: Array
    },
    page: {
      type: Number
    },
    spinShow: {
      type: Boolean
    }
  },
  data: {   
    pageSize: 15,
    hasNoData: false
  },
  ready() {
    // this.getBusinessList()
  },
  methods: {
    getBusinessList() {
      indexModel.getWorkList(this.data.typeKey, this.data.page, res => {
        if (res.data.status == 1) {
          let businessList = this.data.businessList
          let businessInfo = res.data.data.data
          if (this.data.page == 1 && businessInfo.length == 0) {
            return this.setData({
              hasNoData: true,
              spinShow: false,
            })
          }
          this.setData({
            hasNoData: false,
            spinShow: false,
          })
          
          if (businessInfo.length < this.data.pageSize) {
            this.setData({
              businessList: businessList.concat(businessInfo),
              hasMoreData: false
            })
          } else {
            this.setData({
              businessList: businessList.concat(businessInfo),
              hasMoreData: true
            })
          }

          // console.log(this.data.businessList)
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

    addBusiness() {
      if(this.data.typeKey == 'survey') {
        wx.navigateTo({
          url: '/pages/index/survey/add-survey/add-survey'
        })
      } else if (this.data.typeKey == 'risk') {
        wx.navigateTo({
          url: '/pages/index/risk/add-risk/add-risk'
        })
      }
    },

    getMoreData() {
      this.setData({
        page: this.data.page + 1
      })
      this.getBusinessList()
    },

    toBusinessDetail(e) {
      let serviceType = app.globalData.userInfo.type
      // if (this.data.typeKey == 'survey') {
      //   wx.navigateTo({
      //     url: '/pages/index/survey/survey-details/survey-details?listId=' + e.currentTarget.dataset.listid
      //   })
      // } else 
      if (this.data.typeKey == 'push') {
        if (serviceType == 1 || serviceType == 4) {
          wx.navigateTo({
            url: '/pages/index/push/push-detail/push-detail?listId=' + e.currentTarget.dataset.listid
          })
        } else if (serviceType == 2 || serviceType == 3) {
          wx.navigateTo({
            url: '/pages/index/repair/repair-detail/repair-detail?listId=' + e.currentTarget.dataset.listid
          })
        }
      } else if (this.data.typeKey == 'trailer') {
        wx.navigateTo({
          url: '/pages/index/trailer/trailer-detail/trailer-detail?listId=' + e.currentTarget.dataset.listid
        })
      } else if (this.data.typeKey == 'risk') {
        wx.navigateTo({
          url: '/pages/index/risk/risk-detail/risk-detail?listId=' + e.currentTarget.dataset.listid
        })
      } else if (this.data.typeKey == 'rescue') {
        wx.navigateTo({
          url: '/pages/index/rescue/rescue-detail/rescue-detail?listId=' + e.currentTarget.dataset.listid
        })
      }
    },

    // 搜索
    search(e) {
      // console.log(e.detail.value)
    }
  }
})
