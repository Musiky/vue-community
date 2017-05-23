import { commonMutations } from '../mutations/common.js'
import { commonActions } from '../actions/common.js'

const common = {
    state: {
        // ----- refresh
        refresh: {
            isShow: false
        },
        // ----- snackbar
        snack: {
            isShow: false,
            isWarn: null,
            msg: '',
            position: ''
        },
        // ----- tip dialog
        tipdialog: {
            isShow: false,
            msg: ''
        },
        // ----- bottom nav
        bottomnav: {
            active: 'topics'
        },
        // ----- main overflow
        isHideMainOverflow: false
    },
    mutations: commonMutations,
    actions: commonActions
}

export default common