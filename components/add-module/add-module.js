// 添加模块
import {
  IndexModel
} from '../../pages/index/models/index.js'
var indexModel = new IndexModel()

Component({
  properties: {
    isShow: {
      type: Boolean
    },
    module: {
      type: Array
    }
  },
  data: {
    moduleItem: ''
    // moduleArray: [
    //   { name: '查勘定损', img: '/images/index/chakan.png', selected: true },
    //   { name: '车辆维修', img: '/images/index/weixiu.png', selected: true },
    //   { name: '拖车', img: '/images/index/tuoche.png', selected: false },
    //   { name: '紧急救援', img: '/images/index/jiuyuan.png', selected: false },
    //   { name: '调查', img: '/images/index/diaocha.png', selected: false },
    //   { name: '人伤', img: '/images/index/renshang.png', selected: false }
    // ]
  },
  methods: {
    onConfirm() {
      
      indexModel.setSelfModule(this.data.moduleItem, res=> {
        if(res.data.status == 1) {

        }
        this.setData({
          isShow: false
        })
      })
    },
    selectModule(e) {
      console.log(e)
      let string = "module[" + e.currentTarget.dataset.index + "].selected"
      console.log(string)
      this.setData({
        [string]: !this.data.module[e.currentTarget.dataset.index].selected
      })
      let detailValue = this.data.module.filter(it => it.selected).map(it => it.id)
      console.log('所有选中的值为：', detailValue)
      this.data.moduleItem = ''
      detailValue.map((item, index) => {
        if (index == 0) {
          this.data.moduleItem = this.data.moduleItem.concat(item)
        } else {
          this.data.moduleItem = this.data.moduleItem.concat(',' + item)
        }
        console.log(this.data.moduleItem)
      })
    },

    toCloseModule() {
      this.setData({
        isShow: false
      })
    }
  }
})
