<template>
  <mu-paper>
    <mu-bottom-nav :value="common.bottomnav.active"
                   shift
                   @change="handleChange">
      <mu-bottom-nav-item value="topics"
                          titleClass="title"
                          iconClass="icon"
                          activeClass="active"
                          to="/topics/话题"
                          title="话题"
                          icon="whatshot" />
      <mu-bottom-nav-item value="message"
                          titleClass="title"
                          iconClass="icon"
                          activeClass="active"
                          to="/message/未读消息"
                          title="未读消息"
                          icon="drafts">
        <div class="message-count"
             v-if="HAS_NOT_READ_MESSAGES_COUNT > 0">{{HAS_NOT_READ_MESSAGES_COUNT}}</div>
      </mu-bottom-nav-item>
      <mu-bottom-nav-item value="user"
                          titleClass="title"
                          iconClass="icon"
                          activeClass="active"
                          to="/user/个人信息"
                          title="我的"
                          icon="face" />
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'common'
    ]),
    ...mapGetters([
      'HAS_NOT_READ_MESSAGES_COUNT'
    ])
  },
  methods: {
    handleChange (val) {
      this.$store.commit('HANDLE_CHANGE', val)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.mu-bottom-nav-shift {
  background: $Black !important;
  .mu-buttom-item {
    .mu-buttom-item-wrapper {
      .message-count {
        position: absolute;
        top: 6px;
        right: 32px;
        width: .32rem;
        height: .32rem;
        line-height: .32rem;
        text-align: center;
        border-radius: 100%;
        background: $red;
        font-size: .2rem;
        color: #fff;
      }
    }
  }
}
</style>
