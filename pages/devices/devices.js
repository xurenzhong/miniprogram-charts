var http = require('../../libs/httputils.js')

const app = getApp()

Page({

  onShareAppMessage: res => {
    return {}
  },

  onLoad: function (options) {
    console.log(options)
    wx.hideHomeButton({
      success: (res) => {},
    })
    if (options.username) {
      this.setData({
        username: options.username
      })
      this.initData()
    } 
  },

  onShow: function () {
    let that = this
    wx.hideHomeButton({
      success: function() {},
    })
    if (that.data.needRefresh) {
      that.initData()
      that.data.needRefresh = false
    }
    // 定时任务5分钟刷新
    that.data.timer = setInterval(() => {
      that.initData()
    }, 30000);
  },

  // 离开返回，都需要重新刷新
  onHide: function (){
    this.data.needRefresh = true
    clearInterval(this.data.timer)
  },

  // 获取设置列表
  initData: function () {
    let that = this
    var params = {
      username: this.data.username
      // 测试
      // username: "test"
    }
    http.getRequest(app.globalData.root + "/programs/userDeviceListServlet", params, function (res) {
      console.log("成功：" + res)
      // 如果没有在线状态，默认为在线
      res.forEach(element => {
        if (element.online_status === '') {
          element.online_status = 'online'
        }
      });
      if (res !== "faild") {
        that.setData({
          list: res
        })
      } else {
        that.setData({
          list: []
        })
        wx.showToast({
          title: '获取失败或者没有设备',
          icon: 'none'
        })
      }
    }, function (err) {
      console.log(err)
    })
  },

  // 操作在这个位置归结
  catchTap: function (e) {
    let that = this
    var device = that.data.list[e.currentTarget.dataset.index]
    if (that.data.handleType == 1) {
      console.log("重命名" + e.currentTarget.dataset.index + "设备")
      // 调用重命名窗口，之后重置状态
      var device = that.data.list[e.currentTarget.dataset.index]
      that.setData({
        renameText: device.device_name,
        showRenameToast: true,
        device: device
      });
      that.data.handleType = 0;
    } else if (that.data.handleType == 2) {
      console.log("移除" + e.currentTarget.dataset.index + "设备")
      that.setData({
        device: device
      })
      // 调用移除之后，重置状态
      wx.showModal({
        title: '提示',
        content: '解除绑定设备',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // that.removeDevice(device.chip_id)
            var params = {
              username: wx.getStorageSync('username'),
              chip_id: device.chip_id,
            }
            http.getRequest(app.globalData.root + "/programs/unbindServlet", params, function (res) {
              console.log(res)
              if (res === "0000") {
                wx.showToast({
                  title: '已经成功移除设备',
                })
                // 移除设备之后，重新加载
                that.initData()
              } else {
                wx.showToast({
                  title: '移除设备失败',
                  icon: 'none'
                })
              }
            }, function (err) {
              console.log(err)
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
      that.data.handleType = 0;
    } else {
      var index = e.currentTarget.dataset.index
      var chip_id = that.data.list[index].chip_id
      console.log("点击了第" + index + "个设备：" + chip_id)
      wx.navigateTo({
        url: '../../pages/deviceState/deviceState?chip_id=' + chip_id,
      })
    }
  },
  // 重命名点击
  rename: function () {
    this.data.handleType = 1;
  },
  // 设备移除点击
  removeDevice: function (e) {
    console.log("开始移除设备");
    this.data.handleType = 2;
  },

  cancel: function () {
    this.setData({
      showRenameToast: false,
      newName: ""
    })
    console.log(this.newName)
  },

  confirm: function () {
    let that = this
    if (that.data.newName && that.data.newName.length > 0) {
      // 调用重命名接口
      if (that.data.newName === that.data.renameText) {
        wx.showToast({
          title: '请输入新名称',
          duration: 1500,
          icon: 'none',
        })
      } else {
        console.log("开始重命名")
        var params = {
          username: that.data.username,
          chip_id: that.data.device.chip_id,
          device_name: that.data.newName,
        }
        http.getRequest(app.globalData.root + "/programs/renameDevice_nameServlet", params, function (res) {
          console.log(res)
          if (res === "0000") {
            that.setData({
              showRenameToast: false
            })
            wx.showToast({
              title: '重命名成功',
            })
            // 重命名成功，重新加载
            that.initData()
          }
        }, function (err) {
          console.log(err)
          wx.showToast({
            title: '重命名失败',
          })
        })
      }
    } else {
      wx.showToast({
        title: '输入不能为空',
        duration: 1500,
        icon: 'none',
      })
    }
  },

  setValue: function (e) {
    console.log(e.detail.value);
    this.setData({
      newName: e.detail.value
    })
  },

  // 扫描添加设备功能
  scanDevice: function () {
    console.log("开始扫描设备");
    wx.scanCode({
      complete: (res) => {
        console.log("设置系列号：" + res.result)
        if (res.result.length == 0) {
          wx.showToast({
            title: '扫描失败',
          })
        } else {
          var chip_id = res.result
          wx.navigateTo({
            url: '../deviceAdd/deviceAdd?chip_id=' + chip_id
          })
        }
      },
    })
  },

  data: {
    list: [
      //   {
      //   // 设备名
      //   device_name: "机器一号",
      //   // 设备系列号
      //   chip_id: "1201230",
      //   // 型号
      //   device_model_number: "蓝鸥1号",
      //   // 位置
      //   device_location: "蓝鸥4楼",
      //   // 是否有故障，需要保养
      //   fault: "",
      //   // 是否在线
      //   online_status: "offline"
      // }
    ],
    // 操作的类型0-非重命名状态；1-状态；重名之后需要重置
    handleType: 0,
    // 重命名弹窗
    showRenameToast: false,
    // 当前设备名称
    renameText: "",
    // 新名称
    newName: "",
    // 用户手机
    username: "",
    // 被移除或者重命名的设备
    index: -1,
    // 当前被操作的设备
    device: null,
    // 是否需要刷新
    needRefresh: false,
    // 定时任务
    timer: null
  }
})