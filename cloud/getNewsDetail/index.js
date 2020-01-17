// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

 console.log(event.url)
 return await rp(event.url,{
  header: {
    'content-type': 'json'
  },
 })
   .then(function (res) {
     console.log(res+'res');
     
     return JSON.stringify(res) 
   })
   .catch(function (err) {
     return '失败'
   });

}