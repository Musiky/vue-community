import * as types from '../constants/types'

export const commonActions = {    
    /**
     * 显示 snackbar 的方法
     * @param {msg} [String]      snackbar 显示的文字信息
     * @param {isWarn} [Boolean]  是否背景色为警告色
     * @param {position} [String] snackbar 底部的距离
     */
    showSnackbarAction({ commit, state }, params) {
        let isWarn = params.isWarn || false,
            position = params.position || '56px';

        commit(types.SHOW_SNACK);              // 显示 snack
        commit(types.DEFINE_SNACK_MSG, {       // 定义文字
            msg: params.msg
        });

        // 定义 snack 背景样式
        commit(types.DEFINE_SNACK_TYPE, {
            isWarn
        });

        // 定义位置
        commit(types.DEFINE_SNACK_POSITION, {
            position
        })  

        // 2s 后隐藏 snackbar
        setTimeout(() => {
            commit(types.HIDE_SNACK)
        }, 2000);
    }
}