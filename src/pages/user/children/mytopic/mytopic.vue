<template>
  <div class="mytopic">
    <!--Appbar-->
    <mu-appbar :title="this.$route.params.title + '(' + MY_TOPICS_COUNT + ')'">
      <mu-icon value="close"
               slot="left"
               @click.native="back"></mu-icon>
    </mu-appbar>
    <!--appbar-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'MY_TOPICS_COUNT'
    ])
  },
  methods: {
    back () {
      this.$router.go(-1);
      this.$store.commit('TOGGLE_MAIN_OVERFLOW')
    }
  }
}
</script>

<style lang="scss">
@import '../../../../assets/sass/_base.scss';
.mytopic {
  .mu-appbar {
    background: $primary !important;
  }
}
</style>
