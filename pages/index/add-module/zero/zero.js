// 创建模块===》开始页面
import {
  IndexModel
} from '../../models/index.js'
import {
  PersonnelModel
} from '../../../personnel/models/personnel.js'

var personnelModel = new PersonnelModel()
var indexModel = new IndexModel()
Page({
  data: {
    tabList: ['系统模块', '自建模块'],
    tabActive: 0,
    bottomSpin: true,
    isAddModule: false
  },

  onLoad(options) {
    this.getModule()
  },

  changeTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      tabActive: index
    })
  },

  // 获取服务商拥有的模块
  getModule() {
    personnelModel.getModule(res => {
      if (res.data.status == 1) {
        let module = []
        res.data.data.forEach((item, index) => {
          item.img = '/images/index/' + item.key + '.png'
          if(item.icon) {
            item.img = item.icon
          }
          module.push(item.id)
        })
        wx.setStorageSync('module', module)
        let modules = res.data.data

        this.setData({
          businessArray: modules
        })

      }
    })
  },

  // 系统模块添加模块
  addSystemModule() {
    this.setData({
      isAddModule: true
    })
    indexModel.getAllModule(res => {
      if (res.data.status == 1) {
        this.setData({
          bottomSpin: false
        })
        res.data.data.forEach((item, index) => {
          item.selected = false
          item.img = '/images/index/' + item.key + '.png'
          this.data.businessArray.forEach((its, ins) => {
            if (item.id == its.id) {
              item.selected = true
            }
          })
        })
        this.setData({
          moduleArray: res.data.data
        })
      }
    })
  },

  okEvent() {
    this.getModule()
  },

  // 自定义模块添加
  addDefineModule() {
    wx.navigateTo({
      url: '../first/first',
    })
  },

  // 编辑模块
  handleModule(e) {
    let moduleId = e.currentTarget.dataset.id
    wx.showActionSheet({
      itemList: ['编辑模块','删除模块'],
      itemColor: '#36363A',
      success(res){
        if (res.tapIndex == 0){
          wx.navigateTo({
            url: '../edit/edit?moduleId=' + moduleId,
          })
        }else if (res.tapIndex == 1){
          
        }
      }
    })
  }
})