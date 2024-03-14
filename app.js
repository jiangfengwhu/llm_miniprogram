// app.js
const api = require("./utils/api.js");
const { serverApi } = require('./utils/consts')

App({
  // 小程序初始化完成时触发，只会触发一次。可以在此函数中进行全局数据的初始化、网络请求等操作
  onLaunch: async function (options) {
    // 判断用户进入场景
    switch (options.scene) {
      case 1001:
        console.log("用户从发现栏小程序主入口进入");
        break;
      case 1005:
        console.log("用户从顶部搜索框的搜索结果页进入");
        break;
      case 1011:
        console.log("用户扫描二维码进入");
        break;
      // ...
      default:
        console.log("用户从其他场景进入");
    }
    // 输出启动参数和来源信息
    console.log("启动参数：", options.query);
    console.log("来源信息：", options.referrerInfo);

    // 0.从本地获取token/userInfo
    // const token = wx.getStorageSync("token")
    // const userInfo = wx.getStorageSync("userInfo")

    // 1.进行登录操作(判断逻辑)
    // if (!token || !userInfo) {
    //   // 将登录成功的数据, 保存到storage
    //   console.log("登录操作");
    //   wx.setStorageSync("token", "kobetoken")
    //   wx.setStorageSync("userInfo", { nickname: "kobe", level: 100 })
    // }
    // console.log('打印options',options)

    // 2.将获取到数据保存到globalData中
    // this.globalData.token = token
    // this.globalData.userInfo = userInfo

    // 展示本地存储能力
    // const logs = wx.getStorageSync("logs") || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync("logs", logs);

    const token = wx.getStorageSync("token");
    // console.log(token, 'token')
    if (token) {
      api.updateToken(token);
      const res = await api.get(serverApi.userInfo)
      if (res?.code === 401) {
        // 重新登录
        await this.login()
      } else if (res?.code === 0) {
        this.globalData.userInfo = res.data;
      } else {
        // error
        console.error('登录失败')
      }
    } else {
      await this.login()
    }
  },
  login:async function() {
    // 登录
    wx.login({
      success:async (res) => {
        const data = await api.get(`${serverApi.login}?code=${res.code}`);
        const { token, user } = data.data ?? {};
          api.updateToken(token);
          wx.setStorageSync("token", token);
          this.globalData.userInfo = user;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },

  // 小程序启动或从后台进入前台显示时触发。可以在此函数中获取用户进入场景、检查用户登录状态等操作
  onShow() {},
  // 小程序从前台进入后台时触发。可以在此函数中进行页面或全局数据的存储、网络请求等操作
  onHide() {},
  onError() {},
  // 全局参数
  globalData: {
    userInfo: null,
    theme: "light", // 主题色，默认light
    userInfo: {},
  },
});
