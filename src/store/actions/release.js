import { SHOW_RELEASE_PAGE, HIDE_RELEASE_PAGE, FETCH_RELEASE_REQ, FETCH_RELEASE_SUC, FETCH_RELEASE_ERR, SHOW_DIALOG, HIDE_DIALOG } from '../constants/types'
import axios from 'axios'
export const releaseActions = {
    /**
     * 发送发布主题请求
     * @type  {post}
     * @param {accesstoken} [String]
     * @param {title} [String]   主题标题 
     * @param {tab} [String]     主题分类，目前有 ask share job
     * @param {content} [String] 主体内容
     * @param {SucMsg} [String]  发布成功提示
     * @param {ErrMsg} [String]  发布失败提示
     */
    fetchReleaseAction({ commit, state, dispatch }, params) {
        commit('FETCH_RELEASE_REQ');
        axios.post('topics', {
            accesstoken: params.accesstoken,
            title: params.title,
            tab: params.tab,
            content: params.content
        }).then((res) => {
            commit('FETCH_RELEASE_SUC');
            dispatch('dialogShow', {
                msg: params.SucMsg
            });
        }).catch((error) => {
            commit('FETCH_RELEASE_ERR');
            commit('HIDE_DIALOG');
            dispatch('dialogShow', {
                msg: params.ErrMsg
            });
        })
    },
    /**
     * 显示提示框
     * @param {msg} [String] 提示文字     
     */
    dialogShow({ commit, state, dispatch }, params) {
        commit('SHOW_DIALOG', {
            msg: params.msg
        })
    }
}