// index.js
import Toast from 'tdesign-miniprogram/toast/index';

const api = require("../../utils/api");
const { serverApi } = require('../../utils/consts')

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: "",
      tickets: 0,
    },
    dialogConfig: {
      visible: false,
      title: '获取次数',
      content: "请联系分享者添加",
      confirmBtn: { content: '我知道了', variant: 'base' },
    },
    isRefresh: false,
  },

  onLoad:async function() {
    const { userInfo } = this.data;
    const response = await api.get(serverApi.userInfo)
    if (response?.code === 0) {
      const { data } = response

      this.setData({
        userInfo: {
          ...userInfo,
          nickName: data.nick_name,
          tickets: data.tickets
        }
      })
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请求失败',
        theme: 'error',
        direction: 'column',
      });
    }
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
  },

  getTickets() {
    const { dialogConfig } = this.data
    this.setData({
      dialogConfig: {
        ...dialogConfig,
        visible: true
      }
     });
  },

  closeDialog() {
    const { dialogConfig } = this.data
    this.setData({
      dialogConfig: {
        ...dialogConfig,
        visible: false
      }
     });
  },

  goLarkDoc() {
    // 跳转反馈文档
    wx.navigateToMiniProgram({
      appId: 'wxd45c635d754dbf59',
      path: `pages/detail/detail?url=https://docs.qq.com/sheet/DRkhTeENGeUNtRHVM?tab=BB08J2`
    })

  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    this.setData({isRefresh: true})
    await this.onLoad()
    this.setData({isRefresh: false})
  },
})
