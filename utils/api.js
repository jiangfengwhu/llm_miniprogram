const consts = require("./consts");

function post(path, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${consts.serverUrl}${path}`,
      data,
      method: "POST",
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        resolve({ code: -1, err });
      },
    });
  });
}

function get(path, query) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${consts.serverUrl}${path}`,
      data: query,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        resolve({ code: -1, err });
      },
    });
  });
}

function upload(url, filepath, formData) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      filePath,
      name: "file",
      formData,
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        resolve({ code: -1, err });
      },
    });
  });
}

module.exports = {
  post,
  get,
  upload,
};
