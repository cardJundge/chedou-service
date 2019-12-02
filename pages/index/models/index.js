import {
  HTTP
} from '../../../utils/http.js'

class IndexModel extends HTTP {

  // 获取系统所有模块
  getAllModule(callback) {
    var params = {
      url: '/api/auth/modules',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 设置关联模块
  setSelfModule(module, callback) {
    var params = {
      url: '/api/ser/index/setModule',
      type: 'POST',
      auth: true,
      data: {
        module: module
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 首页数据统计
  dataStatistics(callback) {
    var params = {
      url: '/api/ser/work/total',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 获取业务列表
  getWorkList(key, page, callback) {
    var params = {
      url: '/api/ser/work/lists',
      type: 'GET',
      auth: true,
      data: {
        key: key,
        page: page
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 获取订单列表
  getOrderList(callback) {
    var params = {
      url: '/api/ser/order/lists',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 获取订单详情
  getOrderDetails(param, callback) {
    var params = {
      url: '/api/ser/order/info',
      type: 'GET',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 订单分类列表
  orderClassify(callback) {
    var params = {
      url: '/api/auth/classify',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 业务详情
  getBusinessDetail(key, id, type, callback) {
    var params = {
      url: '/api/ser/work/info',
      type: 'GET',
      auth: true,
      data: {
        key: key,
        id: id,
        type: type
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 获取任务记录
  getRecordList(param, callback) {
    var params = {
      url: '/api/sick/task/'+ param.id + '/record',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 评价二维码生成
  // generateQrCode(id, callback) {
  //   var params = {
  //     url: '/api/ser/work/QRCode',
  //     type: 'GET',
  //     auth: true,
  //     data: {
  //       id: id
  //     },
  //     sCallback: callback
  //   }
  //   this.request(params)
  // }

  // 获取保险公司
  getInsurance(callback) {
    var params = {
      url: '/api/auth/insurance',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 增加业务
  addBusiness(param, callback) {  
    var params = {
      url: '/api/ser/work/increase',
      type: 'POST',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 编辑业务
  editBusiness(param, callback) {
    var params = {
      url: '/api/ser/work/edit',
      type: 'POST',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 业务---》接单
  businessReceipt(id, key, callback) {
    var params = {
      url: '/api/ser/work/accept',
      type: 'GET',
      auth: true,
      data: {
        id: id,
        key: key
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 分配作业员
  assignmentTask(param, callback) {
    var params = {
      url: '/api/ser/work/allot',
      type: 'POST',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 到达现场
  toScene(param, callback) {
    var params = {
      url: '/api/ser/work/arrive',
      type: 'GET',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 完成结案
  finishCase(param, callback) {
    var params = {
      url: '/api/ser/work/finish',
      type: 'POST',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 查勘定损---》添加明细
  addDetailed(param, callback) {
    var params = {
      url: '/api/ser/work/schedule',
      type: 'POST',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 删除业务
  delBusiness(param, callback) {
    var params = {
      url: '/api/ser/work/remove',
      type: 'GET',
      auth: true,
      data: param,
      sCallback: callback
    }
    this.request(params)
  }

  // 疾病调查相关资料
  getSicknessData(param, callback) {
    var params = {
      url: '/api/sick/' + param.listId + '/data',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }
}
export {
  IndexModel
}