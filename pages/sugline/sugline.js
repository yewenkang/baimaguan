// pages/sugline/sugline.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: ['https://www.snaildocs.com/base/video/xianlu01.jpg', 'https://www.snaildocs.com/base/video/xianlu02.jpg']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getLocation({
      success: function(res) {
        let lat1 = that.toRadians(31.2804)
        let lat2 = that.toRadians(res.latitude)
        let lat3 = lat1 - lat2
        let lon = that.toRadians(104.47081) - that.toRadians(res.longitude)
        let dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(lat3 / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(lon / 2), 2))) * 6378137;
        that.setData({
          juli:(dis/1000 - 3).toFixed(1)
        })
      },
    })
  },
  toRadians: function (e) { return e * Math.PI / 180; },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imglist // 需要预览的图片http链接列表  
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
  
  }
})