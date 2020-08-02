Page({

  /**
   * 页面的初始数据
   */
  data: {
    f_t: '',
    ft_array: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '滤料滤芯寿命',
    })
    console.log(options.f_t)
    var f_t = options.f_t
    this.setData({f_t: f_t})

    // 开始做数据分割
    var temp_array = []
    var sys_16 = f_t.slice(2, 18)
    var hst_16 = f_t.slice(18, 34)
    var rhsz_16 = f_t.slice(34, 50)
    var zsy_16 = f_t.slice(50, 66)
    var jmlx_16 = f_t.slice(66, 82)
    var rom_16 = f_t.slice(82, 98)
    var uvd_16 = f_t.slice(98, 114)

    temp_array.push(sys_16)
    temp_array.push(hst_16)
    temp_array.push(rhsz_16)
    temp_array.push(zsy_16)
    temp_array.push(jmlx_16)
    temp_array.push(rom_16)
    temp_array.push(uvd_16)

    this.setData({ft_array: temp_array})

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

  click_0: function () {
    wx.navigateTo({
      url: '../../pages/deviceLifeShow/deviceLifeShow?data_string=' + this.data.ft_array[0] + '&title=' + '石英砂',
    })
    // wx.navigateTo({
    //   url: '../../pages/canvasDemo/canvasDemo',
    // })
  },


  click_1: function () {
    wx.navigateTo({
      url: '../../pages/deviceLifeShow/deviceLifeShow?data_string=' + this.data.ft_array[1] + '&title=' + '活性炭',
    })
  },


  click_2: function () {
    wx.navigateTo({
      url: '../../pages/deviceLifeShow/deviceLifeShow?data_string=' + this.data.ft_array[2] + '&title=' + '软化树脂',
    })
  },


  click_3: function () {
    wx.navigateTo({
      url: '../../pages/deviceLifeShow/deviceLifeShow?data_string=' + this.data.ft_array[3] + '&title=' + '再生盐',
    })
  },


  click_4: function () {
    wx.navigateTo({
      url: '../../pages/deviceLifeShow/deviceLifeShow?data_string=' + this.data.ft_array[4] + '&title=' + '精密滤芯',
    })
  },


  click_5: function () {
    wx.navigateTo({
      url: '../../pages/deviceLifeShow/deviceLifeShow?data_string=' + this.data.ft_array[5] + '&title=' + 'RO膜',
    })
  },


  click_6: function () {
    wx.navigateTo({
      url: '../../pages/deviceLifeShow/deviceLifeShow?data_string=' + this.data.ft_array[6] + '&title=' + 'UV灯',
    })
  },
})