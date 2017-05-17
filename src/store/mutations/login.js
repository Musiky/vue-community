import { FETCH_USER_REQ, FETCH_USER_SUC, FETCH_USER_ERR, TOGGLE_SNACK_SHOW, TOGGLE_SNACK_STATE, DEFINE_SNACK_MSG } from '../constants/types'

export const loginMutations = {
    FETCH_USER_REQ(state) {
        state.isFetching = true
    },
    FETCH_USER_SUC(state, action) {
        state.isFetching = false;
        state.data = action.data
    },
    FETCH_USER_ERR(state, action) {
        state.isFetching = false;
        state.data.success = false;
        state.error = action.error;
    },
    TOGGLE_SNACK_SHOW(state, action) {
        state.snackshow = action;
    },
    TOGGLE_SNACK_STATE(state, action) {
        state.snackwarn = action
    },
    DEFINE_SNACK_MSG(state, action) {
        state.snackmsg = action.msg
    }
}