import * as TYPE from '../actions/types'

//初始化user状态
const initialState = {
    breadCrumb: {
        'path': window.sessionStorage.getItem("path") || "/",
        'text': window.sessionStorage.getItem("text") || "全部文件",
    }
}

export default function BreadcrumbReducer(state = initialState, action) {

    switch (action.type) {
        case TYPE.UPDATA:
            window.sessionStorage.setItem("path", action.breadCrumb.path);
            window.sessionStorage.setItem("text", action.breadCrumb.text);
            return Object.assign({}, state, {
                breadCrumb: action.breadCrumb

            })
        default:
            return state
    }

}