<template>
  <mu-appbar :zDepth="0">
    <!--logo-->
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="">
    </div>
    <mu-flat-button label="发布" slot="right"></mu-flat-button>
  </mu-appbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/_base.scss';
.mu-appbar {
  position: relative;
  background: $Black !important;
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
