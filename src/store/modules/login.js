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
        userinfo: {
            avatar_url: '',
            collect_topics: [],
            create_at: '',
            loginname: '',
            recent_replies: [],
            recent_topics: [],
            score: 0
        }
    },
    mutations: loginMutations,
    getters: loginGetters,
    actions: loginActions
}

export default login