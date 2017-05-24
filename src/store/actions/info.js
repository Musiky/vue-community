import * as types from '../constants/types'
import axios from 'axios'

export const infoActions = {
    /**
     * 请求详情数据
     * @param {topicid} [String] topic id
     */
    fetchInfoAction({ commit, state }, params) {
        commit(types.FETCH_INFO_REQ);
        axios({
            method: 'get',
            url: 'topic/' + params.topicid
        }).then((res) => {
            let data = res.data.data;

            commit(types.FETCH_INFO_SUC, {
                data
            })
        }).catch((error) => {
            commit(types.FETCH_TOPICS_ERR, {
                error
            });
            console.log(error)
        })
    },
    /**
     * 发送评论请求
     * @type  {post}
     * @param {topicid} [String]     当前话题的 id
     * @param {accesstoken} [String] 用户的登录 token
     * @param {content} [String]     评论内容
     * @param {reply_id} [String]    如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图
     */
    sendCommentAction({ commit, state, dispatch }, params) {
        commit(types.SEND_COMMENT_REQ);

        // 发送请求
        axios.post('topic/' + params.topicid + '/replies', {
            accesstoken: params.accesstoken,
            content: params.content
        }).then((res) => {
            commit(types.SEND_COMMENT_SUC);
            commit(types.HIDE_COMMENT_BAR);
            // 请求成功后，再次请求详情数据，刷新页面
            dispatch('fetchInfoAction', {
                topicid: params.topicid
            })
        }).catch((error) => {
            commit(types.SEND_COMMENT_ERR)
            console.log(error)
        })
    },
    /**
     * 发送点赞请求
     * 「接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。
     * 点赞的动作反应在返回数据的 action 字段中，up or down」
     * @type  {post}
     * @param {replyid} [String]     该回复信息的 id
     * @param {topicid} [String]     该主题的 id
     * @param {accesstoken} [String] 用户的登录 token
     */
    toggleThumbAction({ commit, state, dispatch }, params) {
        axios.post('reply/' + params.replyid + '/ups', {
            accesstoken: params.accesstoken
        }).then((res) => {
            // 给自己的评论点赞，服务器会返回一段错误字符串
            if (res.data.error_msg) {
                alert(res.data.error_msg)
            }
            // 请求成功后，再次请求详情数据，刷新页面
            dispatch('fetchInfoAction', {
                topicid: params.topicid
            })
        }).catch((errorr) => {
            alert(error)
        })
    },
    /**
     * 收藏主题
     * @type  {post}
     * @param {accesstoken} [String] 用户登录 token 
     * @param {topic_id} [String]    被收藏的主题 id
     * @param {loginname} [String]      用户 id
     */
    collectTopic({ commit, state, dispatch }, params) {
        axios.post('topic/collect', {
            accesstoken: params.accesstoken,
            topic_id: params.topicid
        }).then((res) => {
            if (res.data.success) {
                commit(types.SUC_COLLECT);
                dispatch('fetchUserInfoAcrion', {
                    loginname: params.loginname
                })
            }
        })
    },
    /**
     * 取消收藏主题
     * @type  {post}
     * @param {accesstoken} [String] 用户登录 token 
     * @param {topic_id} [String]    被取消收藏的主题 id
     * @param {loginname} [String]      用户 id
     */
    delCollectedTopic({ commit, state, dispatch }, params) {
        axios.post('topic/de_collect', {
            accesstoken: params.accesstoken,
            topic_id: params.topicid
        }).then((res) => {
            if (res.data.success) {
                commit(types.DEL_COLLECTED);
                return dispatch('fetchUserInfoAcrion', {
                    loginname: params.loginname
                })
            }
        })
    }
}