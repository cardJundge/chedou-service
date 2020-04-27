// 人员轨迹
var QQMapWX = require('./../../../dist/qqmap-wx-jssdk.min.js')
var qqmapsdk = new QQMapWX({
  key: 'UVIBZ-MMEW4-3L3UG-DAWD7-PL3LQ-WHF3C'
})

Page({
  data: {
    calendarConfig: {
      defaultDay: true,
      preventSwipe: false,
      hideHeadOnWeekMode: true
    },
    spinShow: true,
    currentSelect: '',
    trkPoints:[
      {
        longitude: '108.93984',
        latitude: '34.34127'
      },
      {
        longitude: '108.95984',
        latitude: '34.345932'
      },
      {
        longitude: '108.99984',
        latitude: '34.395932'
      },
      {
        longitude: '108.77984',
        latitude: '34.309932'
      },
      {
        longitude: '108.11984',
        latitude: '34.247932'
      },
    ]
  },

  onLoad() {
    this.getBasicInfo()
  },

  getBasicInfo() {
    setTimeout(() => {
      this.calendar.switchView('week').then(() => {})
      let time
      this.calendar.getCalendarDates().forEach((item, index) => {
        if (item.choosed) {
          time = item.year + '-' + item.month + '-' + item.day
        }
      })
      this.setData({
        spinShow: false,
        currentSelect: time
      })
    }, 2000)

    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
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
          }],
          polyline: [{
            points: this.data.trkPoints,
            color: "#FF9D1A",
            width: 3,
            }]
        })
      }
    })
  },

  afterTapDay(e) {
    let time = e.detail.year + '-' + e.detail.month + '-' + e.detail.day
    this.setData({
      currentSelect: time
    })
  },
})