import api from '../../utils/api'
import Toast from 'tdesign-miniprogram/toast/index';
const { globalData } = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    theme: globalData.theme,
    fileList: [], // 图片list
    aiImage: {
      fullUrl: '', // 地址
      aiImageHeight: 300, // ai图片的高
    },
    gridConfig: {
      column: 1,
      width: 200,
      height: 200
    },
    ImageProps: {
      // 没有生效
      mode: "aspectFit",
    },
    userUploadImage: {}, // 用户上传图片回调
    // dialog 内容
    dialogConfig: {
      visible: false,
      title: 'AI图片正在生成中',
      content: "请稍后在我的页面进行浏览、保存",
      confirmBtn: { content: '返回首页', variant: 'base' },
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const windowInfo = wx.getWindowInfo();
    const screenWidth = windowInfo.screenWidth;
    const aiImageHeight = Math.floor(windowInfo.screenHeight * 0.4);
    const uploadImageHeight = Math.floor(windowInfo.screenHeight * 0.8);
    const params = JSON.parse(options?.params) ?? {};

    this.setData({
      theme: globalData.theme,
      aiImage: {
        id: params.id, // id
        fullUrl: params.fullUrl, // 地址
        aiImageHeight, // ai图片的高
      },
      gridConfig: {
        column: 1,
        width: (screenWidth - 20) * 2,
        height: uploadImageHeight
      },
    })
  },

  // 上传图片
  handleAdd(e) {
    const { fileList } = this.data;
    const { files } = e.detail;

    // 方法1：选择完所有图片之后，统一上传，因此选择完就直接展示
    this.setData({
      fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
    });

    // 方法2：每次选择图片都上传，展示每次上传图片的进度
    files.forEach(file => this.onUpload(file))
  },

  // 上传图片
  onUpload:async function(file) {
    api.upload("/com/upload/image", file).then(data => {
      const res = JSON.parse(data) ?? {}
      if (res?.name) {
        this.setData({
          userUploadImage: res,
        })
      }
    }).catch(err => {
      console.log(err, 'err')
    })
  },

  // 删除图片
  handleRemove(e) {
    const { index } = e.detail;
    const { fileList } = this.data;

    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },

  // 提交按钮
  clickButton:async function() {
    const { aiImage, fileList, userUploadImage, dialogConfig } = this.data;
    if (fileList.length > 0) {
      const res = await api.post('/gapi/queue_prompt', {
        template_id: aiImage.id,
        images: { 13: userUploadImage.name },
        type: "t2i",
      })
      const title = res?.code === 0 ? 'AI图片正在生成中1' : 'AI图片生成失败';
      const content = res?.code === 0 ? '请稍后在我的页面进行浏览、保存' : '请重新选择风格';
      this.showDialog(Object.assign(dialogConfig, {title, content}))
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请上传图片',
        theme: 'warning',
        direction: 'column',
      });
    }
  },

  showDialog(newDialogConfig) {
    const { dialogConfig } = this.data
    this.setData({
      dialogConfig: {
        ...dialogConfig,
        ...newDialogConfig,
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
     wx.navigateBack()
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

})
