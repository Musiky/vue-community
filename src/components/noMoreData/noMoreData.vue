<template>
  <div class="no-data">
    {{title}}
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '别扯了，已经到底啦～'
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/sass/_base.scss";
.no-data {
    position: relative;
    width: 100%;
    padding: .32rem 0;
    text-align: center;
    color: $Silver;
     &:before, &:after {
        display: block;
        content: '';
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        width: .72rem;
        height: 1px;
        background: $LightSilver;
    }
    &:before {
        left: 1.4rem;
    }
    &:after {
        right: 1.4rem;
    }
}
</style>
