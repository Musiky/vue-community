import { FETCH_INFO_REQ, FETCH_INFO_SUC, FETCH_INFO_ERR } from '../constants/types'
import axios from 'axios'

export const infoActions = {
    // 请求详情数据
    // ==========
    fetchInfoAction({ commit, state }, params) {
        commit('FETCH_INFO_REQ');
        axios({
            method: 'get',
            url: 'topic/' + params.id
        }).then((res) => {
            let data = res.data.data;
            // 转换时间
            let time = new Date(data.last_reply_at),
                year = time.getFullYear(),
                month = time.getMonth() + 1,
                date = time.getDate(),
                hours = time.getHours(),
                minutes = time.getMinutes();
            
            data.last_reply_at = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;

            commit('FETCH_INFO_SUC', {
                data
            })
        }).catch((error) => {
            commit('FETCH_TOPICS_ERR', {
                error
            });
            console.log(error)
        })
    }
}