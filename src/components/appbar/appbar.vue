<template>
  <mu-appbar :zDepth="0">
    <!--logo-->
    <div class="logo">
      <img src="../../assets/images/logo.png"
           alt="">
    </div>
    <mu-flat-button label="发布"
                    slot="right"
                    @click="tapToRelease"></mu-flat-button>
  </mu-appbar>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    title: {
      type: String
    }
  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  methods: {
    ...mapMutations([
      'SHOW_RELEASE_PAGE',
      'HIDE_RELEASE_PAGE',
      'SHOW_MAIN_OVERFLOW'
    ]),
    // 点击进入发布页
    // ============
    tapToRelease () {
      if (!this.login.data.success) {
        this.$router.replace({ name: 'user' });
        this.$store.commit('HANDLE_CHANGE', 'user');

        // 显示提示
        this.$store.dispatch('showSnackbarAction', {
          msg: '请先登录',
          isWarn: true
        })
      } else {
        this.SHOW_RELEASE_PAGE();
        this.SHOW_MAIN_OVERFLOW();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/_base.scss';
.mu-appbar {
  position: relative;
  background: $primary !important;
  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
