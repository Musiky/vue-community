/*********** Mutations ***********/
// topics
export const FETCH_TOPICS_REQ = 'FETCH_TOPICS_REQ'
export const FETCH_TOPICS_SUC = 'FETCH_TOPICS_SUC'
export const FETCH_TOPICS_ERR = 'FETCH_TOPICS_ERR'
export const CLEAR_STATE_DATA = 'CLEAR_STATE_DATA'
export const TOGGLE_NO_MORE_DATA_STATE = 'TOGGLE_NO_MORE_DATA_STATE'
export const TOGGLE_ERROR_DATA_STATE = 'TOGGLE_ERROR_DATA_STATE'
export const TOGGLE_ISFETCHING_STATE = 'TOGGLE_ISFETCHING_STATE'

// login
export const FETCH_USER_REQ = 'FETCH_USER_REQ'
export const FETCH_USER_SUC = 'FETCH_USER_SUC'
export const FETCH_USER_ERR = 'FETCH_USER_ERR'
export const COMMIT_USERINFO = 'COMMIT_USERINFO'
export const LOGOUT = 'LOGOUT'

// -----
// info page
export const FETCH_INFO_REQ = 'FETCH_INFO_REQ'
export const FETCH_INFO_SUC = 'FETCH_INFO_SUC'
export const FETCH_INFO_ERR = 'FETCH_INFO_ERR'
export const COMMIT_ID = 'COMMIT_ID'
export const TOGGLE_INFO_PAGE_DISPLAY = 'TOGGLE_INFO_PAGE_DISPLAY'
export const CLEAR_INFO_DATA = 'CLEAR_INFO_DATA'

// replies page
export const SHOW_REPLIES_PAGE = 'SHOW_REPLIES_PAGE'
export const HIDE_REPLIES_PAGE = 'HIDE_REPLIES_PAGE'
export const SHOW_COMMENT_BAR = 'SHOW_COMMENT_BAR'
export const HIDE_COMMENT_BAR = 'HIDE_COMMENT_BAR'
export const SEND_COMMENT_REQ = 'SEND_COMMENT_REQ'
export const SEND_COMMENT_SUC = 'SEND_COMMENT_SUC'
export const SEND_COMMENT_ERR = 'SEND_COMMENT_ERR'

// collect
export const SUC_COLLECT = 'SUC_COLLECT'
export const DEL_COLLECTED = 'DEL_COLLECTED'
// -----

// message
export const FETCH_MSG_REQ = 'FETCH_MSG_REQ'
export const FETCH_MSG_SUC = 'FETCH_MSG_SUC'
export const FETCH_MSG_ERR = 'FETCH_MSG_ERR'
export const CLEAR_MSG_DATA = 'CLEAR_MSG_DATA'
export const FETCH_MARK_ALL_REQ = 'FETCH_MARK_ALL_REQ'
export const FETCH_MARK_ALL_SUC = 'FETCH_MARK_ALL_SUC'
export const FETCH_MARK_ALL_ERR = 'FETCH_MARK_ALL_ERR'

// release
export const SHOW_RELEASE_PAGE = 'SHOW_RELEASE_PAGE'
export const HIDE_RELEASE_PAGE = 'HIDE_RELEASE_PAGE'
export const FETCH_RELEASE_REQ = 'FETCH_RELEASE_REQ'
export const FETCH_RELEASE_SUC = 'FETCH_RELEASE_SUC'
export const FETCH_RELEASE_ERR = 'FETCH_RELEASE_ERR'

/**
 * Common
 * @param {refresh}
 * @param {dialog}
 * @param {snack}
 * @param {main page overflow}
 * @param {bottomnav}
 */
// refresh
export const SHOW_REFRESH = 'SHOW_REFRESH'
export const HIDE_REFRESH = 'HIDE_REFRESH'

// snackbar
export const SHOW_SNACK = 'SHOW_SNACK'
export const HIDE_SNACK = 'HIDE_SNACK'
export const DEFINE_SNACK_MSG = 'DEFINE_SNACK_MSG'
export const DEFINE_SNACK_TYPE = 'DEFINE_SNACK_TYPE'
export const DEFINE_SNACK_POSITION = 'DEFINE_SNACK_POSITION'

// dialog
export const SHOW_TIP_DIALOG = 'SHOW_TIP_DIALOG'
export const HIDE_TIP_DIALOG = 'HIDE_TIP_DIALOG'

// bottom nav
export const HANDLE_CHANGE = 'HANDLE_CHANGE'

// main overflow
export const SHOW_MAIN_OVERFLOW = 'SHOW_MAIN_OVERFLOW'
export const HIDE_MAIN_OVERFLOW = 'HIDE_MAIN_OVERFLOW'

/*********** mutations ***********/

/*********** Getters ***********/
// login
export const COLLECTS_COUNT = 'COLLECTS_COUNT'
export const REPLIES_COUNT = 'REPLIES_COUNT'
export const MY_TOPICS_COUNT = 'MY_TOPICS_COUNT'

// message
export const HAS_NOT_READ_MESSAGES_COUNT = 'HAS_NOT_READ_MESSAGES_COUNT'
/*********** getters ***********/
