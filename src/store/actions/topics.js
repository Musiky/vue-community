import { FETCH_TOPICS_REQ, FETCH_TOPICS_SUC, FETCH_TOPICS_ERR, CLEAR_STATE_DATA, TOGGLE_NO_MORE_DATA_STATE, TOGGLE_ERROR_DATA_STATE, TOGGLE_ISFETCHING_STATE } from '../constants/types'
import axios from 'axios'

export const topicsActions = {
    /**
     * 请求主题列表数据
     * @type  {get}
     * @param {tab} [String]   主题类型
     * @param {page} [Number]  分页
     * @param {limit} [Number] 每次请求获取数据个数
     */
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