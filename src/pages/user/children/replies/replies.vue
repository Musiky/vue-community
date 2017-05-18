<template>
  <div class="replies">
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
                    @info="tapToDetail"></content-item>
    </div>
    <!--content-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import contentItem from '../../../../components/contentItem/contentItem'
export default {
  computed: {
    ...mapState([
      'login'
    ]),
    ...mapGetters([
      'REPLIES_COUNT'
    ])
  },
  components: {
    contentItem
  },
  methods: {
    back () {
      this.$router.go(-1);
      this.$store.commit('TOGGLE_MAIN_OVERFLOW')
    },
    tapToDetail (info_id, user_id) {
      console.log(info_id + ',' + user_id)
    }
  }
}
</script>

<style lang="scss">
@import '../../../../assets/sass/_base.scss';
.replies {
  .mu-appbar {
    background: $primary !important;
  }
}
</style>
