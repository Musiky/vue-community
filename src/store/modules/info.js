import { infoMutations } from '../mutations/info'
import { infoActions } from '../actions/info'

const info = {
    state: {
        // ----- 详情页
        isInfoFetching: false,
        isInfoPageShow: false,
        id: '',
        userid: '',
        error: '',
        infoData: {
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
        },
        // ----- 评论页
        isRepliesFetching: false,
        isRepliesPageShow: false,
        commentBarShow: false,
        repliesData: {
            author: {
                avatar_url: '',
                loginname: ''
            },
            content: "",
            create_at: "",
            id: "",
            ups: []
        },
        // ----- 收藏功能
        isCollected: false
    },
    mutations: infoMutations,
    actions: infoActions
}

export default info