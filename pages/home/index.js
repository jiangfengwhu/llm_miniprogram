import api from '../../utils/api'
const { globalData } = getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    theme: globalData.theme,
    crossAxisCount: 2,
    crossAxisGap: 4,
    mainAxisGap: 4,
    gridList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.setData({theme: globalData.theme})
    const imageWidth = wx.getStorageSync("imageWidth")
    const response = await api.get("/gapi/home")

    if (response.code === 0) {
      const gridList = response?.data?.map(item=> {
        return {
          ...item,
          fullUrl: `https://gate.fbyron.cn/com/res/home/${item.url}`,
          width: imageWidth,
          height: Math.floor(parseInt(item.height) / Math.floor(parseInt(item.width) / imageWidth)) ?? imageWidth
        }
      })

      this.setData({
        gridList,
      })
    } else {
      // 接口报错
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 跳转上传页面
  goUpload(e) {
    const fullUrl = e.currentTarget.dataset.item?.fullUrl;
    const id = e.currentTarget.dataset.item?.id;
    const params = JSON.stringify({
      fullUrl,
      id
    })
    if (fullUrl) {
      wx.navigateTo({
        url: '../upload/index?params=' + params,
      })
    } else {
      console.log('请重新进入小程序!')
    }

  }
})
