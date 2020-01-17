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
    goal: []
  },

  setUrgent: function (e) {
    var that = this
    let id = e.currentTarget.dataset.id
    console.log(e)
    wx.showModal({
      title: '是否设置为紧急',
      content: '',
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          db.collection('goal').doc(id).update({
            data:{
              urgent:true
            }
          }).then(res => {
            console.log(res)
            wx.showToast({
              title: `已设置`,
            })
            that.getData();
          })
        }else{
          db.collection('goal').doc(id).update({
            data: {
              urgent: false
            }
          }).then(res => {
            console.log(res)
            wx.showToast({
              title: `已取消`,
            })
            that.getData();
          })
        }
      }
    })

  },
  deleteItem: function (e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.name
    db.collection('goal').doc(id).remove().then(res => {
      console.log(res, title)
      wx.showToast({
        title: `${title}已删除`,
      })
      this.getData();
    })
  },
  toInfo: function (e) {
    console.log(e)
    wx.redirectTo({
      url: '../todoInfo/index',
    })
  },
  onLoad: function () {
    this.getData();
  },
  onShow: function () {
    this.getData()
  },
  onReachBottom: function () {
    this.getData();
  },

  getData: function () {
    db.collection('goal').get().then(res => {
      this.setData({
        tasks: res.data.filter(item => {
          return item.percent != 100
        })
      })
    })
  }
})