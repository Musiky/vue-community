import { loginActions } from '../actions/login'
import { loginMutations } from '../mutations/login'
import { loginGetters } from '../getters/login'

const login = {
    state: {
        // ----- fetching
        isFetching: false,
        // ----- data
        data: {
            success: false
        },
        userinfo: {},
        // snackbar
        snackshow: false,
        snackwarn: null,
        snackmsg: ''
    },
    mutations: loginMutations,
    getters: loginGetters,
    actions: loginActions
}

export default login