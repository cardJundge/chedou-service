// 数据统计详情
import Charts from '../../../dist/wxcharts.js'
var areaChart = null

Page({
  data: {
    timeArray:[
      {name: '今日'},
      {name: '昨日'},
      {name: '本周'},
      {name: '本月'},
    ],
    currentTab: 0
  },
  onLoad: function(options) {
    areaChart = new Charts({
      canvasId: 'areaCanvas',
      type: 'area',
      legend: false,
      dataLabel: false,
      categories: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      series: [{
        name: '任务流',
        data: [0, 18],
        format: function(val) {
          return val
        }
      }],
      xAxis: {
       
      },
      yAxis: {
        min: 0,
        max: 10,
        format: function(val) {
          return val
        }
      },
      width: 350,
      height: 117
    })
  },
  changeTime(e) {
    console.log(e)
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  }
})