import { HANDLE_CHANGE } from '../constants/types'

export const bottomNavMutations = {
    HANDLE_CHANGE(state, params) {
        state.active = params
    }
}