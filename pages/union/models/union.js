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
  getUnionList(param, callback) {
    var params = {
      url: '/api/ser/league/list',
      type: 'GET',
      auth: true,
      data: param,
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

  // 获取联盟成员列表
  getMemberList(param, callback) {
    var params = {
      url: '/api/ser/league/' + param + '/user',
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