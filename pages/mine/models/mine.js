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

  // 账户豆子数
  getBean(callback) {
    var params = {
      url: '/api/index/bean',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 去提现
  toWithdrawal(param, callback) {
    var params = {
      url: '/api/index/withdrawal',
      type: 'POST',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 账户明细
  beanDetails(callback) {
    var params = {
      url: '/api/index/detail',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 获取服务项目列表
  getServerList(callback) {
    var params = {
      url: '/api/index/classify',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

}
export {
  MineModel
}