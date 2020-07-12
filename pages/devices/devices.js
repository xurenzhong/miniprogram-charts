import http from '../../libs/httputils.js'

Page({
  onShareAppMessage: res => {
    return {}
  },
  onLoad: function() {
    
  },

  catchTap: function(e) {
    console.log("点击了"+e.currentTarget.dataset.index+"设备")
  },

  data: {
    list:[{
      // 设备名
      Bindname: "机器一号",
      // 设备系列号
      chip_id:"1201230",
      // 型号
      dev_type:"蓝鸥1号",
      // 位置
      UserWorkplace: "蓝鸥4楼",
      // 是否在线
      OnlineStaus: "1"
    }, {
      // 设备名
      Bindname: "机器二号",
      // 设备系列号
      chip_id:"1201230",
      // 型号
      dev_type:"蓝鸥2号",
      // 位置
      UserWorkplace: "蓝鸥4楼",
      // 是否在线
      OnlineStaus: "1"
    }, {
      // 设备名
      Bindname: "机器三号",
      // 设备系列号
      chip_id:"1201230",
      // 型号
      dev_type:"蓝鸥3号",
      // 位置
      UserWorkplace: "蓝鸥4楼",
      // 是否在线
      OnlineStaus: "1"
    },
    {
      // 设备名
      Bindname: "机器四号",
      // 设备系列号
      chip_id:"1201230",
      // 型号
      dev_type:"蓝鸥4号",
      // 位置
      UserWorkplace: "蓝鸥4楼",
      // 是否在线
      OnlineStaus: "1"
    }],
  }
})

