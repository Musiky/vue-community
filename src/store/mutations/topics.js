import * as types from '../constants/types'

export const topicsMutations = {
    [types.FETCH_TOPICS_REQ] (state) {
        state.isFetching = true
    },
    [types.FETCH_TOPICS_SUC] (state, action) {
        state.isFetching = false;
        state.data = action.data
    },
    [types.FETCH_TOPICS_ERR] (state, action) {
        state.isFetching = false;
        state.error = action.error;
    },
    // 清除 state 的数据
    // ===============
    [types.CLEAR_STATE_DATA] (state) {
        state.data = [];
    },
    // 切换 '没有数据' 状态
    // =================
    [types.TOGGLE_NO_MORE_DATA_STATE] (state) {
        state.noMoreData = !state.noMoreData
    },
    // 切换 '报错' 状态
    // ==============
    [types.TOGGLE_ERROR_DATA_STATE] (state) {
        state.errData = !state.errData
    },
    // 切换 isFetching 状态
    // ===================
    [types.TOGGLE_ISFETCHING_STATE] (state) {
        state.isFetching = !state.isFetching
    }
}