const consts = require("./consts");

let AuthToken = "";
function post(path, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${consts.serverUrl}${path}`,
      data,
      header: { Bearer: AuthToken },
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
      header: { Bearer: AuthToken },
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
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${consts.serverUrl}${path}`,
      filePath: file.url,
      name: "image",
      formData: {
        overwrite: true,
      },
      header: {
        "content-type": "multipart/form-data; boundary=XXX",
        Bearer: AuthToken,
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
function updateToken(token) {
  AuthToken = token;
}
module.exports = {
  post,
  get,
  upload,
  updateToken
};
