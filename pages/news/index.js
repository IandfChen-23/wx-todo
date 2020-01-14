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
    news: []
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
    const that=this
    wx.request({
      url: `https://v.juhe.cn/toutiao/index?type=&key=063dda62198b71cfbbbe54b08c65c348`,
      methods:'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res){
        console.log(res)
        that.setData({
          news: res.data.result.data
        })
        console.log(that.data.news)
      },
      fail: function (res) {
      },
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