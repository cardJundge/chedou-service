// 添加自定义模块任务流
import dateTimePicker from '../../../../dist/dateTimePicker.js'
Page({
  data: {
    field: [{
        name: '案件号',
        required: 1,
        type: 'text'
      },
      {
        name: '下拉选择1',
        required: 1,
        type: 'select',
        option: ['是', '否']
      },
      {
        name: '图片',
        required: 1,
        type: 'image'
      },
      {
        name: '车牌号',
        required: 0,
        type: 'text'
      },
      {
        name: '日期',
        required: 1,
        type: 'date'
      },
      {
        name: '日期1',
        required: 1,
        type: 'date'
      },
      {
        name: '日期时间',
        required: 1,
        type: 'datetime'
      },
      {
        name: '日期时间1',
        required: 1,
        type: 'datetime'
      },
      {
        name: '位置',
        required: 1,
        type: 'location'
      },
      {
        name: '下拉选择2',
        required: 1,
        type: 'select',
        option: ['哈哈', '呵呵']
      },
    ]
  },

  onLoad(options) {
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear)
    this.setData({
      dateTimeArray: obj.dateTimeArray,
      dateTime: obj.dateTime
    })
    var dateObj = dateTimePicker.getNowDate()
    this.data.field.forEach((item, index) => {
      if(item.type == 'select') {
        item.optionName = item.option[0]
      } else if (item.type == 'date') {
        item.date = dateObj.date
      }
    })
    this.setData({
      field: this.data.field
    })
  },

  // 下拉选择
  optionSelect(e) {
    let name = e.currentTarget.dataset.name
    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.optionName = item.option[e.detail.value]
      }
    })
    this.setData({
      field: this.data.field
    })
  },

  // 选择查勘时间
  dateChange(e) {
    console.log(e)
    let name = e.currentTarget.dataset.name
    this.data.field.forEach((item, index) => {
      if (item.name == name) {
        item.date = e.detail.value
      }
    })
    this.setData({
      field: this.data.field
    })
  },
})