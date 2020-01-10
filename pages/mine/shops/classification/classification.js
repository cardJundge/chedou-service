// 分类管理
Page({
  data: {
    noClassification: false,
    current: "",
    classificationData: [{
        id: 1,
        name: '测试01',
        second: [{
            id: 1,
            name: '二级01'
          },
          {
            id: 2,
            name: '二级02'
          }
        ]
      },
      {
        id: 2,
        name: '测试02',
        second: [{
            id: 3,
            name: '二级03'
          },
          {
            id: 4,
            name: '二级04'
          },
          {
            id: 5,
            name: '二级05'
          },
          {
            id: 6,
            name: '二级06'
          },
          {
            id: 7,
            name: '二级07'
          },
          {
            id: 8,
            name: '二级08'
          },
          {
            id: 9,
            name: '二级09'
          },
          {
            id: 10,
            name: '二级10'
          },
          {
            id: 11,
            name: '二级11'
          },
          {
            id: 12,
            name: '二级12'
          },
          {
            id: 13,
            name: '二级13'
          },
          {
            id: 14,
            name: '二级14'
          },
          {
            id: 15,
            name: '二级15'
          },
          {
            id: 16,
            name: '二级16'
          },
          {
            id: 17,
            name: '二级17'
          },
          {
            id: 18,
            name: '二级18'
          }
        ]
      }
    ],
  },

  onLoad: function(options) {
    let sysInfo = wx.getSystemInfoSync()
    this.setData({
      screenHeight: sysInfo.windowHeight
    })
  },

  //点击左边事件
  selectClassification: function (e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      current: id
    })
  },

  // 添加分类
  toAddClassification() {
    wx.navigateTo({
      url: './add-classification/add-classification',
    })
  }
})