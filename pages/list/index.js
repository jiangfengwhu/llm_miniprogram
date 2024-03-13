const { globalData } = getApp()

Page({
  data: {
    theme: globalData.theme,
    crossAxisCount: 2,
    crossAxisGap: 4,
    mainAxisGap: 4,
    gridList: [],
  },
  onLoad () {
    const history = globalData.userInfo.history ?? [];
    const id = globalData.userInfo.id ?? [];
    const imageWidth = wx.getStorageSync("imageWidth")
    const gridList = history?.map(item => {
      return{
        fullUrl: `https://gate.fbyron.cn/com/res/${id}/${item}_0001.jpg`,
        width: imageWidth,
        height: 200,
      }

    })
    console.log(gridList, 'gridList');
    this.setData({
      theme: globalData.theme,
      gridList,
    })

  }
})
