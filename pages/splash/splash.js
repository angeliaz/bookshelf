// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    loading: true
  },

  getCache () {
    return new Promise(resolve => {
      app.wechat.getStorage('last_splash_data')
        .then(res => {
          const { movies, expires } = res.data
          // 有缓存，判断是否过期
          if (movies && expires > Date.now()) {
            return resolve(res.data.slice(index, index + 1));
          }
          // 已经过期
          console.log('uncached')
          return resolve(null)
        })
        .catch(e => resolve(null))
    })
  },

  handleStart () {
    wx.switchTab({ url: "../finance/finance" });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getCache()
      .then(cache => {
        const index = Math.floor(Math.random() * 3);
        console.log(index)
        if (cache) {
          console.log(index)
          return this.setData({ movies: cache.movie.slice(index, index + 1), loading: false })
        }

        app.douban
          .find("in_theaters", 1, 3)
          .then(d => {
            const movies = d.subjects;
            this.setData({
              movies: movies.slice(index, index + 1),
              loading: false
            });
            return app.wechat.setStorage("last_splash_data", {
              movies: movies,
              expires: Date.now() + 0.5 * 24 * 60 * 60 * 1000
            });
          })
          .then(() => console.log("storage last splash data"));
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
