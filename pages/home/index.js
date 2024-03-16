import Toast from 'tdesign-miniprogram/toast/index';

const api = require('../../utils/api')
const { serverApi, resuseUrl } = require('../../utils/consts')



Page({
  /**
   * 页面的初始数据
   */
  data: {
    crossAxisCount: 2,
    crossAxisGap: -10,
    mainAxisGap: 10,
    gridList: [],
    backTopTheme: 'round',
    backTopText: '顶部',
    scrollTop: 0,
    isRefresh: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const response = await api.get(serverApi.home)

    if (response.code === 0) {
      const gridList = response?.data?.map(item=> {
        return {
          ...item,
          fullUrl: `${resuseUrl}${item.url}`,
          like: '999+',
          status: 2,
        }
      })

      this.setData({
        gridList,
      })
    } else {
      // 接口报错
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请求失败',
        theme: 'error',
        direction: 'column',
      });
    }

  },

  onToTop(e) {
    // console.log('backToTop', e);
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      const page = getCurrentPages().pop();
      this.getTabBar().setData({
        value: `/${page.route}`
      })
    }
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
  async onPullDownRefresh() {
    this.setData({isRefresh: true})
    await this.onLoad()
    this.setData({isRefresh: false})
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
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请重新进入小程序',
        theme: 'error',
        direction: 'column',
      });
    }

  }
})
