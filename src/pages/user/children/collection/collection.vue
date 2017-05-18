<template>
    <div class="collection">
        <!--Appbar-->
        <mu-appbar :title="this.$route.params.title + '(' + COLLECTS_COUNT + ')'">
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
            'COLLECTS_COUNT'
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
.collection {
    .mu-appbar {
        background: $primary !important;
    }
}
</style>
