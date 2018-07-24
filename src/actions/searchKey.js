import * as TYPE from './types'


export function searchKey(opt) {
    return (dispatch) => {
        dispatch({ 'type': TYPE.SEARCHKEY, searchKey: opt });
    }
}
