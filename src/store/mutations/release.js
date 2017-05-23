import { SHOW_RELEASE_PAGE, HIDE_RELEASE_PAGE, FETCH_RELEASE_REQ, FETCH_RELEASE_SUC, FETCH_RELEASE_ERR } from '../constants/types'

export const releaseMutations = {
    SHOW_RELEASE_PAGE(state) {
        state.isReleasePageShow = true
    },
    HIDE_RELEASE_PAGE(state) {
        state.isReleasePageShow = false
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