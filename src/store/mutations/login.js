import { FETCH_USER_REQ, FETCH_USER_SUC, FETCH_USER_ERR, TOGGLE_SNACK_SHOW, TOGGLE_SNACK_STATE, DEFINE_SNACK_MSG, LOGOUT, COMMIT_USERINFO } from '../constants/types'

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
    COMMIT_USERINFO(state, action) {
        state.userinfo = action.data
    },
    LOGOUT(state) {
        state.data.success = false;
    }
}