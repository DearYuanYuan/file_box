import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import FileList from '../files/FileList.js'
class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getAllFileType:'share'
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

export default Share