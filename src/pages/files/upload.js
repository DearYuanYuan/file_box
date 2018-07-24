import React from 'react';
import $ from 'jquery'
// import { Upload, message, Button, Icon } from 'antd';
// const props = {
//     name: 'file',
//     action: '//jsonplaceholder.typicode.com/posts/',
//     headers: {
//         authorization: 'authorization-text',
//     },
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }
//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// };

export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList:[],
            fileOverSize:''
        }
    };


    pickFile(){
        var file = $('#pickFileIpt')[0].files[0]

        // if(file.size/1024>512){
        //     //当文件大于512kb
        //     this.setState({
        //         fileOverSize:'文件超过512KB，请重新选择', //提示文件过大
        //     })
        //     this.setState({
        //         fileList:[]
        //     })
        // }else{
            this.setState({
                fileOverSize:'',
            })

        // }

        var fileList = [];
        fileList.push(file.name)
        this.setState({
            fileList:fileList
        })
    }
    render() {
        return (
            <div>
                {/*<Upload {...props}>*/}
                    {/*<Button>*/}
                        {/*<Icon type="upload" /> Click to Upload*/}
                    {/*</Button>*/}
                {/*</Upload>*/}
                <form id= "uploadForm" encType="multipart/form-data">
                    <input id="pickFileIpt" type="file"  onChange={this.pickFile.bind(this,'upload')}/>
                    <button className="buttonOperate pickFileBtn"><i className="fa fa-upload icon-operate"></i>选择文件</button>
                </form>

                <div className="operate-model-content-file">

                    <ul className="operate-model-file-list">
                        {
                            this.state.fileList &&
                                this.state.fileList.map((data,index)=>{
                                    return (
                                        <li key={index}> <i className="fa fa-file"></i> {data}</li>
                                    )
                                })

                        }


                    </ul>
                </div>
                <p className="errorMsg">{this.state.fileOverSize}</p>
            </div>

        )
    }
}
