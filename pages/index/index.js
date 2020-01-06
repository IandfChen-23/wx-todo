//index.js
//获取应用实例
const app = getApp()
wx.cloud.init({
  env: 'wx-todo-e6867b',
  traceUser: true,
});

const db = wx.cloud.database();
Page({
  data: {
    tasks: []
  },
  deleteItem: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.name
    db.collection('todos').doc(id).remove().then(res => {
      console.log(res,title)
      wx.showToast({
        title: `${title}已删除`,
      })
      this.getData();
    })
  },
  toInfo:function(e){
       console.log(e)
       wx.redirectTo({
         url: '../todoInfo/index',
       })
  },
  onLoad: function() {
    this.getData();
  },
  onReachBottom: function() {
    this.getData();
  },
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '数据加载中',
    })
    this.getData();
    wx.hideLoading()
  },
  
  getData: function() {
    db.collection('todos').get().then(res => {
      this.setData({
        tasks: res.data
      })
    })
  }
})