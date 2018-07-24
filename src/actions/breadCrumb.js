import * as TYPE from './types'


export function changeBreadCrumb(opt) {
    let test = {
        'path': opt.path,
        'text': opt.text,
    };
    return (dispatch) => {
        dispatch({ 'type': TYPE.UPDATA, breadCrumb: test });
    }
}
