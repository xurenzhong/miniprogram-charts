import http from '../../libs/httputils.js'

Page({
  onShareAppMessage: res => {
    return {}
  },
  onLoad: function() {
    
  },
  // 操作在这个位置归结
  catchTap: function(e) {
    let that = this
    if (that.data.handleType == 1) {
      console.log("重命名"+e.currentTarget.dataset.index+"设备")
      // 调用重命名窗口，之后重置状态
      var device = that.data.list[e.currentTarget.dataset.index]
      that.setData({renameText:device.Bindname, showRenameToast: true});
      that.data.handleType = 0;
    }else if(that.data.handleType == 2){
      console.log("移除"+e.currentTarget.dataset.index+"设备")
      // 调用移除之后，重置状态
      wx.showModal({
        title: '提示',
        content: '解除绑定设备',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
      that.data.handleType = 0;
    }else{
      var index = e.currentTarget.dataset.index
      var chip_id = that.data.list[index].chip_id
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

  cancel: function () {
    this.setData({showRenameToast: false, newName: ""})
    console.log(this.newName)
  },

  confirm: function () {
    if (this.data.newName && this.data.newName.length > 0) {
       // 调用重命名接口
       if (this.data.newName == this.data.renameText) {
         wx.showToast({
           title: '请输入新名称',
           duration: 1500,
           icon: 'error'
         })
       }else{

       }
    }else{
      wx.showToast({
        title: '输入不能为空',
        duration: 1500,
        icon: 'error'
      })
    }
  },

  setValue: function (e){
    console.log(e.detail.value);
    this.setData({newName:e.detail.value})
  },

  removeDevice: function (e){
    console.log("开始移除设备");
    this.data.handleType = 2;
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
    // 重命名弹窗
    showRenameToast: false,
    // 当前设备名称
    renameText: "",
    // 新名称
    newName: ""
  }
})

