// 人员位置
var QQMapWX = require('./../../../dist/qqmap-wx-jssdk.min.js')
var qqmapsdk = new QQMapWX({
  key: 'D6XBZ-FS6WW-3NCRH-ONAVZ-Z5YBH-A7F2L'
})
Page({
  data: {
    markers: [
      
    ]
  },

  onLoad(options) {
    wx.getSystemInfo({
      success: (res) =>{
        this.setData({
          mapheight: res.windowHeight
        })
      }
    })
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let lat = res.latitude
        let lng = res.longitude
        this.setData({
          poi: {
            latitude: lat,
            longitude: lng
          },
          circles: [{
            latitude: lat,
            longitude: lng,
            color: '#7cb5ec88',
            fillColor: '#7cb5ec88',
            radius: 1000,
            strokeWidth: 0
          }]
        })
      },
    }) 
  }
})