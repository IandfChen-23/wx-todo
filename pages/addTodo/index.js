//index.js
//获取应用实例
const app = getApp()
wx.cloud.init({
  env: 'wx-todo-e6867b',
  traceUser: true,
});

const db = wx.cloud.database();
Page({
  data:{
    image:null,
    location:null,
    imagewidth: 0, // 缩放后的宽
    imageheight: 0, // 缩放后的高
    item:'hhhhh',
    goal:null
  },
  onSubscribe: function (e) {
    wx.cloud.callFunction({
      name:'database',

      success:function(res){
        console.log(res)
      }
    })
  },
  imageLoad: function (e) {
    var imageSize = this.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  imageUtil: function (e) {
    var imageSize = {};
    var originalWidth = e.detail.width; // 图片原始宽
    var originalHeight = e.detail.height; // 图片原始高
    var originalScale = originalHeight / originalWidth; //图片高宽比
    //获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        var windowscale = windowHeight / windowWidth;//屏幕高宽比
        if (originalScale < windowscale) { // 图片高宽比小于屏幕高宽比
          //图片缩放后的宽为屏幕宽
          imageSize.imageWidth = windowWidth;
          imageSize.imageHeight = windowHeight /2;
        } else { // 图片高宽比大于屏幕高宽比
          //图片缩放后的高为屏幕高
          imageSize.imageHeight = windowHeight / 2;
          imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
        }
      }
    })
    return imageSize;
  },
  notice:function(){
    wx.requestSubscribeMessage({
      tmplIds: ['dKklVEVnM33J4CtRyKv0MDHlo7ZM_5EwFTDZxK_zgvI'],
      success(res) {
        console.log(res)
       }
    })
  },
  
  selectImg:function(){
    const that=this;
    wx.chooseImage({
      success: function(res) {
        console.log(res.tempFilePaths[0]);
        let path=res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath:`${Math.random()*100000}.jpg`,
          filePath:path
        }).then(res=>{
          console.log(res)
          that.setData({
            image:res.fileID
          })
        }).catch(res=>{
          console.log(res)
        })
      },
    })
  },
  selectLocation:function(){
     const that=this
     wx.chooseLocation({
       success: function(res) {
         console.log(res)
         let locationObj={
           latitude:res.latitude,
           longitude:res.longitude,
           address:res.address,
           name:res.name
         }
         that.setData({
           location:locationObj
         })
       },
     })
  },
  onLoad:function(options){
    console.log(options.goal)
    const goal=options.goal;
    this.setData({
      goal:goal
    })

  },
  onSubmit:function(e){
    console.log(e.detail.value.title);
    let myTile = e.detail.value.title;
    const goal=this.data.goal;
    if(!goal){
      db.collection('todos').add({
        data:{
          title:myTile,
          image:this.data.image,
          location:this.data.location,
          percent:0
        }
      }).then(res=>{
        console.log(res)
        wx.showToast({
          title: '添加成功',
        })
        wx.switchTab({
          url: '../index/index',
        })
      })
    }else{
      db.collection('goal').add({
        data:{
          title:myTile,
          image:this.data.image,
          location:this.data.location,
          percent:0
        }
      }).then(res=>{
        console.log(res)
        wx.showToast({
          title: '添加成功',
        })
        wx.switchTab({
          url: '../goal/index',
        })
      })
    }
    
  }
})
