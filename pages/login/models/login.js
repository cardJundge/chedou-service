import {
  HTTP
} from '../../../utils/http.js'

class LoginModel extends HTTP {

  getSms(mobile, callback) {
    var params = {
      url: '/api/auth/sms',
      type: 'GET',
      data: {
        mobile: mobile
      },
      sCallback: callback
    }
    this.request(params)
  }

  postVerify(mobile, code, callback) {
    var params = {
      url: '/api/auth/verify',
      type: 'POST',
      data: {
        mobile: mobile,
        code: code
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 注册
  postRegister(params, callback) {
    var params = {
      url: '/api/auth/register',
      type: 'POST',
      data: {
        mobile: params.phone,
        password: params.password,
        repeat_password: params.rePassword,
        code: params.code,
        type: params.companyType,
        name: params.company
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 登录
  postLogin(params, callback) {
    var params = {
      url: '/api/auth/login',
      type: 'POST',
      data: {
        mobile: params.phone,
        password: params.password
      },
      sCallback: callback
    }
    this.request(params)
  }
}
export {
  LoginModel
}