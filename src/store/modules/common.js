import { commonMutations } from '../mutations/common.js'
import { commonActions } from '../actions/common.js'

const common = {
    state: {
        // ----- refresh
        isRefreshShow: false
    },
    mutations: commonMutations,
    actions: commonActions
}

export default common