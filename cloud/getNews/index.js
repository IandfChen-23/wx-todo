// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {


 let url= 'https://v.juhe.cn/toutiao/index?type=&key=063dda62198b71cfbbbe54b08c65c348'
 return await rp(url,{
  header: {
    'content-type': 'json'
  },
 })
   .then(function (res) {
     return JSON.stringify(res) 
   })
   .catch(function (err) {
     return '失败'
   });

}