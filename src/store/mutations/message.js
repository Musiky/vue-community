import { FETCH_MSG_REQ, FETCH_MSG_SUC, FETCH_MSG_ERR, CLEAR_MSG_DATA, FETCH_MARK_ALL_REQ, FETCH_MARK_ALL_SUC, FETCH_MARK_ALL_ERR } from '../constants/types'

export const messageMutations = {
    FETCH_MSG_REQ(state) {
        state.isFetching = true
    },
    FETCH_MSG_SUC(state, action) {
        state.data = action.data;
        state.isFetching = false;
    },
    FETCH_MSG_ERR(state, action) {
        state.error = action.error;
        state.isFetching = false;
    },
    CLEAR_MSG_DATA(state) {
        state.data = {
            has_read_messages: [],
            hasnot_read_messages: []
        }
    },
    FETCH_MARK_ALL_REQ(state) {
        state.isMarkAllFetching = true;
    },
    FETCH_MARK_ALL_SUC(state) {
        state.isMarkAllFetching = false;        
    },
    FETCH_MARK_ALL_ERR(state) {
        state.isMarkAllFetching = false;
    }
}