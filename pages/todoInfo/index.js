// pages/todoInfo/index.js
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
    task: {},
    id: null,
    percent:0,
  },
  setPercent:function(e){
     console.log(e)
     let myPercent=e.detail.value
     this.setData({
       percent:myPercent
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let id = options.id
    db.collection('todos').doc(id).get().then(res => {
      console.log(res)
      this.setData({
        task: res.data,
        id: id
      })
    })
  },
  submit:function(){
    db.collection('todos').doc(this.data.id).update({
      data:{
        percent:this.data.percent
      }
    }).then(res => {
      console.log(res)
      wx.navigateTo({
        url: '../index/index',
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})