import * as types from '../constants/types'

export const infoMutations = {
    // ----- info
    [types.FETCH_INFO_REQ](state) {
        state.isInfoFetching = true
    },
    [types.FETCH_INFO_SUC](state, action) {
        state.isInfoFetching = false;
        state.infoData = action.data
    },
    [types.FETCH_INFO_ERR](state, action) {
        state.isInfoFetching = false;
        state.error = action.error;
    },
    [types.COMMIT_ID](state, action) {
        state.id = action.id;
        state.userid = action.userid
    },
    [types.TOGGLE_INFO_PAGE_DISPLAY](state) {
        state.isInfoPageShow = !state.isInfoPageShow
    },
    // clear data
    [types.CLEAR_INFO_DATA](state) {
        state.infoData = {
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
    // ----- replies
    [types.SHOW_REPLIES_PAGE](state) {
        state.isRepliesPageShow = true
    },
    [types.HIDE_REPLIES_PAGE](state) {
        state.isRepliesPageShow = false
    },
    [types.SHOW_COMMENT_BAR](state) {
        state.commentBarShow = true
    },
    [types.HIDE_COMMENT_BAR](state) {
        state.commentBarShow = false
    },
    [types.SEND_COMMENT_REQ](state) {
        state.isRepliesFetching = true
    },
    [types.SEND_COMMENT_SUC](state) {
        state.isRepliesFetching = false
    },
    [types.SEND_COMMENT_ERR](state) {
        state.isRepliesFetching = false
    },
    // collect
    [types.SUC_COLLECT](state) {
        state.isCollected = true
    },
    [types.DEL_COLLECTED](state) {
        state.isCollected = false
    }
}