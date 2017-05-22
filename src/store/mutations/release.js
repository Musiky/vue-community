import { SHOW_RELEASE_PAGE, HIDE_RELEASE_PAGE, FETCH_RELEASE_REQ, FETCH_RELEASE_SUC, FETCH_RELEASE_ERR } from '../constants/types'

export const releaseMutations = {
    SHOW_RELEASE_PAGE(state) {
        state.isReleasePageShow = true
    },
    HIDE_RELEASE_PAGE(state) {
        state.isReleasePageShow = false
    },
    SHOW_DIALOG(state, action) {
        state.dialog.isShow = true;
        state.dialog.msg = action.msg
    },
    HIDE_DIALOG(state) {
        state.dialog.isShow = false;
        state.dialog.msg = ''
    },
    FETCH_RELEASE_REQ(state) {
        state.isReleaseFetching = true
    },
    FETCH_RELEASE_SUC(state) {
        state.isReleaseFetching = false
    },
    FETCH_RELEASE_ERR(state) {
        state.isReleaseFetching = false
    }    
}