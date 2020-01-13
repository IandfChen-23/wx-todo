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
    task: {
      percent: null,
      remark: null
    },
    hiddenmodalput: true,
    id: null,
  },
  setPercent: function (e) {
    console.log(e)
    let myPercent = e.detail.value
    let reg = new RegExp("^(\\d|[1-9]\\d|100)$");
    if (!reg.test(myPercent)) {
      wx.showToast({
        title: '请输入0-100的数字',
        icon: 'none'
      })
      return
    }
    this.data.task.percent = myPercent
    this.setData({
      'task.percent': myPercent
    })
  },
  showRemark: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  setRemark: function (e) {
    console.log(e)
    let myRemark = e.detail.value
    this.data.task.remark = myRemark
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id
    db.collection('todos').doc(id).get().then(res => {
      console.log(res)
      this.setData({
        task: res.data,
        id: id,
      })
    })
  },
  addRemark: function () {
    db.collection('todos').doc(this.data.id).update({
      data: {
        remark: this.data.task.remark
      }
    }).then(res => {
      console.log('res')
      db.collection('todos').doc(this.data.id).get().then(res => {
        console.log(res)
        this.setData({
          task: res.data,
        })
      })
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  submit: function () {
    db.collection('todos').doc(this.data.id).update({
      data: {
        percent: this.data.task.percent,
        remark: this.data.task.remark
      }
    }).then(res => {
      console.log('res')
      wx.switchTab({
        url: '../index/index',
      })
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