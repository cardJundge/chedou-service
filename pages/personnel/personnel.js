// 人员管理

import { personnel } from './data';
Page({
  data: {
    someone: true,
    personnel: []
  },
  onLoad: function (options) {

  },
  onReady() {
    let storeData = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeData[index] = {
        key: item,
        list: []
      }
    })
    personnel.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1)
      let index = words.indexOf(firstName)
      storeData[index].list.push({
        name: item.name,
        key: firstName
      });
    })
    this.data.personnel = storeData
    this.setData({
      personnel: this.data.personnel
    })
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
})