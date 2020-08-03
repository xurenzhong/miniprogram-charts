var http = require('../../libs/httputils.js')

const app = getApp()

Page({

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
      that.setData({device_info: res})
      // 过滤本页需要的数据
      if (res.work_s) {
        var work_s = res.work_s
        // 温度
        var tempStr_16 = work_s.slice(2, 6)
        var tempStr_10 = parseInt(tempStr_16.toString(16), 16) * 0.1
        that.setData({temp:'温度：' + tempStr_10.toFixed(1) + '℃'})

        // 故障提示
        var errorStr_16 = work_s.slice(6, 10)
        var errorStr_10 = parseInt(errorStr_16.toString(16), 16)
        var errorStr_2 = errorStr_10.toString(2)
        console.log(errorStr_16 + "=>" + errorStr_2)
        if (errorStr_10 > 0) {
          that.setData({hideErrorWarn: false, error_string: errorStr_2})
        }

        // 保养提醒
        var warnStr_16 = work_s.slice(10, 14)
        var warnStr_10 = parseInt(warnStr_16.toString(16), 16)
        var warnStr_2 = warnStr_10.toString(2)
        console.log(warnStr_16 + "=>" + warnStr_2)
        if (warnStr_10 > 0) {
          that.setData({hideMaintenance: false, warn_string: warnStr_2})
        }

        // 水位处理
        var waterStr_16 = work_s.slice(14, 16)
        var water_state = waterStr_16[1]
        if (water_state == 0) {
          that.setData({water_state: '../../image/water_zero.png', water_content: '低'})
        }else if (water_state == 1) {
          that.setData({water_state: '../../image/water_low.png', water_content: '低'})
        }else if (water_state == 2) {
          that.setData({water_state: '../../image/water_middle.png', water_content: '中'})
        }else if (water_state == 3) {
          that.setData({water_state: '../../image/water_high.png', water_content: '高'})
        }else if (water_state == 4) {
          that.setData({water_state: '../../image/water_high.png', water_content: '高'})
        }
      }
    }, function (err) {
      console.log(err)
      wx.showToast({
        title: '获取设备状态失败！',
        icon: 'none'
      })
    })
  },

  // 保养提醒
  waterWarning: function () {
    wx.navigateTo({
      url: '../waterWarning/waterWarning?warn_string=' + this.data.warn_string,
    })
  },

  // 故障提醒
  waterError: function () {
    let that = this
    wx.navigateTo({
      url: '../waterError/waterError?error_string=' + this.data.error_string,
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
      url: '../deviceLifes/deviceLifes?f_t=' + this.data.device_info.f_t,
    })
  },

   /**
   * 页面的初始数据
   */
  data: {
    username: wx.getStorageSync('username'),
    chip_id: '',
    fault:'',
    // 保养提醒
    hideMaintenance: true,
    // 故障提醒
    hideErrorWarn: true,
    // 温度
    temp: '温度：0℃ ',
    // 错误字符
    error_string: '',
    // 提醒字符
    warn_string:'',
    // 设备详情
    device_info: null,
    // 水位
    water_state: '../../image/water_middle.png',
    // 水位中文
    water_content: '中'
  }
})