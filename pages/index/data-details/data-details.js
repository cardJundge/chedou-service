// 数据统计详情
import Charts from '../../../dist/wxcharts.js'
var areaChart = null

Page({
  data: {

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
        type: 'calibration'
      },
      yAxis: {
        min: 0,
        max: 50,
        format: function(val) {
          return val
        }
      },
      width: 350,
      height: 128
    })
  }
})