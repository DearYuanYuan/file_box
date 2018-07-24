import React from 'react';
import createHistory from 'history/createHashHistory'
import FileList from '../files/FileList.js'
const history = createHistory()

//空白页面，当搜索框点击时，跳转到搜索页面

export default class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getAllFileType:'audio'
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

