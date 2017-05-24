import * as types from '../constants/types'
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
        commit(types.FETCH_RELEASE_REQ);
        axios.post('topics', {
            accesstoken: params.accesstoken,
            title: params.title,
            tab: params.tab,
            content: params.content
        }).then((res) => {
            commit(types.FETCH_RELEASE_SUC);
            commit(types.SHOW_TIP_DIALOG, {
                msg: params.SucMsg
            })
        }).catch((error) => {
            commit(types.FETCH_RELEASE_ERR);
            commit(types.SHOW_TIP_DIALOG, {
                msg: params.ErrMsg
            })
        })
    }
}