import * as TYPE from '../actions/types'

//初始化user状态
const initialState = {
    searchKey:''
     
}

export default function SearchKeyReducer(state = initialState, action) {

    switch (action.type) {
        case TYPE.SEARCHKEY:
            return Object.assign({}, state, {
                searchKey:action
            })
        default:
            return state
    }

}