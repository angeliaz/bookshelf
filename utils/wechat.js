function login() {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject });
  });
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      openIdList: [
        "selfOpenId",
        "ownAP0b9qt6AzvYOSWOX8VX8KMq0",
        "ownAP0QJHIN2w3X60EUsj2Vah5Ig",
        "ownAP0f8ANWUCcloXN1oZPfxtz0g"
      ],
      lang: "zh_CN",
      success: resolve,
      fail: reject
    });
  });
}

function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({ key: key, data: value, success: resolve, fail: reject });
  });
}

function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({ key: key, success: resolve, fail: reject });
  });
}

function getLocation(type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({ type: type, success: resolve, fail: reject });
  });
}

module.exports = {
  login,
  getUserInfo,
  setStorage,
  getStorage,
  getLocation,
  original: wx
};
