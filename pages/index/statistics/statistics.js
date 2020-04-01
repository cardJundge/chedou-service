// 数据统计
import * as echarts from '../../../components/ec-canvas/echarts.min.js'
const color = ['#1a65ff','#508EF9','#5DC7FE','#42D8B0','#9BD23C','#EBD322','#F98D50','#B2EB22','#428BD8','#F8824F','#821AFF','#F950EA','#D05DFE','#FF5790','#FF5E5E']
Page({
  data: {
    moduleList: ['疾病调查', '查勘定损', '车务调查'],
    topActive: 0,
    dateList: ['7', '15', '30'],
    ageingActive: 0,
    selectActive: 0,
    laterateActive: 0,
    latenumActive: 0,
    allActive: 0,
    ec1: {
      onInit: initChart01
    },
    ec2: {
      onInit: initChart02
    },
    ec3: {
      onInit: initChart03
    },
    pieList: [],
    laterateData: ['1','20','15','10','5'],
    latenumData: ['1','20','15','10','5']
  },

  onLoad(options) {
    console.log(wx.getSystemInfoSync())
    this.setData({
      height: wx.getSystemInfoSync().screenHeight
    })
  },

  // 数据统计顶部切换
  changeTopTab(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      topActive: index
    })
    if(index == 1) {
      let pieList = [
        { name: '4', data: [{value: 100, name: '后台'}] },
        { name: '2', data: [{ value: 90, name: '后台' },{ value: 10, name: 'ios' }] },
        { name: '3', data: [{ value: 50, name: '后台' },{ value: 50, name: 'ios' }] },
      ]
      this.setData({
        pieList: pieList,
        height: wx.getSystemInfoSync().screenHeight
      })
    } else if (index == 2) {
      this.data.pieList = []
      let pieList = [
        { name: '1', data: [{value: 10, name: '后台'}, {value: 20, name: 'IOS'},{value: 30, name: 'Android'}, {value: 40, name: 'H5'}] },
        { name: '2', data: [{ value: 90, name: '后台' },{ value: 10, name: 'ios' }] },
        { name: '3', data: [{ value: 50, name: '后台' },{ value: 50, name: 'ios' }] },
      ]
      this.setData({
        pieList: pieList,
        height: wx.getSystemInfoSync().screenHeight
      })
    }
    // 给每一个data装一个color
    this.setColor()
  },

  // 时效统计时间切换
  changeAgeingTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      ageingActive: index
    })
  },

  // 下拉选择框时间切换
  changeSelectTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      selectActive: index
    })
  },

  // 逾期率时间切换
  changeLaterateTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      laterateActive: index
    })
  },

  // 超期数时间切换
  changeLatenumTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      latenumActive: index
    })
  },

  // 综合时间切换
  changeAllTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      allActive: index
    })
  },

  // 设置color
  setColor() {
    console.log()
    this.data.pieList.forEach((item, index) => {
      item.data.forEach((item1, index1) => {
        color.forEach((item2, index2) => {
          if(index1 == index2) {
            item1.color = item2
          }
        })
      })
    })
    this.setData({
      pieList: this.data.pieList
    })
  }
})

function initChart01(canvas, width, height, data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  var option = {
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['65%', '90%'],
        animationType: 'scale',
        silent: true,
        label : {
          show : false
        },
        labelLine: {
          show: false
        },
        data: data,
        color: color
      }
    ]
  }
  chart.setOption(option)
  return chart
}

function initChart02(canvas, width, height, data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  var option = {
    color: ["#1a65ff"],
    //当你选中数据时的提示框
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    //	x轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2020-03-20','2020-03-21','2020-03-22','2020-03-23','2020-03-24'], //x轴数据
      // x轴的字体样式
      axisLabel: {
        show: true,
        rotate: 30,
        textStyle: {
          color: '#919191',
          fontSize: '12',
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
      },
      // 是否显示坐标轴轴线
      axisLine: {
        show: true,
        lineStyle: {
          color: '#D7D7D7'
        }
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      show: true,
       // y轴的字体样式
       axisLabel: {
        show: true,
        textStyle: {
          color: '#919191',
          fontSize: '12',
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: data,
      areaStyle: {},
      itemStyle: {
        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#92b5ff' // 0% 处的颜色
          }, {
            offset: 0.5,
            color: '#b5cdff' // 100% 处的颜色
          }, {
            offset: 1,
            color: '#fff' // 100% 处的颜色
          }])
        }

      }
    }]
  }
  chart.setOption(option)
  return chart
}

function initChart03(canvas, width, height, data) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  var option = {
    color: ['#1a65ff'],
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2020-03-20','2020-03-21','2020-03-22','2020-03-23','2020-03-24'], //x轴数据
      // x轴的字体样式
      axisLabel: {
        show: true,
        rotate: 30,
        textStyle: {
          color: '#919191',
          fontSize: '12',
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
      },
      // 是否显示坐标轴轴线
      axisLine: {
        show: true,
        lineStyle: {
          color: '#D7D7D7'
        }
      }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      show: true,
       // y轴的字体样式
       axisLabel: {
        show: true,
        textStyle: {
          color: '#919191',
          fontSize: '12',
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false
      }
    },
    series: [{
        data: data,
        type: 'bar',
        barWidth: 20
    }]
  }
  chart.setOption(option)
  return chart
}