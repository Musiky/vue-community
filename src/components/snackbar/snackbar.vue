<template>
  <!--Snackbar-->
  <mu-snackbar :class="{'snackbar-warn': common.snack.isWarn, 'snackbar-suc': !common.snack.isWarn}"
               :style="{bottom: common.snack.position}"
               :message="common.snack.msg" />
  <!--snackbar-->
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState([
      'common'
    ])
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.mu-snackbar {
  height: 56px;
}

.snackbar-warn {
  background: $orange !important;
}

.snackbar-suc {
  background: $primary !important;
}
</style>
