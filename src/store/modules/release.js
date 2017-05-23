import { releaseMutations } from '../mutations/release'
import { releaseActions } from '../actions/release'
const release = {
    state: {
        isReleaseFetching: false,
        isReleasePageShow: false
    },
    mutations: releaseMutations,
    actions: releaseActions
}

export default release