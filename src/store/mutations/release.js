import * as types from '../constants/types'

export const releaseMutations = {
    [types.SHOW_RELEASE_PAGE](state) {
        state.isReleasePageShow = true
    },
    [types.HIDE_RELEASE_PAGE](state) {
        state.isReleasePageShow = false
    },    
    [types.FETCH_RELEASE_REQ](state) {
        state.isReleaseFetching = true
    },
    [types.FETCH_RELEASE_SUC](state) {
        state.isReleaseFetching = false
    },
    [types.FETCH_RELEASE_ERR](state) {
        state.isReleaseFetching = false
    }    
}