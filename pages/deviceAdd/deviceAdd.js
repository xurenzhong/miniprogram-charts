var http = require('../../libs/httputils.js')

const app = getApp()

Page({
  onShareAppMessage: res => {
    return {}
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({
      chip_id: options.chip_id,
      username: wx.getStorageSync('username')
    })
    console.log("Current_chipId:" + options.chip_id)
  },

  // 添加设备
  addDevice: function () {
    let that = this
    var params = {
      chip_id: that.data.chip_id,
      username: that.data.username,
      telnum: that.data.telnum,
      user: that.data.user,
      user_work_place: that.data.user_work_place,
      user_job: that.data.user_job,
      device_location: that.data.device_location,
      device_name: that.data.device_name
    }
    http.getRequest(app.globalData.root + "/programs/bindServlet", params, function (res) {
      console.log(res)
      if (res === "0000") {
        wx.showToast({
          title: '绑定设备成功',
        })
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
          needRefresh: true,
        })
        wx.navigateBack({
          delta: 1,
        })
      } else {
        var text = "绑定设备失败！"
        if (res === 'subsistent') {
          text = "设备已在列表中！"
        }
        wx.showToast({
          title: text,
          icon: 'none',
          duration: 3000
        })
      }
    }, function (err) {
      console.log(err)
    })
  },

  // 绑定
  bindDevice: function () {
    if (this.data.user.length == 0 || this.data.telnum.length == 0 || this.data.user_work_place.length == 0 || this.data.user_job.length == 0) {
      wx.showToast({
        title: '缺少信息',
        icon: "none"
      })
    } else {
      this.addDevice()
    }
  },

  // 取消
  cancelBind: function () {
    wx.navigateBack({
      complete: (res) => {},
    })
  },

  setNameValue: function (e) {
    this.data.user = e.detail.value
  },

  setTelValue: function (e) {
    this.data.telnum = e.detail.value
  },

  setJobValue: function (e) {
    this.data.user_job = e.detail.value
  },

  setWorkValue: function (e) {
    this.data.user_work_place = e.detail.value
  },

  data: {
    chip_id: "",
    // 姓名
    user: "",
    // 工作单位
    user_work_place: "",
    // 工作岗位
    user_job: "",
    // device_location
    device_location: "未知位置",
    // 手机号
    telnum: "",
    // 手机号
    username: "",
    // 设备名称默认
    device_name: "蓝鸥净水设备"
  }
})