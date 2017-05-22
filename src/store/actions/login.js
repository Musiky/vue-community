import { FETCH_USER_REQ, FETCH_USER_SUC, FETCH_USER_ERR, TOGGLE_SNACK_SHOW, TOGGLE_SNACK_STATE, DEFINE_SNACK_MSG, COMMIT_USERINFO } from '../constants/types'
import { setCookie, getCookie, delCookie } from '../../assets/js/cookies'
import axios from 'axios'

export const loginActions = {
    /**
     * 用户登录请求
     * @type  {post}
     * @param {accesstoken} [String] 用户登录token
     */
    fetchUserAction({ commit, state, dispatch }, params) {
        commit('FETCH_USER_REQ');
        axios({
            method: 'post',
            url: 'accesstoken',
            params: {
                accesstoken: params.accesstoken
            }
        }).then((res) => {
            // 显示登录成功提示     
            dispatch('showSnackbarAction', {
                msg: '登录成功',
                isWarn: false
            });

            // 将 accesstoken 缓存在 cookie 中
            setCookie('accesstoken', params.accesstoken);

            // 提交获取的数据
            commit('FETCH_USER_SUC', {
                data: res.data
            });

            // 请求用户详情数据
            dispatch('fetchUserInfoAcrion', {
                loginname: res.data.loginname
            });

            // 获取未读信息
            return dispatch('fetchMessageAction', {
                accesstoken: params.accesstoken
            })
        }).catch((error) => {
            dispatch('showSnackbarAction', {
                msg: '登录失败，请检查网络或accesstoken是否正确',
                isWarn: true
            });
            commit('FETCH_USER_ERR', {
                error
            });
            console.log(error)
        })
    },
    /**
     * 请求用户详情数据
     * @type  {get}
     * @param {loginname} [String] 用户名 
     */
    fetchUserInfoAcrion({ commit, state }, params) {
        axios({
            method: 'get',
            url: 'user/' + params.loginname
        }).then((res) => {
            commit('COMMIT_USERINFO', {
                data: res.data.data
            })
        })
    },
    /**
     * 显示 snackbar 的方法
     * @param {msg} [String]     snackbar 显示的文字信息
     * @param {isWarn} [Boolean] 是否背景色为警告色
     */
    showSnackbarAction({ commit, state }, params) {
        commit('TOGGLE_SNACK_SHOW', true); // 显示 snack
        commit('DEFINE_SNACK_MSG', {       // 定义文字
            msg: params.msg
        });
        commit('TOGGLE_SNACK_STATE', params.isWarn);  // 定义 snack 背景样式

        setTimeout(() => {
            commit('TOGGLE_SNACK_SHOW', false)
        }, 2000);
    }
}