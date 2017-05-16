import {FETCH_INFO_REQ, FETCH_INFO_SUC, FETCH_INFO_ERR} from '../constants/types'

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
    }
}