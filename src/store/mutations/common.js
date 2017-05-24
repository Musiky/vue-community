import * as types from '../constants/types'

export const commonMutations = {
    // ----- refresh
    [types.SHOW_REFRESH](state) {
        state.refresh.isShow = true
    },
    [types.HIDE_REFRESH](state) {
        state.refresh.isShow = false
    },
    // ----- snackbar
    [types.SHOW_SNACK](state) {
        state.snack.isShow = true
    },
    [types.HIDE_SNACK](state) {
        state.snack.isShow = false
    },
    [types.DEFINE_SNACK_MSG](state, action) {
        state.snack.msg = action.msg
    },
    [types.DEFINE_SNACK_TYPE](state, action) {
        state.snack.isWarn = action.isWarn
    },
    [types.DEFINE_SNACK_POSITION](state, action) {
        state.snack.position = action.position
    },
    // ----- tip dialog
    [types.SHOW_TIP_DIALOG](state, action) {
        state.tipdialog.isShow = true;
        state.tipdialog.msg = action.msg
    },
    [types.HIDE_TIP_DIALOG](state) {
        state.tipdialog.isShow = false;
        state.tipdialog.msg = ''
    },
    // ----- bottom nav
    [types.HANDLE_CHANGE](state, action) {
        state.bottomnav.active = action
    },
    // ----- main overflow
    [types.SHOW_MAIN_OVERFLOW](state) {
        state.isHideMainOverflow = true
    },
    [types.HIDE_MAIN_OVERFLOW](state) {
        state.isHideMainOverflow = false
    }
}