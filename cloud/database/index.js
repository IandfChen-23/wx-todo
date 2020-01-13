// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  res = await db.collection('todos').doc("da51bd8c5e16a44c0000a4396a59170e").update({
    data:{
      title: '一弄啥嘞'
    }
    
  })
 return res;
}