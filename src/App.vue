<template>
  <div id="app">
    <!-- 使用动态的 transition name -->
    <transition :name="transitionName">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:()=>({
    token:false,
    transitionName:""
  }),
  // 接着在父组件内
  // watch $route 决定使用哪种过渡
  watch: {
    // '$route' (to, from) {
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    // }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
