<template>
  <div class="user">
    <!--Snackbar-->
    <mu-snackbar v-show="login.snackshow"
                 :class="{'snackbar-warn': login.snackwarn, 'snackbar-suc': !login.snackwarn}"
                 :message="login.snackmsg" />
    <!--snackbar-->

    <!--Progress-->
    <mainProgress v-show="login.isFetching"></mainProgress>
    <!--progress-->

    <!--Log In-->
    <mu-flexbox class="login"
                align="center"
                orient="vertical">
      <!--text field-->
      <mu-text-field icon="lock_outline"
                     hintText="accessToken"
                     v-model="accesstoken"
                     underlineFocusClass="line-focus" />
      <!--button-->
      <mu-raised-button label="登录"
                        :fullWidth="true"
                        backgroundColor="#41b883"
                        @click="tapToLogIn" />
    </mu-flexbox>
    <!--log in-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import mainProgress from '../../components/mainProgress/mainProgress'
export default {
  data () {
    return {
      // ----- accesstoken
      accesstoken: ''
    }
  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  components: {
    mainProgress
  },
  methods: {
    tapToLogIn () {
      if (!this.accesstoken) {
        this.showSnackbar('accesstoken 不能为空', true);
        return
      }
      this.$store.dispatch('fetchUserAction', {
        accesstoken: this.accesstoken
      });
    },
    // ----- snackbar
    showSnackbar (msg, isWarn) {
      this.$store.dispatch('showSnackbarAction', {
        msg,
        isWarn
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.user {
  .mu-snackbar {
    height: 56px;
    bottom: 56px;
  }
  .snackbar-warn {
    background: $orange !important;
  }
  .snackbar-suc {
    background: $primary !important;
  }
  .login {
    width: 70%;
    margin-top: .54rem;
    @include center-block;
  }
  .mu-text-field {
    &.focus-state {
      color: $primary !important;
    }
    .line-focus {
      background: $primary !important;
    }
  }
  .mu-raised-button {
    margin-top: .24rem;
  }
}
</style>
