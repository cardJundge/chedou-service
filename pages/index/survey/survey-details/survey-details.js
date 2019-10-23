// 查勘定损详情
// import util from '../../../../utils/util.js'
import {
  IndexModel
} from '../../models/index.js'

var indexModel = new IndexModel()
Page({
  data: {
    surveyList: []
  },
  onLoad: function (options) {
    this.data.listId = options.listId
    // this.setData({
    //   time: util.formatTime(new Date())
    // })
    this.getDetails()
  },

  // 查勘定损详情请求
  getDetails() {
    let key = 'survey'
    let id = 1
    indexModel.getBusinessDetail(key, this.data.listId, id, res => {
      if(res.data.status == 1) {
        this.setData({
          surveyList: res.data.data,
          schedule: res.data.schedule
        })
        this.getInsuranceList()
      }
    })
  },

  // 获取保险公司列表
  getInsuranceList() {
    indexModel.getInsurance(res => {
      if (res.data.status == 1) {
        res.data.data.forEach((item, index) => {
          if (this.data.surveyList.insurance_id == item.id) {
            this.data.surveyList.insuranceName = item.name
            this.setData({
              surveyList: this.data.surveyList
            })
            if(item.name == '中国平安') {

            } else if(item.name == '中国太平')  {

            } else {
              
            }
          }
        })
      }
    })
  }
})