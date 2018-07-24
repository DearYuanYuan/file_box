import React from 'react';
import createHistory from 'history/createHashHistory'
import FileList from '../files/FileList.js'
const history = createHistory()

//空白页面，当搜索框点击时，跳转到搜索页面

export default class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getAllFileType:'image'
        }
    };

    render() {
        return (

            <div>
                <FileList
                    getAllFileType = {this.state.getAllFileType}
                />
            </div>
        )
    }
}

