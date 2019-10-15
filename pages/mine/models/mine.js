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

}
export {
  MineModel
}