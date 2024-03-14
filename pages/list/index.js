import ActionSheet, { ActionSheetTheme } from 'tdesign-miniprogram/action-sheet/index';
import Toast from 'tdesign-miniprogram/toast/index';

const { firstGrid } = require('./const')
const api = require('../../utils/api')
const { serverApi, myResourceUrl } = require('../../utils/consts')


Page({
  data: {
    crossAxisCount: 2,
    crossAxisGap: 4,
    mainAxisGap: 4,
    gridList: [],
    visible: false,
    showIndex: false,
    closeBtn: false,
    deleteBtn: false,
    initialIndex: 0,
    images: [],
    emptyImage: 'https://tdesign.gtimg.com/mobile/demos/empty1.png'
  },
  onLoad:async function() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '长按图片可下载哦！',
      placement: 'bottom'
    })
    const response = await api.get(serverApi.gallery)
    const gridList = [];
    const images = [];
    if(response.code === 0) {
      const { data } = response;

      data?.forEach(item => {
        const { owner, id, status, ErrMsg } = item ?? {}
        const src = `${myResourceUrl}/${owner}/${id}_0001.jpg`

        gridList.push({
          fullUrl: src,
          status,
          ErrMsg
        })
        images.push(src)
      })

      this.setData({
        gridList,
        images
      })
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请求失败，请稍后重试！',
      })
    }
  },

  onClickImg(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: true,
      visible: true,
      closeBtn: true,
      deleteBtn: true,
      initialIndex: index
    });
  },
  onChange(e) {
    const { index } = e.detail;
  },

  onClose(e) {
    this.setData({
      visible: false,
    });
  },

  bindlongpress(e) {
    this.selectId = e.currentTarget.dataset.index;
    ActionSheet.show({
      theme: ActionSheetTheme.Grid,
      selector: '#t-action-sheet',
      context: this,
      items: firstGrid,
    });
  },

  handleSelected(e) {
    const { type } = e.detail.selected
    switch(type) {
      case 'download':
        this.saveImage()
       break
      default:
        Toast({
          context: this,
          selector: '#t-toast',
          message: '开发中～',
        })
        break
    }
  },

  saveImage() {
    const { images } = this.data;
    const that = this;
    if (this.selectId == null) {
      Toast({
        context: that,
        selector: '#t-toast',
        message: '请重新选择',
      })
      return
    }
    let imageUrl = images[this.selectId];

    // 下载图片
    wx.downloadFile({
      url: imageUrl,
      success: function(res) {
        if (res.statusCode === 200) {
          // 下载成功后保存图片到相册
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function() {
              Toast({
                context: that,
                selector: '#t-toast',
                message: '保存成功',
                theme: 'success',
                direction: 'column',
              });
            },
            fail: function(error) {
              console.error('保存图片失败', error);
              Toast({
                context: that,
                selector: '#t-toast',
                message: '保存失败',
                theme: 'error',
                direction: 'column',
              });
            }
          });
        } else {
          console.error('下载图片失败', res);
          Toast({
            context: that,
            selector: '#t-toast',
            message: '下载失败',
            theme: 'error',
            direction: 'column',
          });
        }
      },
      fail: function(error) {
        console.error('下载图片失败', error);
        Toast({
          context: that,
          selector: '#t-toast',
          message: '下载失败',
          theme: 'error',
          direction: 'column',
        });
      }
    });
    this.selectId = null;
  }
})
