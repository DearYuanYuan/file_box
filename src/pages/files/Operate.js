import React from 'react';
import $ from 'jquery'
import Delete from './delete.js'
import FileUpload from './upload.js'
import NewFile from './newFile.js'
import MoveFile from './move.js'
import ReName from './reName.js'
import ShareFile from './shareFile.js'
import DeleteAll from './deleteAll.js'
import Recover from './recover.js'
import ShareFileCancel from './shareFileCancel.js'
export default class Operate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg:'',
            movePath:false,
        }
    };
    getFileTree(){
        var self  = this;
        $.ajax({
            url: '/api/kanbox/get_folder_tree/',
            type: 'GET',
            dataType: 'json',
            cache: false,
            data:{

            },
            success: function (data) {
                // console.log(data)
                //添加目录的根目录
                data.data.push({"name": "根目录",
                    "pId": -1,
                    "id": 0})
                if(data.code==200){
                    self.zTrees(data.data)
                }
            },
            error: function () {

            }
        })
    }
    zTrees(path){
        function zTreeOnClick(event, treeId, treeNode) {
            var currentFileId = $('.show-way-title a:nth-last-child(1)').attr('name')

            //判断当选择移动的文件不能移动到当前所在位置，不能移动到文件夹的自身文件夹
            if(treeNode.id == currentFileId){
                this.setState({
                    errorMsg:'不可在原来文件夹移动文件'
                })

            }else if(treeNode.id == this.props.operateFileMsg[0] ){
                this.setState({
                    errorMsg:'不能移动到选中文件夹'
                })
            }
            else{
                this.setState({
                    errorMsg:'',
                    movePath:treeNode.id,
                })
            }
        };

        var setting = {
            view: {
                showLine: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            callback: {
                onClick: zTreeOnClick.bind(this)
            }
        };
        var ztree= window.$.fn.zTree
        ztree.init($("#treeDemo"), setting, path);
    }
    componentWillMount(){
        this.getFileTree();
    }
    componentDidMount() {

    }
    render() {
        return (

            <div className="operate-model">
                {
                    this.props.loadingFileAction &&
                    <div className="loadingActionBox">
                        <i className="fa fa-spinner fa-spin fa-2x"></i>
                    </div>
                }

                <div className="operate-model-box">
                    <div className="operate-model-header">
                        <h2 className="operate-model-header-h2">{this.props.operateFileMsg[2]}</h2>
                        <h3 className="operate-model-header-h3">{this.props.operateFileMsg[3]}</h3>
                        <i className="fa fa-times-circle operate-model-header-close" onClick={this.props.handleCloseOperateBox.bind(this)}></i>
                    </div>

                    <div className="operate-model-content">
                        <h4 className="operate-model-content-title">{this.props.operateFileMsg[4]}</h4>
                        <p className="errorMsg">{this.state.errorMsg}</p>
                        {
                            this.props.operateFileAction == 'delete' &&
                            <Delete
                                operateFileId = {this.props.operateFileMsg[0]}
                                operateFileName = {this.props.operateFileMsg[1]}
                            />
                        }
                        {
                            this.props.operateFileAction == 'rename' &&
                            <ReName/>
                        }
                        {
                            this.props.operateFileAction == 'upload' &&
                            <FileUpload/>
                        }
                        {
                            this.props.operateFileAction == 'new' &&
                            <NewFile/>
                        }

                        {
                            this.props.operateFileAction == 'share' &&
                            <ShareFile
                                operateFileId = {this.props.operateFileMsg[0]}
                            />
                        }

                        {
                            this.props.operateFileAction == 'move' &&
                            <MoveFile/>
                        }
                        {
                            this.props.operateFileAction == 'deleteAll' &&
                            <DeleteAll/>
                        }
                        {
                            this.props.operateFileAction == 'recover' &&
                            <Recover
                                operateFileId = {this.props.operateFileMsg[0]}
                                operateFileName = {this.props.operateFileMsg[1]}
                            />
                        }
                        {
                            this.props.operateFileAction == 'shareCancel' &&
                            <ShareFileCancel
                                operateFileName = {this.props.operateFileMsg[1]}/>
                        }
                    </div>
                    <p className="errorMsg">{this.props.operateFileError}</p>
                    <div className="operate-model-footer">
                        <button className="buttonOperate operate-model-cancel" onClick={this.props.handleCloseOperateBox.bind(this)}>取消</button>
                        {/*
                         this.props.operateFileMsg[3],//确认执行相关文件操作的文件id ，需要传给后端
                         this.state.movePath ,// 移动到某文件夹的id，需要传给后端

                         移动
                        */}
                        {
                            this.props.operateFileAction == 'move' &&
                            <button className="buttonOperate operate-model-confirm"
                                    onClick={this.props.handleConfirmOperateBox.bind(this,[this.props.operateFileMsg[0],this.state.movePath ],this.props.operateFileAction)}>确定</button>
                        }
                        {/*
                         this.props.operateFileMsg[3],//确认执行相关文件操作的文件id ，需要传给后端
                         上传、新建 传入的时当前文件夹的id
                         重命名，删除，传入的时需要操作的文件id
                         */}
                        {
                            this.props.operateFileAction != 'move' &&
                            <button className="buttonOperate operate-model-confirm"
                                    onClick={this.props.handleConfirmOperateBox.bind(this,this.props.operateFileMsg[0],this.props.operateFileAction)}>确定</button>
                        }


                    </div>
                </div>
            </div>
        )
    }
}
