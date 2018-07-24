import React from 'react';
import { Breadcrumb } from 'antd';          //导入antd面包屑组件
import { Link } from 'react-router-dom';    //导入路由跳转组件
import FileList from '../files/FileList.js'


//全部文件组件
class AllFiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getAllFileType:'allFile'
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

export default AllFiles