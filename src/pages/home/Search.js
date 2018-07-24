import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';          //导入antd面包屑组件
import { Link } from 'react-router-dom';    //导入路由跳转组件
import FileList from '../files/FileList.js'


//全部文件组件
class SearchFileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getAllFileType:'search',
            searchKeyWord:'',
        }
    };
    componentWillMount(){
        // console.log(this.props.searchKey.searchKey)
    }
    render() {
        return (

            <div>
              <FileList
                  getAllFileType = {this.state.getAllFileType}
                  searchKeyWord = {this.props.searchKey.searchKey}
              />
            </div>
        )
    }
}

// export default SearchFileList


const mapStateToProps = state => {
    const SearchKeyReducer = state.SearchKeyReducer;
    return {
        searchKey: SearchKeyReducer.searchKey,
    }
}
export default connect(mapStateToProps)(SearchFileList);