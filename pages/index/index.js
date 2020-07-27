var http = require('../../libs/httputils.js')

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Blue Gull',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    this.checkStorage()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 检查缓存
  checkStorage: function () {

    // test
    // wx.setStorageSync('username', 'test')

    let that = this
    // 检查本地key是否过期
    var sessionKey = wx.getStorageSync("session_key")
    console.log("缓存sessionKey:" + sessionKey)
    if (sessionKey) {
      wx.checkSession({
        success() {
          //session_key 未过期，并且在本生命周期一直有效
          console.log("Seesion_key还未过期")
          that.checkUsername()
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          console.log("Seesion_key已过期,重新登录！")
          that.wxLogin() //重新登录
        }
      })
    } else {
      that.wxGetUserInfo()
    }
  },

  checkUsername: function () {
    var username = wx.getStorageSync('username')
    var openid = wx.getStorageSync('openid')
    if (username) {
      console.log("跳转设备列表："+ username)
      wx.navigateTo({
        url: '../devices/devices?username=' + username,
      })
    } else {
      console.log("微信openid："+ openid)
      wx.navigateTo({
        url: '../bindPhone/bindPhone?openid=' + openid,
      })
    }
  },

  wxGetUserInfo: function () {
    let that = this
    // 获取用户信息
    console.log("检查配置，是否已经授权")
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              // 授权完成，进行登录
              that.wxLogin()

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: res => {

      }
    })
  },

  wxLogin: function () {
    let that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId。并缓存
        console.log("微信CODE：" + res.code);
        var params = {
          wxcode: res.code
        }
        // 发起请求
        http.getRequest(app.globalData.root + "/programs/wxLoginServlet", params, function (res) {
          wx.setStorageSync('session_key', res.session_key)
          if (res.openid) {
            wx.setStorageSync('openid', res.openid)
          }
          if (res.username) {
            wx.setStorageSync('username', res.username)
          } else { // 当手机号不存在的时候进行绑定
            that.checkUsername()
          }
          console.log("注册成功")
        }, function (err) {
          console.log("注册失败：" + err)
          wx.clearStorageSync()
        })
      },
      fail: res => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },
  //手机号码绑定
  bindPhone: function () {
    wx.navigateTo({
      url: '../bindPhone/bindPhone',
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳转设备列表页
  clickMe: function () {
    wx.navigateTo({
      url: '../devices/devices'
    })
  },
})