Component({
  data: {
    value: 'pages/home/index',
    tabBar: [{
      url: 'pages/home/index',
      icon: 'home',
      label: '首页',
    }, {
      value: 'pages/index/index',
      icon: 'user',
      url: '我的',
    }]
  },

  methods: {
    onChange(e) {
      this.setData({
        value: e.detail.value,
      });
    },
  },
});
