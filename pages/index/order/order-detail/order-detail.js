// 订单详情
var test = getApp().globalData.hostName
var app = getApp()
Page({
  data: {
    steps: [],
    allImg: []
  },
  link: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.num //仅为示例，并非真实的电话号码
    })
  },
  openImg: function(e) {
    var that = this
    this.data.openImg = true
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: that.data.allImg // 需要预览的图片http链接列表
    })
  },

  onLoad: function(options) {
    console.log(options)
    this.data.orderId = options.orderId
    this.setData({
      orderImg: options.orderImg,
      orderName: options.orderName
    })
  },
  onShow: function() {
    if (this.data.openImg) {
      this.data.openImg = false
      return
    }
    this.setData({
      steps: [],
      allImg: []
    })
    getDetail(this)
  },

  toAllot: function(e) {
    wx.navigateTo({
      url: '../../../index/allot/allot?module=' + this.data.orderId + '&&moduleis=100',
    })
  },

  // 接单
  accept: function(e) {
    var that = this
    wx.request({
      url: test + 'service/order/receive',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: that.data.orderId,
      },
      success: function(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '接单成功',
          })
          var pages = getCurrentPages() //页面指针数组 
          var prepage = pages[pages.length - 2] //上一页面指针 
          console.log(prepage.data.orderList)
          for (var i in prepage.data.orderList) {
            if (prepage.data.orderList[i].id == that.data.orderId) {
              prepage.data.orderList[i].work_status = 1
              break

            }
          }
          prepage.setData({
            orderList: prepage.data.orderList
          })
          that.onShow()
          that.data.detailData.server.work_status == 1
          that.setData({
            detailData: that.data.detailData
          })

        }
      }
    })
  },
  addProgress: function() {
    wx.navigateTo({
      url: '../../../index/addProgress/addProgress?detailId=' + this.data.orderId + '&&moduleis=100',
    })
  },

  // 取消订单
  cancelOrder: function(e) {
    var that = this
    console.log(e.currentTarget.id)
    wx.request({
      url: test + 'service/order/cancelOrder',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + that.data.sessionId
      }, // 默认值
      data: {
        order_id: that.data.orderId,
      },
      success: function(res) {
        if (res.data.status == 1) {
          wx.showToast({
            title: '取消成功',
          })
          that.data.detailData.server.work_status == 6
          that.setData({
            detailData: that.data.detailData
          })

        }
      }
    })
  },

  copyTBL: function(e) {
    console.log(e.currentTarget.id)
    wx.setClipboardData({
      data: e.currentTarget.id,
      success: function(res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
})

function getDetail(that) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: test + '/api/order/info',
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + app.globalData.userInfo.api_token
      }, // 默认值
      data: {
        id: that.data.orderId,
      },
      success: function(res) {
        if (res.data.status == 1) {
          that.setData({
            detailData: res.data.data
          })
          var aa = []
          var toTrace
          console.log(res.data.data)
          for (var n in res.data.schedule) {
            var last = 'grey'
            if (n == res.data.schedule.length - 1) {
              last = 'blue'
            }
            var first = 'has'
            if (n == 0) {
              first = 'nohas'
            }
            var year = res.data.schedule[n].date
            var month = year.slice(5, 10)
            var time = year.slice(11)
            var picStr = ''
            if (res.data.schedule[n].picture) {
              picStr = res.data.schedule[n].picture
              var tempPic = res.data.schedule[n].picture.split(',')
              for (var t in tempPic) {
                that.data.allImg.push(test + 'uploads/work/' + tempPic[t])
              }
            }
            aa.unshift({
              trace: toTrace,
              first: first,
              color: last,
              current: true,
              month: month,
              time: time,
              done: true,
              pic: picStr.split(","),
              text: res.data.schedule[n].title,
              desc: res.data.schedule[n].date
            })
          }
          that.setData({
            steps: aa
          })
        }
        //that.data.serviceDetail = res
        resolve(that)

      }
    })
  })
}