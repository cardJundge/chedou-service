// 业务列表
import {
  IndexModel
} from '../../pages/index/models/index.js'

var indexModel = new IndexModel()
Component({
  properties: {
    typeKey: {
      type: String
    }
  },
  data: {
    page: 1,
    pageSize: 20,
    businessList: [],
    hasNoData: true
  },
  ready() {
    this.getBusinessList()
  },
  methods: {
    getBusinessList() {
      indexModel.getWorkList(this.data.typeKey, this.data.page, res => {
        if (res.data.status == 1) {
          let businessList = this.data.businessList
          let businessInfo = res.data.data.data
          if (this.data.page == 1 && businessInfo.length == 0) {
            return this.setData({
              hasNoData: true
            })
          }
          this.setData({
            hasNoData: false
          })
          if (businessInfo.length < this.data.pageSize) {

            this.setData({
              businessList: businessList.concat(businessInfo),
              hasMoreData: false
            })
          } else {
            this.setData({
              businessList: businessList.concat(businessInfo),
              page: this.data.page + 1,
              hasMoreData: true
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
      this.getBusinessList()
    },

    toBusinessDetail(e) {
      if (this.data.typeKey == 'survey') {
        wx.navigateTo({
          url: '/pages/index/survey/survey-details/survey-details?listId=' + e.currentTarget.dataset.listid
        })
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
    }
  }
})
