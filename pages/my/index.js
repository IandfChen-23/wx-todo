// pages/my/index.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    wutian:null,
    imgList: ['https://imgkr.cn-bj.ufileos.com/94baba7f-47f3-4625-81ca-a8889a89cbd7.jpg','https://imgkr.cn-bj.ufileos.com/51bd4b7d-1a25-4c12-bca3-65de7e8f786e.jpg'],
    swiperH:'',//swiper高度
    nowIdx:0,//当前swiper索引
  },
  //获取swiper高度
getHeight:function(e){
  var winWid = wx.getSystemInfoSync().windowWidth - 2*50;//获取当前屏幕的宽度
  var imgh = e.detail.height;//图片高度
  var imgw = e.detail.width;
  var sH = winWid * imgh / imgw + "px"
  this.setData({
    swiperH: sH//设置高度
  })
},
//swiper滑动事件
swiperChange:function(e){
  this.setData({
    nowIdx: e.detail.current
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let startDate=new Date(2019,1,1);
    let endDate=new Date();
    const that=this;
    setInterval(() => {
      this.getWeatherData();
      if(wx.getStorage({
        key: 'wutian',
      })){
        console.log(wx.getStorage({
          key: 'wutian',
        }))
      }
    }, 1000*2);
  },
  getWeatherData:function(){
    wx.request({
      url: `http://apis.juhe.cn/simpleWeather/query?city=%E4%B9%8C%E9%B2%81%E6%9C%A8%E9%BD%90&key=949f17389d0552b7303132556b71b03b`,
      methods:'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res){
        console.log(res)
        // that.setData({
        //   wutian: res.data.result.realtime
        // })
        wx.setStorage({
          key: 'wutian',
          data: res.data.result.realtime,
          success: function(res){
            console.log('异步保存成功')
          }
        })
        console.log('wutian'+that.data.wutian)
      },
      fail: function (res) {
      },
    })
    wx.request({
      url: `http://apis.juhe.cn/simpleWeather/query?city=%E4%B8%8A%E6%B5%B7&key=949f17389d0552b7303132556b71b03b`,
      methods:'GET',
      header: {
        'content-type': 'json'
      },
      success: function(res){
        console.log(res)
        wx.setStorage({
          key: 'hitian',
          data: res.data.result.realtime,
          success: function(res){
            console.log('异步保存成功')
          }
        })
        // that.setData({
        //   hitian: res.data.result.realtime
        // })
        console.log('wutian'+that.data.wutian)
      },
      fail: function (res) {
      },
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
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
