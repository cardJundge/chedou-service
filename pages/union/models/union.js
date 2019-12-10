import {
  HTTP
} from '../../../utils/http.js'

class UnionModel extends HTTP {

  // 创建联盟
  createUnion(param, callback) {
    var params = {
      url: '/api/ser/league/store',
      type: 'POST',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 联盟列表
  getUnionList(callback) {
    var params = {
      url: '/api/ser/league/list',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 申请加入联盟
  joinUnion(param, callback) {
    var params = {
      url: '/api/ser/league/apply',
      type: 'POST',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 我的联盟
  myUnionList(callback) {
    var params = {
      url: '/api/ser/league/myLeague',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }
}
export {
  UnionModel
}