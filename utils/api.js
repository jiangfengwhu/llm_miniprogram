const consts = require("./consts");
const FormData = require('../utils/formData')

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

function upload(path, file) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("overwrite", "true");
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${consts.serverUrl}${path}`,
      filePath: file.url,
      name: "image",
      formData,
      header: {
        "content-type": "multipart/form-data; boundary=XXX"
      },
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
