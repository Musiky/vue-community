import { repliesMutations } from '../mutations/replies'
import { repliesActions } from '../actions/replies'

const replies = {
    state: {
        isFetching: false,
        isShow: false,
        commentBarShow: false,
        data: {
            author: {
                avatar_url: '',
                loginname: ''
            },
            content: "",
            create_at: "",
            id: "",
            ups: []
        }
    },
    mutations: repliesMutations,
    actions: repliesActions
}

export default replies