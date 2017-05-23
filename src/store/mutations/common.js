import { SHOW_REFRESH, HIDE_REFRESH } from '../constants/types'

export const commonMutations = {
    // ----- refresh
    SHOW_REFRESH(state) {
        state.refresh.isShow = true
    },
    HIDE_REFRESH(state) {
        state.refresh.isShow = false
    },
    // ----- snackbar
    SHOW_SNACK(state) {
        state.snack.isShow = true
    },
    HIDE_SNACK(state) {
        state.snack.isShow = false
    },
    DEFINE_SNACK_MSG(state, action) {
        state.snack.msg = action.msg
    },
    DEFINE_SNACK_TYPE(state, action) {
        state.snack.isWarn = action.isWarn
    },
    DEFINE_SNACK_POSITION(state, action) {
        state.snack.position = action.position
    },
    // ----- tip dialog
    SHOW_TIP_DIALOG(state, action) {
        state.tipdialog.isShow = true;
        state.tipdialog.msg = action.msg
    },
    HIDE_TIP_DIALOG(state) {
        state.tipdialog.isShow = false;
        state.tipdialog.msg = ''
    },
    // ----- bottom nav
    HANDLE_CHANGE(state, action) {
        state.bottomnav.active = action
    },
    // ----- main overflow
    SHOW_MAIN_OVERFLOW(state) {
        state.isHideMainOverflow = true
    },
    HIDE_MAIN_OVERFLOW(state) {
        state.isHideMainOverflow = false
    }
}