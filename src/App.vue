<template>
  <div id="app">
    <!--Appbar-->
    <appbar :title="this.$route.params.title"></appbar>
    <!--appbar-->

    <router-view class="main"></router-view>

    <!--ButtomNav-->
    <bottomnav></bottomnav>
    <!--buttomnav-->
  </div>
</template>

<script>
import appbar from './components/appbar/appbar'
import bottomnav from './components/bottomnav/bottomnav'
export default {
  components: {
    appbar,
    bottomnav
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
