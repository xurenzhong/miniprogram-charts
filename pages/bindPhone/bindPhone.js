var http = require('../../libs/httputils.js')

//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 验证手机号
    loginPhone: false,
    loginPwd: false,
    loveChange: true,
    hongyzphone: '',
    // 验证码是否正确
    zhengLove: true,
    huoLove: '',
    getText2: '获取验证码',
    openid: '',
    realCode: '',
    showOk: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '关联账号',
    })
    console.log(options)
    if (options.openid) {
      console.log("微信openid：" + options.openid)
      this.data.openid = options.openid
    }
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
    wx.hideHomeButton({
      success: function() {},
    })
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
  // 手机验证
  lovePhone: function (e) {
    let phone = e.detail.value;
    this.setData({
      hongyzphone: phone
    })
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.setData({
        lovePhone: false
      })
      console.log(phone.length)
      if (phone.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 1000
        })
      }
    } else {
      this.setData({
        lovePhone: true

      })
    }
  },
  // 验证码输入
  yanLoveInput: function (e) {
    let that = this;
    let yanLove = e.detail.value;
    let huoLove = this.data.huoLove;
    that.setData({
      yanLove: yanLove,
      zhengLove: false,
    })
    if (yanLove.length == 6) {
      // if (yanLove == huoLove) {
      that.setData({
        zhengLove: true,
        showOk: true,
      })
      // } else {

      // wx.showModal({
      //   content: '输入验证码有误',
      //   showCancel: false,
      //   success: function (res) { }
      // })
      // }
    }else{
      that.setData({showOk: false})
    }

  },
  // 验证码按钮
  yanLoveBtn: function () {
    let loveChange = this.data.loveChange;
    console.log(loveChange)
    let lovePhone = this.data.lovePhone;
    console.log(lovePhone)
    let phone = this.data.hongyzphone;
    console.log(phone)
    let n = 59;
    let that = this;
    if (!lovePhone) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 1500
      })
    } else {
      if (loveChange) {
        this.setData({
          loveChange: false
        })
        let lovetime = setInterval(function () {
          let str = '(' + n + ')' + '重新获取'
          that.setData({
            getText2: str
          })
          if (n <= 0) {
            that.setData({
              loveChange: true,
              getText2: '重新获取'
            })
            clearInterval(lovetime);
          }
          n--;
        }, 1000);

        //获取验证码接口写在这里
        var params = {
          telnum: phone
        }
        http.getRequest(app.globalData.root + "/programs/verificationCodeServlet", params, function (res) {
          if (res) {
            console.log(res)
            that.setData({realCode: String(res)});
          }
        }, function (err) {
          console.log(err)
        })
      }
    }
  },
  //form表单提交
  formSubmit(e) {
    let that = this
    let val = e.detail.value
    console.log('val', val)
    var phone = val.phone //电话
    var phoneCode = val.phoneCode //验证码
    var realCode = that.data.realCode
    var openid = that.data.openid
    // 比对后台和输入的验证
    if (String(phoneCode) !==  String(realCode)) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
    } else {
      var params = {
        username: phone,
        password: phone,
        code: phoneCode,
        openid: openid
      }
      // 开始绑定手机号
      http.getRequest(app.globalData.root + "/programs/registerServlet", params, function (res) {
        console.log(res)
        if (res === '0000') {
          wx.setStorageSync('username', that.data.hongyzphone)
          wx.showToast({
            title: '绑定手机成功',
          })
          wx.redirectTo({
            url: '../devices/devices?username=' + username,
          })
        } else {
          wx.showToast({
            title: '绑定手机失败,请重试',
            duration: 3000,
            icon: 'none'
          })
        }
      }, function (err) {
        console.log(err)
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      })
    }
  }
})