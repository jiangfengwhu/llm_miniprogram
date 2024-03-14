// const serverUrl =
//   wx.getAccountInfoSync().miniProgram.envVersion === "develop"
//     ? "http://120.46.72.66"
//     : "https://";

const serverUrl = "https://gate.fbyron.cn"

const serverApi = {
  login: '/gapi/login_wx',
  userInfo: '/gapi/wx/user_info',
  home: '/gapi/home',
  gallery: '/gapi/wx/my_gallery',
  upload: '/com/upload/image',
  queuePrompt: '/gapi/wx/queue_prompt'
}

const resuseUrl = 'https://gate.fbyron.cn/com/res/home/'
const myResourceUrl = 'https://gate.fbyron.cn/com/res/'


module.exports = {
  serverUrl,
  serverApi,
  resuseUrl,
  myResourceUrl
};
