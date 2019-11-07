// 疾病调查详情
var imgId = 0
const recorderManager = wx.getRecorderManager()
import {
  IndexModel
} from '../../models/index.js'
import {
  PersonnelModel
} from '../../../personnel/models/personnel.js'
var app = getApp()

var personnelModel = new PersonnelModel()
var indexModel = new IndexModel()
Page({
  data: {
    first: 0,
    diseasestep: ['全部任务', '基本信息', '相关资料', '机构回复'],
    diseaselist: [],
    tasklist: ["", "", "", "", "", "", "", ""],
    basetitle: ['患者成员信息', '申请人信息'],
    currentTab: 0,
    baselist: ['', '', '', '', '', '', '', '', '', ''],
    imgdatalist: [],
    voicedatalist: [''],
    giveup: true,
    giveupresult: '',
    voiceIsshow: false,
    voicetext: "长按录音",
    fileNameTemp: '',
  },


  onLoad(options) {
    console.log(options)
    this.data.listId = options.listId
    this.getSickDetailsList()
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
  },

  getSickDetailsList() {
    let key = 'sickness'
    let id = this.data.listId
    let type = 8
    indexModel.getBusinessDetail(key, id, type, res => {
      if(res.data.status == 1) {
        this.setData({
          diseaselist: res.data.data,
          tasklist: res.data.step,
          imgdatalist: res.data.data.data.split(',')
        })
       
        console.log(this.data.imgdatalist)
        this.data.taskId =  res.data.data.task_id
        this.getTaskList()
      }
    })
  },

  // 获取作业员信息
  getTaskList() {
    let params = {}
    personnelModel.getTaskList(params, res=> {
      if(res.data.status == 1) {
        res.data.data.forEach((item, index) => {
          if (item.id == this.data.taskId) {
            this.setData({
              taskinfo: item
            })
          }
        })
      }
    })
  },

  //顶部选项卡
  selectdiseasestep(e) {
    this.setData({
      first: e.currentTarget.id
    })
  },

  //基本资料选项卡
  switchnav(e) {
    var that = this

    that.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },

  //语音模块显示
  openvoice() {
    var that = this
    that.setData({
      voiceIsshow: true
    })
  },

  // 电话拨打
  phoneCall(e) {
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        if (res.platform == 'ios') {
          wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
            success: res => {

            }
          })
        } else if (res.platform == 'android') {
          wx.showModal({
            title: '提示',
            content: e.currentTarget.dataset.phone,
            confirmText: "呼叫",
            success: res => {
              if (res.confirm) {
                wx.makePhoneCall({
                  phoneNumber: e.currentTarget.dataset.phone,
                  success: res => {

                  }
                })
              }
            }
          })
        }
      }
    })
  }
})