import { messageActions } from '../actions/message'
import { messageMutations } from '../mutations/message'
import {messageGetters} from '../getters/message'

const message = {
    state: {
        isFetching: false,
        isMarkAllFetching: false,
        data: {
            has_read_messages: [],
            hasnot_read_messages: []
        },
        error: ''
    },
    mutations: messageMutations,
    actions: messageActions,
    getters: messageGetters
}

export default message;