import React from 'react';
import $ from 'jquery';
export default class MoveFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };
    // getFileTree(){
    //     var self  = this;
    //     $.ajax({
    //         url: '/api/kanbox/get_folder_tree/',
    //         type: 'GET',
    //         dataType: 'json',
    //         cache: false,
    //         data:{
    //             user_id:1,
    //         },
    //         success: function (data) {
    //             // console.log(JSON.stringify(data))
    //             if(data.code==200){
    //                 self.zTrees(data.data)
    //             }
    //         },
    //         error: function () {
    //
    //         }
    //     })
    // }
    // zTrees(path){
    //     function zTreeOnClick(event, treeId, treeNode) {
    //         var currentFileId = $('.show-way-title a:nth-last-child(1)').attr('name')
    //         //判断当选择移动的文件与
    //         if(treeNode.id == currentFileId){
    //             this.setState({
    //                 errorMsg:'不可在原来文件夹移动文件'
    //             })
    //             // console.log(treeNode.id+';'+currentFileId)
    //         }else{
    //             this.setState({
    //                 errorMsg:''
    //             })
    //         }
    //     };
    //
    //     var setting = {
    //         view: {
    //             showLine: false
    //         },
    //         data: {
    //             simpleData: {
    //                 enable: true
    //             }
    //         },
    //         callback: {
    //             onClick: zTreeOnClick.bind(this)
    //         }
    //     };
    //     var ztree= window.$.fn.zTree
    //     ztree.init($("#treeDemo"), setting, path);
    // }
    // componentWillMount(){
    //     this.getFileTree();
    // }
    // componentDidMount() {
    //
    //
    // }
    render() {
        return (
            <div>
                <p className="errorMsg">{this.state.errorMsg}</p>
                <div className="operate-model-content-file">

                    <ul id="treeDemo" className="ztree">
                    </ul>

                </div>
            </div>

        )
    }
}
