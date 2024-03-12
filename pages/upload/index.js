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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const fullUrl = options.fullUrl
    this.setData({
      theme: globalData.theme,
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
        console.log(res)
        // return { url: URL.createObjectURL(file.url), name: data?.name };
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
  clickButton() {
    const { fileList } = this.data;
    console.log(fileList)
    if (fileList.length > 0) {

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
