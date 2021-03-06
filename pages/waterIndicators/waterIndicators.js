Page({

  /**
   * 页面的初始数据
   */
  data: {
    names: ['TDS', 'TOC', '浊度', 'COD', '余氯'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '水质指标',
    })
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

  /// 点击事件集合
  click_1: function () {
    console.log("点击了1")
    this.pushToDetail(0)
  },

  click_2: function () {
    console.log("点击了2")
    this.pushToDetail(1)
  },

  click_3: function () {
    console.log("点击了3")
    this.pushToDetail(2)
  },
  click_4: function () {
    console.log("点击了4")
    this.pushToDetail(3)
  }, 
  click_5: function () {
    console.log("点击了5")
    this.pushToDetail(4)
  },

  pushToDetail: function(index) {
    wx.navigateTo({
      url: '../../pages/charts/chart?title=' + this.data.names[index],
    })
  }

})