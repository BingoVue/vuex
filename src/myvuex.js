let Vue

class Store {
  constructor(options){
    // this.state是Vue实例，访问this.state.count
    this.state = new Vue({data: options.state})
    this.mutations = options.mutations
    this.actions = options.actions

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    options.getters && this.handleGetters(options.getters)
  }

  commit(type, args){
    this.mutations[type](this.state, args)
  }

  dispatch(type, args){
    this.actions[type](this, args)
  }

  handleGetters(getters){
    this.getters = {}
    Object.keys(getters).forEach(key=>{
      Object.defineProperty(this.getters, key, {
        get: ()=>{
          return getters[key](this.state)
        }
      })
    })
  }
}

// 实现Vue插件第一步
// _Vue是形参：Vue构造函数，use会把它传进来
function install(_Vue){
  Vue = _Vue
  Vue.mixin({
    beforeCreate(){
      console.log(this)
      // 只有root元素才有store，所以判断一下，this指向组件实例
      if(this.$options.store){
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {Store, install}