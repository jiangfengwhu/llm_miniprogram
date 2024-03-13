Component({
  data: {
    value: '/pages/home/index',
    list: [{
      url: '/pages/home/index',
      icon: 'home',
      label: '首页',
      ariaLabel: '首页',
      value: '/pages/home/index'
    }, {
      url: '/pages/user/index',
      icon: 'user',
      label: '我的',
      ariaLabel: '我的',
      value: '/pages/user/index'
    }]
  },

  methods: {
    onChange(e) {
      wx.switchTab({
        url: e.detail.value
      });
    },
  },
});
