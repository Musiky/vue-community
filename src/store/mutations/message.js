import * as types from '../constants/types'

export const messageMutations = {
    [types.FETCH_MSG_REQ](state) {
        state.isFetching = true
    },
    [types.FETCH_MSG_SUC](state, action) {
        state.data = action.data;
        state.isFetching = false;
    },
    [types.FETCH_MSG_ERR](state, action) {
        state.error = action.error;
        state.isFetching = false;
    },
    [types.CLEAR_MSG_DATA](state) {
        state.data = {
            has_read_messages: [],
            hasnot_read_messages: []
        }
    },
    [types.FETCH_MARK_ALL_REQ](state) {
        state.isMarkAllFetching = true;
    },
    [types.FETCH_MARK_ALL_SUC](state) {
        state.isMarkAllFetching = false;        
    },
    [types.FETCH_MARK_ALL_ERR](state) {
        state.isMarkAllFetching = false;
    }
}