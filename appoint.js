// pages/appoint/appoint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alls: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectList()
  },
  collect: function (res) {
    this.onLoad();
    console.log(res.currentTarget.dataset.index)
    //写入数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/delete.php',
      method: 'GET',
      data: {
        class1: 'appoint_stall',
        class2: res.currentTarget.dataset.index,
        class3: 'aid'
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.status == 0) {
          wx.showToast({
            title: '删除失败！！！',
            icon: 'loading',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '删除成功！！！', //这里打印出登录成功
            icon: 'success',
            duration: 1000
          })
        }
      }
    });
  },

  getCollectList() {
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity.php',
      method: 'GET',
      data: {
        class: 'appoint_stall'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          alls: res.data,
        });
      },
    });
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
    this.getCollectList()
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

  }
})