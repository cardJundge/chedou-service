// 数据统计
import * as echarts from '../../../components/ec-canvas/echarts.min.js'
const color = ['#1a65ff', '#508EF9', '#5DC7FE', '#42D8B0', '#9BD23C', '#EBD322', '#F98D50', '#B2EB22', '#428BD8', '#F8824F', '#821AFF', '#F950EA', '#D05DFE', '#FF5790', '#FF5E5E']
import {
  IndexModel
} from '../models/index.js'
import {
  PersonnelModel
} from '../../personnel/models/personnel.js'

var indexModel = new IndexModel()
var personnelModel = new PersonnelModel()
var app = getApp()

Page({
  data: {
    moduleList: [],
    topActive: 0,
    navScrollLeft: 0,
    dateList: ['7', '15', '30'],
    date: 7,
    flag: 'all',
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
    pieList: [{ name: 'xxx', data: ['2', '1'] }, { name: 'xxx', data: ['9', '1'] }],
    laterateData: [],
    latenumData: [],
    tableData: []
  },

  onLoad(options) {
    this.getModule()
  },

  // 获取服务商下的所有模块
  getModule() {
    personnelModel.getModule(res => {
      if (res.data.status == 1) {
        this.setData({
          moduleList: res.data.data
        })
        this.getAllStatisticsData()
      }
    })
  },

  // 获取所有统计数据
  getAllStatisticsData() {
    let params = {
      date: this.data.date,
      service_id: app.globalData.userInfo.id
    }
    this.data.moduleList.forEach((item, index) => {
      if (item.id == this.data.moduleId) {
        if (item.key) {
          params['key'] = item.key
          this.setData({
            moduleFlag: 'system'
          })
        } else {
          params['module_id'] = item.id
          this.setData({
            moduleFlag: 'define'
          })
        }
      } else if (!this.data.moduleId) {
        if (this.data.moduleList[0].key) {
          params['key'] = this.data.moduleList[0].key
          this.setData({
            moduleFlag: 'system'
          })
        } else {
          params['module_id'] = this.data.moduleList[0].id
          this.setData({
            moduleFlag: 'define'
          })
        }
      }
    })
    indexModel.getAllStatistics(params, res => {
      if (res.data.status == 1) {
        // 拆分超期数键和值
        let tempLatenum = [], tempLaterate = [], value1 = [], value2 = [],
        key = Object.keys(res.data.data.overdue),
        value = Object.values(res.data.data.overdue)
        value.forEach((item, index) => {
          value1.push(item.over_rate)
          value2.push(item.over)
        })
        tempLatenum.push({
          key: key,
          value: value1
        })
        tempLaterate.push({
          key: key,
          value: value2
        })
        // 全部
        if (this.data.flag == 'all') {
          this.setData({
            allStatistics: res.data.data,
            selectData: res.data.data.select,
            tableData: res.data.data.operator,
            latenumData: tempLatenum,
            laterateData: tempLaterate
          })
          console.log('dkjgfjhsdgfjkdsgf',this.data.latenumData)
        } else if (this.data.flag == 'table') {
          this.setData({
            tableData: res.data.data.operator
          })
        } else if (this.data.flag == 'latenum') {
          this.setData({
            latenumData: tempLatenum
          })
        } else if (this.data.flag == 'laterate'){
          this.setData({
            laterateData: tempLaterate
          })
        }
      }
    })
  },

  // 数据统计顶部切换
  changeTopTab(e) {
    let index = e.currentTarget.dataset.index,
      id = e.currentTarget.dataset.id
    console.log(e)
    this.setData({
      topActive: index,
      moduleId: id
    })
    this.getAllStatisticsData()
    // 给每一个data装一个color
    // this.setColor()
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
    let index = e.currentTarget.dataset.index,
    date = e.currentTarget.dataset.date
    this.setData({
      laterateActive: index,
      date: date,
      flag: 'laterate'
    })
    this.getAllStatisticsData()
  },

  // 超期数时间切换
  changeLatenumTab(e) {
    let index = e.currentTarget.dataset.index,
      date = e.currentTarget.dataset.date
    this.setData({
      latenumActive: index,
      date: date,
      flag: 'latenum'
    })
    this.getAllStatisticsData()
  },

  // 综合时间切换（表格）
  changeAllTab(e) {
    let index = e.currentTarget.dataset.index,
      date = e.currentTarget.dataset.date
    this.setData({
      allActive: index,
      date: date,
      flag: 'table'
    })
    this.getAllStatisticsData()
  },

  // 设置color
  setColor() {
    console.log()
    this.data.pieList.forEach((item, index) => {
      item.data.forEach((item1, index1) => {
        color.forEach((item2, index2) => {
          if (index1 == index2) {
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

// 饼图
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
        label: {
          show: false
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

// 折线图
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
    grid: {
      show: false,
      left: 40,
      right: 20
    },
    //	x轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data[0].key, //x轴数据
      // x轴的字体样式
      axisLabel: {
        show: true,
        rotate: 45,
        textStyle: {
          color: '#9C9C9C',
          fontSize: '10',
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
          color: '#ECECEC'
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
          color: '#9C9C9C',
          fontSize: '12',
        },
        formatter: '{value}%'
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
          color: '#ECECEC'
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: data[0].value,
      areaStyle: {},
      itemStyle: {
        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#1a65ff' // 0% 处的颜色
          }, {
            offset: 0.5,
            color: '#4b7be4' // 100% 处的颜色
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

// 柱状图
function initChart03(canvas, width, height, data) {
  console.log('@@@@@@@',data)
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
    grid: {
      show: false,
      left: 40,
      right: 20
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data[0].key, //x轴数据
      // x轴的字体样式
      axisLabel: {
        show: true,
        rotate: 45,
        textStyle: {
          color: '#9C9C9C',
          fontSize: '10',
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
          color: '#ECECEC'
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
          color: '#9C9C9C',
          fontSize: '12',
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
          color: '#ECECEC'
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [{
      data: data[0].value,
      type: 'bar',
      barWidth: 20
    }]
  }
  chart.setOption(option)
  return chart
}