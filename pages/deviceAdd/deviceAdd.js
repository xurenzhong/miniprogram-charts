import http from '../../libs/httputils.js'

Page({
  onShareAppMessage: res => {
    return {}
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    this.data.chip_id = options.chip_id
    console.log("Current_chipId:"+options.chip_id)
  },

  data: {
    chip_id: ""
  }
})