import { infoMutations } from '../mutations/info'
import { infoActions } from '../actions/info'

const info = {
    state: {
        isFetching: false,
        isShow: false,
        id: '',
        userid: '',
        error: '',
        data: {
            good: null,
            id: '',
            author: {
                avatar_url: '',
                loginname: ''
            },
            content: '',
            create_at: '',
            author_id: '',
            last_reply_at: '',
            replies: [],
            reply_count: 0,
            tab: '',
            title: '',
            top: null,
            visit_count: 0
        }
    },
    mutations: infoMutations,
    actions: infoActions
}

export default info