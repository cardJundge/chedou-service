// 转单公司选择
Page({
  data: {
    currentUnion: "",
    unionData: [{
        id: 1,
        name: "标题1",
        list: [{
            id: 1,
            url: "/images/demo1.jpg",
            company: "文字说明1",
          },
          {
            id: 2,
            url: "/images/demo2.jpg",
            company: "文字说明2",
          }
        ]
      },
      {
        id: 2,
        name: "标题2",
        list: [{
            id: 1,
            url: "/images/demo1.jpg",
            company: "文字说明3",
          },
          {
            id: 2,
            url: "/images/demo2.jpg",
            company: "文字说明4",
          }
        ]
      },
      {
        id: 3,
        name: "标题3",
        list: [{
            id: 3,
            url: "/images/demo1.jpg",
            company: "文字说明5",
          },
          {
            id: 4,
            url: "/images/demo2.jpg",
            company: "文字说明6",
          }
        ]
      }
    ],
    currentCompany: ''
  },

  onLoad: function(options) {
    console.log(options)
    this.data.businessInfo = options
    let sysInfo = wx.getSystemInfoSync()
    this.setData({
      currentUnion: this.data.unionData[0].id,
      screenHeight: sysInfo.windowHeight
    })
  },

  //点击左边事件
  selectUnion: function(e) {
    let unionid = e.currentTarget.dataset.id
    this.setData({
      currentUnion: unionid
    })
  },

  // 公司选择
  companyChange(e) {
    console.log(e.detail.value)
    this.data.currentCompany = e.detail.value
  },

  onConfirm() {
    console.log(this.data.currentCompany)
    if (this.data.currentCompany) {
      wx.navigateTo({
        url: '../transfer?company=' + this.data.currentCompany + '&businessType=' + this.data.businessInfo.businessType + '&businessNo=' + this.data.businessInfo.businessNo,
      })
    }
  }

})