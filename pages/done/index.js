//index.js
//获取应用实例
const app = getApp()
wx.cloud.init({
  env: 'wx-todo-e6867b',
  traceUser: true,
});
const db = wx.cloud.database();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    tasks: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },
  getData: function () {
    db.collection('todos').get().then(res => {
      this.setData({
        tasks: res.data.filter(item=>{
          return item.percent==100
        })
      })
    })
  },
  deleteItem: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.name
    db.collection('todos').doc(id).remove().then(res => {
      console.log(res, title)
      wx.showToast({
        title: `${title}已删除`,
      })
      this.getData();
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})