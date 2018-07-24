import React from 'react';
import $ from 'jquery'
import { Tooltip } from 'antd';
export default class ShareFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shareLink: ''
        }
    };
    shareFileLink(dirId) {
        var self = this;
        $.ajax({
            url: '/api/kanbox/share/',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: {
                current_id: dirId,
            },
            success: function (data) {
                // console.log(JSON.stringify(data))
                var urlData = window.location.href.split('/')
                // console.log(window.location.href)
                if (data.code == 200) {
                    self.setState({
                        shareLink: urlData[0] + '//' + urlData[2] + '/#/sharelink?info=' + data.message
                    })
                } else {
                    self.setState({
                        shareLink: data.message
                    })
                }

            },
            error: function () {
                self.setState({
                    operateFileError: '链接已失效'
                })
            }
        })
    }
    //复制
    copyLink = (e) => {
        var e = document.getElementById("copy");
        e.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
    }
    componentWillMount() {
        this.shareFileLink(this.props.operateFileId) //传入选择的文件id
    }
    render() {
        return (

            <div className="operate-model-content-file">
                <Tooltip
                    title="复制成功"
                    trigger='click'
                >
                    <textarea id='copy' className="operate-model-shareLink" placeholder="文件分享链接请求中，请耐心等待..." readOnly value={this.state.shareLink} onClick={(e) => {
                        this.copyLink()
                    }}></textarea>
                </Tooltip>
            </div>
        )
    }
}
