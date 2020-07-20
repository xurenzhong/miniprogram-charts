import http from '../../libs/httputils.js'

Page({
  onShareAppMessage: res => {
    return {}
  },
  onLoad: function() {
    
  },

  catchTap: function(e) {
    if (this.data.handleType == 1) {
      console.log("重命名"+e.currentTarget.dataset.index+"设备")
      // 调用重命名接口，之后重置状态
      this.data.handleType = 0;
    }else{
      var index = e.currentTarget.dataset.index
      var chip_id = this.data.list[index].chip_id
      console.log("点击了第"+index+"个设备："+chip_id)
      wx.navigateTo({
        url: '../../pages/deviceState/deviceState?chip_id'+chip_id,
      })
    }
  },

  rename: function (e) {
    console.log("开始重命名");
    this.data.handleType = 1;
  },
  // 扫描添加设备功能
  scanDevice: function () {
    wx.navigateTo({
      url: '../deviceAdd/deviceAdd',
    })
    return
    console.log("开始扫描设备");
    wx.scanCode({
      complete: (res) => {
        console.log("设置系列号："+res.result)
        if (res.result.length == 0) {
          wx.showToast({
            title: '扫描失败',
          })
        }else{
          var chip_id = res.result
          wx.navigateTo({
            url: '../deviceAdd/deviceAdd?chip_id=' + chip_id
          })
        }
      },
    })
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
    }, 
    {
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
    }
  ],
    // 操作的类型0-非重命名状态；1-状态；重名之后需要重置
    handleType: 0,
  }
})

