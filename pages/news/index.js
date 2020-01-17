//index.js
//获取应用实例
import Toast from '@vant/weapp/toast/toast';
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
    
   // this.getData()
    wx.cloud.callFunction({
      name:'getNews'
    }).then(res=>{
      console.log(JSON.parse(res.result) )
      res=JSON.parse(res.result)
      let news=res.result.data
      this.setData({
        news: news
      })
    })
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
  getData: function () {
    const that = this
    wx.request({
      url: `https://v.juhe.cn/toutiao/index?type=&key=063dda62198b71cfbbbe54b08c65c348`,
      methods: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        // console.log(res)
        // if (res.data.result) {
        //   wx.setStorage({
        //     key: 'news',
        //     data: res.data.result.data,
        //     success: function (res) {
        //       console.log('异步保存成功')
        //     }
        //   })
        // } else {
        //   Toast.fail('数据加载失败');
        // }

        that.setData({
          news: res.data.result.data
        })
        console.log('news'+that.data.news)
      },
      fail: function (res) {
        Toast.fail('数据加载失败');
      },
    })
  },
  toDetail: function (e) {
    console.log(e);
    const url = e.currentTarget.dataset.url;
    console.log(url);

    wx.navigateTo({
      url: '../out/index?url=' + url,
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