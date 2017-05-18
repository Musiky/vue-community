import {SHOW_REPLIES_PAGE, HIDE_REPLIES_PAGE, SHOW_COMMENT_BAR, HIDE_COMMENT_BAR, SEND_COMMENT_REQ, SEND_COMMENT_SUC, SEND_COMMENT_ERR} from '../constants/types'
import axios from 'axios'

export const repliesActions = {
    /**
     * 发送评论请求
     * @param {topicid} [String]     当前话题的 id
     * @param {accesstoken} [String] 用户的登录 token
     * @param {content} [String]     评论内容
     * @param {reply_id} [String]    如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图
     */
    sendCommentAction ({commit, state, dispatch}, params) {
        commit('SEND_COMMENT_REQ');
        
        // 发送请求
        axios.post('topic/' + params.topicid + '/replies', {
            accesstoken: params.accesstoken,
         content: params.content
        }).then((res) => {
            commit('SEND_COMMENT_SUC');
            commit('HIDE_COMMENT_BAR');            
            console.log(res)
        }).catch((error) => {
            commit('SEND_COMMENT_ERR')
            console.log(error)
        })
    }
}