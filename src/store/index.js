/*
 * @FilePath: index.js
 * @Author: Vivian L_qirui@163.com
 * @Date: 2023-02-18 14:53:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-18 19:37:02
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 * @Descripttion: 
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 该指令必须在 store 创建之前执行
Vue.use(Vuex);

// Actions(行动): 处理交互行为
// Actions 类似Mutation 不同点在于Actions提交的是mutations，不是直接改变状态 
// Actions可以包含任意异步操作
const actions = {
  // Actions函数接受一个与store实例相同的context对象 
  // 可以调用context.commit提交Mutation  context.state context.getter获取
  // 可以解构 如果要用的提交的mutation比较多
  changeM({ commit }, value) {
    commit('changeName', value)
  },
  // context: 简化版的 store；    value: 发送过来的数据
  changeDispatch(context, value) {
    console.log("actions", context, value);
    // 将数据 commit 给 mutations
    // 设置 2 个实参: commit 中的方法名 & 发送的数据
    context.commit("changeCommit", value);

  },
  async actionA({ commit }, getData) {
    commit('gotData', await getData())
  },
  async actionB({ dispatch, commit }, getOtherData) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
};


// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'//看可以用常量代替mutation事件类型
// Mutation必须是同步函数  混入异步函数会导致程序很难调试 又Action来专门处理异步问题
// Mutations(变化): 修改 state 中的数据
const mutations = {
  // state: 存储的数据；    value: 发送的数据
  [SOME_MUTATION](state, value) {
    console.log("mutations", state, value);
    // 修改 state 中存储的数据
    state.name = value;
    // 修改后，页面会重新渲染
  },
  changeName(state, value) {
    state.name = value
  }
};

// State: 用于存储数据
const state = { name: "superman" };

// function myGetters(state, getters) {
//   var state = state
//   var getters = getters
//   return {
//     afterchangename: () => {
//       return state.name.slice(-3)
//     },
//     Langname: () => {
//       return getters.afterchangename + '-' + state.name
//     }
//   }
// }

const moduleA = {
  namespaced: true,
  // 模块的局部状态
  state: () => ({
  }),
  mutations: {
    login() { } // -> commit('a/login')
  },
  actions: {
    // 若需要在全局命名空间内分发 action 或提交 mutation，
    // 将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
    fn({ state, commit, dispatch, rootState }) {//rootState是根节点状态context.rootState
      dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
    },
    login() { },// -> dispatch('a/login')
    // 若需要在带命名空间的模块注册全局 action，你可添加 root: true，
    // 并将这个 action 的定义放在函数 handler 中。例如：
    logingloble() {
      root: true
    }
  },
  getters: {
    fn(state, getter, rootState) {// -> getters['a/fn']
    }
  },
  // 嵌套模块
  modules: {
    // 继承父模块的命名空间
    myPage: {
      state: () => ({}),
      getters: {
        profile() { } // -> getters['a/profile']
      }
    },

    // 进一步嵌套命名空间
    posts: {
      namespaced: true,

      state: () => ({}),
      getters: {
        popular() { } // -> getters['a/posts/popular']
      }
    }
  }
}
// 启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit。
// 换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。
// 更改 namespaced 属性后不需要修改模块内的代码

const moduleB = {
  state: () => ({
  }),
  mutations: {
  },
  actions: {
  }
}





// 创建并导出 store
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters: {
    afterchangename: state => {
      return state.name.slice(-3)
    },
    Langname: (state, getters) => (id) => { //注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。 (state,getters)=>(参数)=>
      return getters.afterchangename + '-' + state.name + id
    }
  },
  // 使用单一状态树臃肿  为解决以上问题 vuex允许我们将store分割成块
  // 每个模块拥有自己的state gatters mutations actions 甚至嵌套子模块---从上至下同样方式分割
  modules: {
    a: moduleA,
    b: moduleB
  }
  // store.state.a//moduleA的状态
  // store.state.b//moduleB的状态
});
export default store;

// 注册模块 `myModule`
store.registerModule('myModule', {
  namespaced: true,
  state: () => ({
  }),
  mutations: {
  },
  actions: {
  }
})
// 注册嵌套模块 `myModule/nested`
store.registerModule(['myModule', 'nested'], {
  namespaced: true,
  // ...
})
// 在注册一个新 module 时，你很有可能想保留过去的 state，
// store.registerModule('a', module, { preserveState: true })
// 有时我们可能需要创建一个模块的多个实例
// 因此解决办法也是相同的——使用一个函数来声明模块状态
const MyReusableModule = {
  state: () => ({
    foo: 'bar'
  }),
  // mutation, action 和 getter 等等...
}