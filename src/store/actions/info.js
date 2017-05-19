import { FETCH_INFO_REQ, FETCH_INFO_SUC, FETCH_INFO_ERR, COMMIT_ID, TOGGLE_INFO_PAGE_DISPLAY, SHOW_REPLIES_PAGE, HIDE_REPLIES_PAGE, SHOW_COMMENT_BAR, HIDE_COMMENT_BAR, SEND_COMMENT_REQ, SEND_COMMENT_SUC, SEND_COMMENT_ERR } from '../constants/types'
import axios from 'axios'

export const infoActions = {
    /**
     * 请求详情数据
     * @param {id} [String] topic id
     */
    fetchInfoAction({ commit, state }, params) {
        commit('FETCH_INFO_REQ');
        axios({
            method: 'get',
            url: 'topic/' + params.id
        }).then((res) => {
            let data = res.data.data;

            commit('FETCH_INFO_SUC', {
                data
            })
        }).catch((error) => {
            commit('FETCH_TOPICS_ERR', {
                error
            });
            console.log(error)
        })
    },
    /**
     * 发送评论请求
     * @param {topicid} [String]     当前话题的 id
     * @param {accesstoken} [String] 用户的登录 token
     * @param {content} [String]     评论内容
     * @param {reply_id} [String]    如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图
     */
    sendCommentAction({ commit, state, dispatch }, params) {
        commit('SEND_COMMENT_REQ');

        // 发送请求
        axios.post('topic/' + params.topicid + '/replies', {
            accesstoken: params.accesstoken,
            content: params.content
        }).then((res) => {
            commit('SEND_COMMENT_SUC');
            commit('HIDE_COMMENT_BAR');
            // 请求成功后，再次请求详情数据，刷新页面
            dispatch('fetchInfoAction', {
                id: params.topicid
            })
        }).catch((error) => {
            commit('SEND_COMMENT_ERR')
            console.log(error)
        })
    },
    /**
     * 发送点赞请求
     * 「接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。
     * 点赞的动作反应在返回数据的 action 字段中，up or down」
     * @param {replyid} [String]     该回复信息的 id
     * @param {topicid} [String]     该主题的 id
     * @param {accesstoken} [String] 用户的登录 token
     */
    toggleThumbAction({ commit, state, dispatch }, params) {
        axios.post('reply/' + params.replyid + '/ups', {
            accesstoken: params.accesstoken
        }).then((res) => {
            // 给自己的评论点赞，服务器会返回一段错误字符串
            alert(res.data.error_msg)
            // 请求成功后，再次请求详情数据，刷新页面
            dispatch('fetchInfoAction', {
                id: params.topicid
            })
        }).catch((errorr) => {
            alert(error)
        })
    }
}