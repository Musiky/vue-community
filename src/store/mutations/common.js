import { SHOW_REFRESH, HIDE_REFRESH } from '../constants/types'

export const commonMutations = {
    // ----- refresh
    SHOW_REFRESH(state) {
        state.isRefreshShow = true
    },
    HIDE_REFRESH(state) {
        state.isRefreshShow = false
    }
}