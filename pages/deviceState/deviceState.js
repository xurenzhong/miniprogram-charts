var http = require('../../libs/httputils.js')

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: wx.getStorageSync('username'),
    chip_id: '',
    fault:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取上级传递信息
    var chip_id = options.chip_id
    var fault = options.fault
    this.setData({chip_id: chip_id, fault: fault})
    // 拿取设备数据的详情
    this.initData(chip_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 加载设备详情
   */
  initData: function (chip_id) {
    let that = this
    var params = {
      chip_id: chip_id,
      username: that.data.username
    }

    http.getRequest(app.globalData.root + "/programs/deviceInfoServlet", params, function (res) {
      console.log(res)
    }, function (err) {
      console.log(err)
    })
  },

  // 保养提醒
  waterWarning: function () {
    wx.navigateTo({
      url: '../waterWarning/waterWarning',
    })
  },

  // 故障提醒
  waterError: function () {
    wx.navigateTo({
      url: '../waterError/waterError',
    })
  },

  // 水质指标
  waterIndicator: function () {
    wx.navigateTo({
      url: '../waterIndicators/waterIndicators',
    })
  },
  // 滤芯滤料
  deviceLifes: function () {
    wx.navigateTo({
      url: '../deviceLifes/deviceLifes',
    })
  }
})