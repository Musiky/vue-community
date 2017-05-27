<template>
  <div id="app">
    <!--Appbar-->
    <appbar :title="this.$route.params.title"></appbar>
    <!--appbar-->
  
    <!--Release-->
    <transition enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown">
      <releasePage v-show="release.isReleasePageShow"></releasePage>
    </transition>
    <!--release-->
  
    <!--Router View-->
    <router-view class="main"
                 :class="{'hide-overflow': common.isHideMainOverflow}"></router-view>
    <!--router view-->
  
    <!--ButtomNav-->
    <bottomnav></bottomnav>
    <!--buttomnav-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import appbar from './components/appbar/appbar'
import bottomnav from './components/bottomnav/bottomnav'
import releasePage from './components/releasePage/releasePage'
export default {
  computed: {
    ...mapState([
      'common',
      'release'
    ])
  },
  components: {
    appbar,
    bottomnav,
    releasePage
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
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .hide-overflow {
    overflow: hidden;
  }
}
</style>
