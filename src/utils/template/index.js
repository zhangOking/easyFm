/**
 * Vue辅助函数
 */
import Vue from 'vue'
import template from './apptemplate'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

// Vue辅助函数
const easyFm = {}

// 版本信息
easyFm.version = Number(Vue.version.split('.')[0])

// 模板处理
easyFm.$compile = function (template, options) {
    return _.template(template)(options)
}

easyFm.$assign = function (basic, options) {
    return _.mergeWith(basic, options, function (a, b) {
        if (_.isArray(a)) {
            return a.concat(b)
        }
    })
}

easyFm.creatApp = function (options = {}) {
    let basic = {

        template,

        data() {
            return {
                isCollapse: false,
                mainList: [],
                leftList: [],
                mainListStatus: '/',
                crumbList: []
            }
        },
        computed: {
            ...mapState(['updateUserInfo'])
        },
        methods: {
            handleSelect(index) {
                let pathArr = index.split('/').slice(1, index.split('/').length).map(ele => '/' + ele)
                let newArr = [];
                let _arr = [];
                let oldArr = this.mainList
                // 扁平化权限列表
                function getArr(arr) {
                    arr.forEach(ele => {
                        if (ele.children.length > 0) {
                            newArr.push(ele)
                            getArr(ele.children)
                        } else {
                            newArr.push(ele)
                        }
                    })
                    return newArr
                }
                getArr(oldArr)
                for (let i = 0; i < pathArr.length; i++) {
                    let _str = ''
                    for (let j = 0; j <= i; j++) {
                        _str += pathArr[j]
                    }
                    _arr.push(_str)
                }
                this.crumbList = _arr.map(ele => {
                    return newArr.find(item => {
                        if (ele === item.path) {
                            return item.name
                        }
                    }).name
                })
            }
        },
        mounted() {
            this.mainListStatus = this.$route.path
            this.mainList = this.updateUserInfo.app_menu
            for (const key in this.mainList) {
                if (this.mainList[key].path == this.mainListStatus) {
                    this.leftList = this.mainList[key].children
                }
            }
        }
    }

    return easyFm.$assign(basic, options)

}


export default easyFm
