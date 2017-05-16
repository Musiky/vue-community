import { FETCH_TOPICS_REQ, FETCH_TOPICS_SUC, FETCH_TOPICS_ERR, CLEAR_STATE_DATA, TOGGLE_NO_MORE_DATA_STATE, TOGGLE_ERROR_DATA_STATE, TOGGLE_ISFETCHING_STATE } from '../constants/types'

export const topicsMutations = {
    FETCH_TOPICS_REQ (state) {
        state.isFetching = true
    },
    FETCH_TOPICS_SUC (state, action) {
        state.isFetching = false;
        state.data = action.data
    },
    FETCH_TOPICS_ERR (state, action) {
        state.isFetching = false;
        state.error = action.error;
    },
    // 清除 state 的数据
    // ===============
    CLEAR_STATE_DATA (state) {
        state.data = [];
    },
    // 切换 '没有数据' 状态
    // =================
    TOGGLE_NO_MORE_DATA_STATE (state) {
        state.noMoreData = !state.noMoreData
    },
    // 切换 '报错' 状态
    // ==============
    TOGGLE_ERROR_DATA_STATE (state) {
        state.errData = !state.errData
    },
    // 切换 isFetching 状态
    // ===================
    TOGGLE_ISFETCHING_STATE (state) {
        state.isFetching = !state.isFetching
    }
}