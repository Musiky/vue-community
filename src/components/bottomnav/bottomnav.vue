<template>
  <mu-paper>
    <mu-bottom-nav :value="bottomNav"
                   shift
                   @change="handleChange">
      <mu-bottom-nav-item value="topics"
                          to="/topics/话题"
                          title="话题"
                          icon="whatshot" />
      <mu-bottom-nav-item value="message"
                          to="/message/未读消息"
                          title="未读消息"
                          icon="drafts" />
      <mu-bottom-nav-item value="user"
                          to="/user/个人信息"
                          title="我的"
                          icon="face" />
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'topics'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.mu-bottom-nav-shift {
  background: $Black !important;
}
</style>
