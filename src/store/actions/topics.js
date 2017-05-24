import * as types from '../constants/types'
import axios from 'axios'

export const topicsActions = {
    /**
     * 请求主题列表数据
     * @type  {get}
     * @param {tab} [String]        主题类型
     * @param {page} [Number]       分页
     * @param {limit} [Number]      每次请求获取数据个数
     * @param {isRefresh} [Boolean] 请求是否是刷新请求，默认 false
     */
    fetchTopicsAction({ commit, state }, params) {
        let isRefresh = params.isRefresh || false;

        if (!isRefresh) {
            commit(types.FETCH_TOPICS_REQ);
        } else {
            commit(types.SHOW_REFRESH);
        };

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

            commit(types.HIDE_REFRESH);

            if (data.length > 0) {
                commit(types.FETCH_TOPICS_SUC, {
                    data: arr
                })
            } else {
                commit(types.TOGGLE_NO_MORE_DATA_STATE);
                commit(types.TOGGLE_ISFETCHING_STATE);
            }
        }).catch((error) => {
            commit(types.TOGGLE_ERROR_DATA_STATE);
            commit(types.FETCH_TOPICS_ERR, {
                error
            });
            console.log(error)
        })
    }
}