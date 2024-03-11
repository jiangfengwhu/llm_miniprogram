const serverUrl =
  wx.getAccountInfoSync().miniProgram.envVersion === "develop"
    ? "http://120.46.72.66"
    : "https://";

module.exports = {
  serverUrl,
};
