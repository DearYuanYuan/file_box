import * as TYPE from './types'
import URL from '../utils/urls'
import { get, post } from '../utils/request'
import $ from 'jquery'
import { message } from 'antd'
export function logIn(opt) {
    return (dispatch) => {
        dispatch({
            'type': TYPE.LOGGED_DOING
        });


        $.ajax({
            url: URL.login,
            type: 'POST',
            data:opt,
            success:(res)=>{
                if (res.code == 200) {
                    var user = Object.assign(opt, res.message)
                    return dispatch({ 'type': TYPE.LOGGED_IN, user: user });
                }
                message.error(res.message)
            },
            error:(res)=>{
                message.error('服务器出现问题！')
            }
        })
     
    }
}

export function logOut() {
    return (dispatch) => {
        dispatch({
            'type': TYPE.LOGGED_OUT
        });
    }
}
