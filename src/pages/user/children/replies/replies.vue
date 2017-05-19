<template>
  <mu-flexbox orient="vertical" class="replies">
    <!--Info Page-->
    <transition enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown">
      <infoPage v-show="info.isInfoPageShow"
                :isNestPage="true"></infoPage>
    </transition>
    <!--info page-->
  
    <!--Appbar-->
    <mu-appbar :title="this.$route.params.title + '(' + REPLIES_COUNT + ')'">
      <mu-icon value="close"
               slot="left"
               @click.native="back"></mu-icon>
    </mu-appbar>
    <!--appbar-->
  
    <!--Content-->
    <div class="content-wrapper">
      <content-item v-for="list in login.userinfo.recent_replies"
                    :list="list"
                    :simple="true"
                    @info="tapToInfo"></content-item>
    </div>
    <!--content-->
  </mu-flexbox>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import infoPage from '../../../../components/infoPage/infoPage'
import contentItem from '../../../../components/contentItem/contentItem'
export default {
  computed: {
    ...mapState([
      'login',
      'info'
    ]),
    ...mapGetters([
      'REPLIES_COUNT'
    ])
  },
  components: {
    infoPage,
    contentItem
  },
  methods: {
    ...mapMutations([
      'HIDE_MAIN_OVERFLOW',
      'TOGGLE_INFO_PAGE_DISPLAY'
    ]),
    back () {
      this.$router.go(-1);
      this.$store.commit('HIDE_MAIN_OVERFLOW')
    },
    // 跳转详情页
    // ========
    tapToInfo (id, userid) {
      this.TOGGLE_INFO_PAGE_DISPLAY();
      this.$store.commit('COMMIT_ID', {
        id, userid
      });
      // 请求数据放在了父级元素；
      // 因为不是 router 模式，子元素在没有获得 id 的情况下，就执行了 created
      this.$store.dispatch('fetchInfoAction', {
        id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/sass/_base.scss';
.replies {
  width: 100%;
  height: 100%;
  .mu-appbar {
    background: $primary !important;
  }
  .content-wrapper {
    flex: 1;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
