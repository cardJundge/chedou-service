import {
  HTTP
} from '../../../utils/http.js'

class PersonnelModel extends HTTP {

  // 获取作业员列表
  getTaskList(keywords, callback) {
    var params = {
      url: '/api/user/task',
      type: 'GET',
      auth: true,
      data: {
        keywords: keywords
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 添加人员
  addTask(params, callback) {
    var params = {
      url: '/api/user/increase',
      type: 'POST',
      auth: true,
      data: {
        nickname: params.nickName,
        mobile: params.mobile,
        job_no: params.jobNo,
        password: params.password,
        module: params.module,
        type: params.type,
        group_id: params.groupId,
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 获取分组
  getGroupList(callback) {
    var params = {
      url: '/api/user/group',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 编辑人员
  editTask(params, callback) {
    var params = {
      url: '/api/user/store',
      type: 'POST',
      auth: true,
      data: {
        nickname: params.nickName,
        mobile: params.mobile,
        job_no: params.jobNo,
        password: params.password,
        module: params.module,
        type: params.type,
        group_id: params.groupId,
        id: params.id
      },
      sCallback: callback
    }
    this.request(params)
  }

  // 删除作业员
  delTask(id, callback) {
    var params = {
      url: '/api/user/remove/' + id,
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

  // 获取服务商拥有的模块
  getModule(callback) {
    var params = {
      url: '/api/user/module',
      type: 'GET',
      auth: true,
      sCallback: callback
    }
    this.request(params)
  }

}
export {
  PersonnelModel
}