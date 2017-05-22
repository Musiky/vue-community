import { FETCH_MSG_REQ, FETCH_MSG_SUC, FETCH_MSG_ERR, CLEAR_MSG_DATA, FETCH_MARK_ALL_REQ, FETCH_MARK_ALL_SUC, FETCH_MARK_ALL_ERR } from '../constants/types'
import axios from 'axios'

export const messageActions = {
    /**
     * 获取已读和未读信息
     * @type  {get}
     * @param {accesstoken} [String] 
     */
    fetchMessageAction({ commit, state, dispatch }, params) {
        commit('FETCH_MSG_REQ');
        axios({
            method: 'get',
            url: 'messages',
            params: {
                accesstoken: params.accesstoken
            }
        }).then((res) => {
            commit('FETCH_MSG_SUC', {
                data: res.data.data
            })
        }).catch((error) => {
            commit('FETCH_MSG_ERR', {
                error
            })
            console.log(error);
        })
    },
    /**
     * 标记全部已读
     * @type  {post}
     * @param {accesstoken} [Strting]
     */
    fetchMarkAllAction({ commit, state, dispatch }, params) {
        commit('FETCH_MARK_ALL_REQ');
        axios.post('message/mark_all', {
            accesstoken: params.accesstoken
        }).then((res) => {
            commit('FETCH_MARK_ALL_SUC');

            // 刷新数据
            dispatch('fetchMessageAction', {
                accesstoken: params.accesstoken
            });

            // 显示 snackbar
            return dispatch('showSnackbarAction', {
                msg: '全部标记成功',
                isWarn: false
            });
        }).catch((error) => {
            commit('FETCH_MARK_ALL_ERR');
            console.log(error);
            return dispatch('showSnackbarAction', {
                msg: '请求错误，请检查网络',
                isWarn: true
            })
        })
    }
}