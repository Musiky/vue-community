<template>
    <mu-dialog :open="common.tipdialog.isShow"
               title="提示">
        {{common.tipdialog.msg}}
        <mu-flat-button label="确定"
                        slot="actions"
                        primary
                        @click="close" />
    </mu-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState([
            'common'
        ])
    },
    methods: {
        ...mapMutations([
            'HIDE_TIP_DIALOG'
        ]),
        close () {
            this.HIDE_TIP_DIALOG()
        }
    }
}
</script>

<style lang="scss"></style>
