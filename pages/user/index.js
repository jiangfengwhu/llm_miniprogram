// index.js
const { globalData } = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    theme: globalData.theme,
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: "",
      tickets: 0,
    },
  },

  onLoad() {
    const { userInfo } = this.data;
    this.setData({
      theme: globalData.theme,
      userInfo: {
        ...userInfo,
        nickName: globalData.userInfo.nick_name,
        tickets: globalData.userInfo.tickets
      }
    })
  },

   /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const page = getCurrentPages().pop();
      this.getTabBar().setData({
        value: `/${page.route}`
      })
    }
  },

  goMyImageList() {
    wx.navigateTo({
      url: '../list/index',
    })
  }
})
