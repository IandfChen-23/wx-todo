// pages/out/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
url:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.url;
    
    this.setData({
      url:data
    })
    // wx.cloud.callFunction({
    //   name:'getNewsDetail',
    //   data:{
    //     url:data
    //   }
    // }).then(res=>{
    //   console.log(JSON.parse(res.result) )
    //   res=JSON.parse(res.result)
    //   let news=res.result.data
    //   this.setData({
    //     news: news
    //   })
    // })
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