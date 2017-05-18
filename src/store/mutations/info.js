import {FETCH_INFO_REQ, FETCH_INFO_SUC, FETCH_INFO_ERR, COMMIT_ID, TOGGLE_INFO_PAGE_DISPLAY} from '../constants/types'

export const infoMutations = {
    FETCH_INFO_REQ (state) {
        state.isFetching = true
    },
    FETCH_INFO_SUC (state, action) {
        state.isFetching = false;
        state.data = action.data
    },
    FETCH_INFO_ERR (state, action) {
        state.isFetching = false;
        state.error = action.error;
    },
    COMMIT_ID (state, action) {
        state.id = action.id;
        state.userid = action.userid
    },
    TOGGLE_INFO_PAGE_DISPLAY (state) {
        state.isShow = !state.isShow
    }
}