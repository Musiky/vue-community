import { releaseMutations } from '../mutations/release'
import { releaseActions } from '../actions/release'
const release = {
    state: {
        isReleaseFetching: false,
        isReleasePageShow: false,
        dialog: {
            isShow: false,
            msg: ''
        }
    },
    mutations: releaseMutations,
    actions: releaseActions
}

export default release