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
    location:null
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
  onSubmit:function(e){
    console.log(e.detail.value.title);
    let myTile = e.detail.value.title;
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
  }
})
