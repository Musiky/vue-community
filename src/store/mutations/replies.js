import {SHOW_REPLIES_PAGE, HIDE_REPLIES_PAGE, SHOW_COMMENT_BAR, HIDE_COMMENT_BAR, SEND_COMMENT_REQ, SEND_COMMENT_SUC, SEND_COMMENT_ERR} from '../constants/types'

export const repliesMutations = {
    SHOW_REPLIES_PAGE(state) {
        state.isShow = true
    },
    HIDE_REPLIES_PAGE(state) {
        state.isShow = false
    },
    SHOW_COMMENT_BAR(state) {
        state.commentBarShow = true
    },
    HIDE_COMMENT_BAR(state) {
        state.commentBarShow = false
    },
    SEND_COMMENT_REQ(state) {
        state.isFetching = true
    },
    SEND_COMMENT_SUC(state) {
        state.isFetching = false
    },
    SEND_COMMENT_ERR(state) {
        state.isFetching = false
    }
}