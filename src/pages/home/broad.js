import React from 'react';
import createHistory from 'history/createHashHistory'
const history = createHistory()

//空白页面，当搜索框点击时，跳转到搜索页面

export default class Broad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };
    componentWillMount(){
        history.replace({
            pathname: '/home/search',
        })
    }
    render() {
        return (

            <div>
            </div>
        )
    }
}

