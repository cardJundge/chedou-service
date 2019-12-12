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
const myAudio = wx.createInnerAudioContext()
myAudio.obeyMuteSwitch = false  // 是否遵循系统静音开关,当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音
Page({
  data: {
    first: 0,
    diseaseStep: ['全部任务', '基本信息', '相关资料'],
    diseaseList: [],
    baseTitle: ['患者成员信息', '申请人信息'],
    currentTab: 0,
    voiceDataList: [''],
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
          diseaseList: res.data.data
        })
        this.data.sickTaskList = res.data.sickTask
        this.data.diseaseList.sick_address = this.data.diseaseList.sick_address.substring('市')
        this.setData({
          sickAddressList: this.data.diseaseList.sick_address
        })
        // console.log(this.data.diseaseList.sick_address)
        // console.log(this.data.diseaseList.suspects,this.data.diseaseList.sick_address)
        if (this.data.diseaseList.suspects) {
          var doubt = JSON.parse(this.data.diseaseList.suspects)
          // console.log(doubt)
          doubt.forEach((item, index) => {
            this.data.doubttext += (',' + item)
          })
          this.setData({
            doubttext: this.data.doubttext.substring(1)
          })
        }
        this.getTaskList()
        this.getSicknessData()
      } else {
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

  // 获取作业员信息
  getTaskList() {
    let params = {}
    personnelModel.getTaskList(params, res=> {
      if(res.data.status == 1) {
        this.data.sickTaskList.forEach((taskitem, taskindex) => {
          res.data.data.forEach((item, index) => {
            if (item.id == taskitem.task_id) {
              taskitem.taskname = item.nickname
              taskitem.taskmobile = item.mobile
            }
          })
        })
        console.log(this.data.sickTaskList)
        this.setData({
          sickTaskList: this.data.sickTaskList
        })
      }
    })
  },

  // 获取疾病调查相关资料
  getSicknessData() {
    let params = {
      listId: this.data.listId,
      type: 0
    }
    indexModel.getSicknessData(params, res=> {
      if(res.data.status == 1) {
        res.data.data.forEach((item, index) => {
            item.picture = item.picture.split(',')
        })
        this.setData({
          sicknessData: res.data.data
        })
        console.log(this.data.sicknessData)
      }
    })
  },

  // 去到任务详情
  toDetail(e) {
    console.log(e)
    let stId = e.currentTarget.dataset.id
    let sicknessTaskId = e.currentTarget.dataset.sickid
    let stName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../task-details/task-details?stId=' + stId + '&sicknessTaskId=' + sicknessTaskId + '&stName=' + stName,
    })
  },

  //顶部选项卡
  selectDiseaseStep(e) {
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
  },

  previewImage(e) {
    let imgArr = []
    let imgIndex = e.currentTarget.dataset.index
    let listId = e.currentTarget.dataset.id
    this.data.sicknessData[listId].picture.forEach((item, index) => {
      imgArr.push(this.data.imgUrl + item)
    })
    wx.previewImage({
      urls: imgArr,
      current: imgArr[imgIndex]
    })
    console.log(imgArr, imgArr[imgIndex])
  }
})