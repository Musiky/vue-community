import { infoMutations } from '../mutations/info'
import { infoActions } from '../actions/info'

const info = {
    state: {
        isFetching: false,
        error: '',
        data: {}
    },
    mutations: infoMutations,
    actions: infoActions
}

export default info