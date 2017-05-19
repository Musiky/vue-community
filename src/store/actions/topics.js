import { FETCH_TOPICS_REQ, FETCH_TOPICS_SUC, FETCH_TOPICS_ERR, CLEAR_STATE_DATA, TOGGLE_NO_MORE_DATA_STATE, TOGGLE_ERROR_DATA_STATE, TOGGLE_ISFETCHING_STATE } from '../constants/types'
import axios from 'axios'

export const topicsActions = {
    // 请求 topics 数据
    fetchTopicsAction({ commit, state }, params) {
        commit('FETCH_TOPICS_REQ');
        axios({
            method: 'get',
            url: 'topics',
            params: {
                tab: params.tab,
                page: params.page,
                limit: params.limit
            }
        }).then((res) => {
            let data = res.data.data,
                origin = state.data,
                arr = [];

            // 累加数组
            arr = origin.concat(data);

            if (data.length > 0) {
                commit('FETCH_TOPICS_SUC', {
                    data: arr
                })
            } else {
                commit('TOGGLE_NO_MORE_DATA_STATE');
                commit('TOGGLE_ISFETCHING_STATE');
            }
        }).catch((error) => {
            commit('TOGGLE_ERROR_DATA_STATE');
            commit('FETCH_TOPICS_ERR', {
                error
            });
            console.log(error)
        })
    }
}