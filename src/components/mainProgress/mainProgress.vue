<template>
    <div class="progress-wrapper">
        <mu-circular-progress :size="size"
                              :color="color" />
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 30
        },
        color: {
            type: String,
            default: '#41b883'
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.progress-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: $LoadingIndex;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 4px;
    background: rgba(255, 255, 255, .54);
    .mu-circular-progress {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
}
</style>
