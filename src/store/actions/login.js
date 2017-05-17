import { FETCH_USER_REQ, FETCH_USER_SUC, FETCH_USER_ERR, TOGGLE_SNACK_SHOW, TOGGLE_SNACK_STATE, DEFINE_SNACK_MSG } from '../constants/types'
import { setCookie, getCookie, delCookie } from '../../assets/js/cookies'
import axios from 'axios'

export const loginActions = {
    fetchUserAction({ commit, state, dispatch }, params) {
        commit('FETCH_USER_REQ');
        axios({
            method: 'post',
            url: 'accesstoken',
            params: {
                accesstoken: params.accesstoken
            }
        }).then((res) => {
            dispatch('showSnackbarAction', {
                msg: '登录成功',
                isWarn: false
            })
            commit('FETCH_USER_SUC', {
                data: res.data
            })
        }).catch((error) => {
            dispatch('showSnackbarAction', {
                msg: '登录失败，请检查网络或accesstoken是否正确',
                isWarn: true
            })
            commit('FETCH_USER_ERR', {
                error
            });
            console.log(error)
        })
    },
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