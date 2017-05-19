import { FETCH_INFO_REQ, FETCH_INFO_SUC, FETCH_INFO_ERR, COMMIT_ID, TOGGLE_INFO_PAGE_DISPLAY, SHOW_REPLIES_PAGE, HIDE_REPLIES_PAGE, SHOW_COMMENT_BAR, HIDE_COMMENT_BAR, SEND_COMMENT_REQ, SEND_COMMENT_SUC, SEND_COMMENT_ERR } from '../constants/types'

export const infoMutations = {
    // ----- INFO
    FETCH_INFO_REQ(state) {
        state.isInfoFetching = true
    },
    FETCH_INFO_SUC(state, action) {
        state.isInfoFetching = false;
        state.infoData = action.data
    },
    FETCH_INFO_ERR(state, action) {
        state.isInfoFetching = false;
        state.error = action.error;
    },
    COMMIT_ID(state, action) {
        state.id = action.id;
        state.userid = action.userid
    },
    TOGGLE_INFO_PAGE_DISPLAY(state) {
        state.isInfoPageShow = !state.isInfoPageShow
    },
    // ----- REPLIES
    SHOW_REPLIES_PAGE(state) {
        state.isRepliesPageShow = true
    },
    HIDE_REPLIES_PAGE(state) {
        state.isRepliesPageShow = false
    },
    SHOW_COMMENT_BAR(state) {
        state.commentBarShow = true
    },
    HIDE_COMMENT_BAR(state) {
        state.commentBarShow = false
    },
    SEND_COMMENT_REQ(state) {
        state.isRepliesFetching = true
    },
    SEND_COMMENT_SUC(state) {
        state.isRepliesFetching = false
    },
    SEND_COMMENT_ERR(state) {
        state.isRepliesFetching = false
    }
}