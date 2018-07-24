


export function post(url, params, callback,errorback) {
    const fetchOptions = {
        method: 'POST',
        body: params
    };
    fetch(url, fetchOptions)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            callback(res);
        })
        .catch((res) => {
            errorback(res)
        });
    ;
}

export function get(url, params, callback) {
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    url += `&_=${new Date().getTime()}`
    // alert(url)
    //fetch请求
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => { return res.json() })
        .then((res) => {
            callback(res)
        })
        .catch((res)=>{
            callback(res)
        })
}