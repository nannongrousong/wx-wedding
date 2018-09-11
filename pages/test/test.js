

Page({
  data: {
    name: 'lisi'
  },
  changeName: function() {
    this.setData({
      name: 'yuanwansong'
    })
  },
  onLoad: function () {
    console.log('test,onload');
  }
})