import * as types from '../constants/types'
export const messageGetters = {
    [types.HAS_NOT_READ_MESSAGES_COUNT] (state) {
        return state.data.hasnot_read_messages.length
    }
}