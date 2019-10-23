import {
  HTTP
} from '../../../utils/http.js'

class MineModel extends HTTP {

  // 退出登录
  logout(callback) {
    var params = {
      url: '/api/index/logout',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 修改信息
  modifyInfo(face, name, callback) {
    var params = {
      url: '/api/index/modify',
      type: 'POST',
      auth: true,
      data: {
        face: face,
        name: name
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 绑定微信
  bindWx(params, callback) {
    var params = {
      url: '/api/index/bind',
      type: 'POST',
      auth: true,
      data: {
        js_code: params.js_code,
        type: params.type
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 解绑
  unTying(callback) {
    var params = {
      url: '/api/index/unbind',
      type: 'POST',
      auth: true,
      data: {
        type: 'chedou'
      },
      sCallback: callback
    }
    this.request(params)
  }

}
export {
  MineModel
}