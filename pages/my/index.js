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
    time: null,
    activeNames: [],
    wutian: {info:null,
      temperature:null,direct:null,power:null,aqi:null, humidity:null
    },
    hitian:{
      info:null,
      temperature:null,direct:null,power:null,aqi:null, humidity:null
    },
    imgList: ['../../image/jiao1.jpg', '../../image/11.jpg', '../../image/3.jpg', '../../image/13.jpg', '../../image/12.jpg', ],
    swiperH: '', //swiper高度
    nowIdx: 0, //当前swiper索引
  },
  getSec: function () {
    //功能：计算两个时间之间相差多少个小时    
    var date = '2019-01-01 00:00:00:00';
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    var timestamp = new Date(date).getTime();

    var timestamp2 = new Date().getTime() - timestamp;
    var xx = timestamp2 / 1000 / 60 / 60 / 24;
    xx = xx.toFixed(2);
    xx = this.sz(xx.toString());
    return xx;
  },

  sz: function (xx) {
    //功能:将楼上的计算出来的时间差变成：  '3天6时58分'    这种样子
    var str = xx;
    var strarr = str.split(".");
    var str2 = "0." + strarr[1];
    var t = strarr[0];
    if (t != 0) {
      t = t + "天";
    } else {
      t = "";
    }
    var str3 = 1440 * str2;
    var fz = "";
    var xs = "";
    if (str3 < 60) {
      str3 = str3.toFixed(0);
      fz += str3;
      fz += "分";
      t += fz;
      return t;
    } else if (str3.toFixed(0) == 60) {
      xs += "1时";
      t += xs;
      return t;
    } else if (str3 > 60) {
      var s = "";
      s += str3 / 60;
      var arrxs = s.split(".");
      xs += arrxs[0];
      xs += "时";
      var f = "0." + arrxs[1];
      var f2 = 60 * f;
      f2 = f2.toFixed();
      fz += f2;
      fz += "分";
      var xsfz = xs + fz;
      return t += xsfz;
    }
  },
  //获取swiper高度
  getHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width;
    var sH = winWid * imgh / imgw + "px"
    this.setData({
      swiperH: sH //设置高度
    })
  },
  //swiper滑动事件
  swiperChange: function (e) {
    this.setData({
      nowIdx: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let firstTime=this.getSec();
    this.setData({
      time: firstTime
    })
    setInterval(() => {
      let time = this.getSec()
      this.setData({
        time: time
      })
      
    }, 1000*60);
  },
  getWeatherData: function () {
    const that=this
    wx.request({
      url: `http://apis.juhe.cn/simpleWeather/query?city=%E4%B9%8C%E9%B2%81%E6%9C%A8%E9%BD%90&key=949f17389d0552b7303132556b71b03b`,
      methods: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          ['wutian.info']: res.data.result.realtime.info,
          ['wutian.temperature']: res.data.result.realtime.temperature,
          ['wutian.direct']: res.data.result.realtime.direct,
          ['wutian.power']: res.data.result.realtime.power,
          ['wutian.aqi']: res.data.result.realtime.aqi,
          ['wutian.humidity']: res.data.result.realtime.humidity
        })
        
        // wx.setStorage({
        //   key: 'wutian',
        //   data: res.data.result.realtime,
        //   success: function (res) {
        //     console.log('异步保存成功')
        //   }
        // })
      },
      fail: function (res) {},
    })
    wx.request({
      url: `http://apis.juhe.cn/simpleWeather/query?city=%E4%B8%8A%E6%B5%B7&key=949f17389d0552b7303132556b71b03b`,
      methods: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        // console.log(res)
        // wx.setStorage({
        //   key: 'hitian',
        //   data: res.data.result.realtime,
        //   success: function (res) {
        //     console.log('异步保存成功')
        //   }
        // })
        that.setData({
          hitian: res.data.result.realtime
        })
      },
      fail: function (res) {},
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
    this.getWeatherData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getWeatherData();
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
    this.getWeatherData();
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