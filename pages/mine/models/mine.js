import {
  HTTP
} from '../../../utils/http.js'

class MineModel extends HTTP {

  // 退出登录
  logout(callback) {
    var params = {
      url: '/api/ser/index/logout',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 修改信息
  modifyInfo(face, name, callback) {
    var params = {
      url: '/api/ser/index/modify',
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
      url: '/api/ser/index/bind',
      type: 'POST',
      auth: true,
      data: {
        js_code: params.js_code,
        type: params.type,
        key: params.key
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 解绑
  unTying(param, callback) {
    var params = {
      url: '/api/ser/index/unbind',
      type: 'POST',
      auth: true,
      data: {
        type: param.type,
        key: param.key
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 账户豆子数
  getBean(callback) {
    var params = {
      url: '/api/ser/index/bean',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 去提现
  toWithdrawal(param, callback) {
    var params = {
      url: '/api/ser/index/withdrawal',
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
      url: '/api/ser/index/detail',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 获取服务项目列表
  getprojectList(callback) {
    var params = {
      url: '/api/auth/classify',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // ------商铺-------------------------》》》》
  // 是否有商铺
  haveShops(callback) {
    var params = {
      url: '/api/ser/shop/isHave',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 去支付
  toPay(param, callback) {
    var params = {
      url: '/api/pull/pay',
      type: 'POST',
      data: param,
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 开通商铺
  openShops(param, callback) {
    var params = {
      url: '/api/ser/shop/open',
      type: 'POST',
      data: param,
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 商铺详情
  shopsDetails(callback) {
    var params = {
      url: '/api/ser/shop/info',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 新增、修改商铺
  operationShops(param, callback) {
    var params = {
      url: '/api/ser/shop/update',
      type: 'POST',
      data: param,
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 添加分类
  


}
export {
  MineModel
}