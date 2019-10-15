import {
  HTTP
} from '../../../utils/http.js'

class IndexModel extends HTTP {

  // 获取系统所有模块
  getAllModule(callback) {
    var params = {
      url: '/api/index/module',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 设置关联模块
  setSelfModule(module, callback) {
    var params = {
      url: '/api/index/setModule',
      type: 'POST',
      auth: true,
      data: {
        module: module
      },
      sCallback: callback
    }
    this.request(params)
  }

}
export {
  IndexModel
}