import * as TYPE from '../actions/types'

//初始化user状态
const initialState = {
    status: window.sessionStorage.getItem("status") || "null",
    user: window.sessionStorage.getItem("user")? JSON.parse(window.sessionStorage.getItem("user")) : {},
    logIn: window.sessionStorage.getItem("logIn") || false,
}

export default function userReducer(state = initialState, action) {

    switch (action.type) {
        case TYPE.LOGGED_DOING:

            window.sessionStorage.setItem("status", "doing")
            window.sessionStorage.setItem("logIn", false)
            window.sessionStorage.setItem("user", JSON.stringify({}))
            return Object.assign({}, state, {
                status: 'doing',
                logIn: false,
                user: {}
            })
        case TYPE.LOGGED_IN:
            window.sessionStorage.setItem("status", "done")
            window.sessionStorage.setItem("logIn", true)
            window.sessionStorage.setItem("user", JSON.stringify(action.user))
            return Object.assign({}, state, {
                status: 'done',
                logIn: true,
                user: action.user,
            })

        case TYPE.LOGGED_OUT:
            window.sessionStorage.removeItem("status")
            window.sessionStorage.removeItem("logIn" )
            window.sessionStorage.removeItem("user")
            return Object.assign({}, state, {
                status: 'null',
                logIn: false,
                user: {}
            })
        case TYPE.LOGGED_ERROR:
            window.sessionStorage.setItem("status", "error")
            window.sessionStorage.setItem("logIn", false)
            window.sessionStorage.setItem("user", {})
            return Object.assign({}, state, {
                status: 'error',
                logIn: false,
                user: {}
            })


        default:
            return state
    }

}