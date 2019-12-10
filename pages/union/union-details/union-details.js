// 联盟详情
Page({
  data: {

  },
  onLoad: function (options) {

  },

  // 进入成员详细信息
  toMemberList() {
    wx.navigateTo({
      url: '../member/member',
    })
  },

  // 审核
  toExamine() {
    wx.showActionSheet({
      itemList: ['无需审核直接加入', '需要盟主审核'],
      success: (res) => {
        console.log(res.tapIndex);
        if (res.tapIndex === 0) {
          this.establishUnion()
        } else if (res.tapIndex === 1) {
          this.applyUnion()
        }
      }
    })
  }
})