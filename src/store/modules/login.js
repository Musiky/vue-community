import { loginActions } from '../actions/login'
import { loginMutations } from '../mutations/login'

const login = {
    state: {
        // ----- fetching
        isFetching: false,
        // ----- data
        data: {
            success: false
        },
        // snackbar
        snackshow: false,
        snackwarn: null,
        snackmsg: ''
    },
    mutations: loginMutations,
    actions: loginActions
}

export default login