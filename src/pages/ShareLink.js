import React from 'react';
import logo from '../images/octa_logo.png';
import { Layout, Icon, message } from 'antd';
import '../styles/sharelink.less'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeBreadCrumb } from '../actions/breadCrumb';    //引入面包屑组件
import $ from 'jquery';
import { getParmam } from '../utils/getParam'
const { Header } = Layout;
const { Content, Footer, Sider } = Layout;
class ShareLink extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',    //分享的文件名
            size: '',     //分享文件的大小
            user_id: '',　//分享此文件的用户id
            file_id: '',　　//此文件的id
            type: '',    //分享文件的类型
            who: '',　　　　//谁分享的连接
            lose: false,
        }
    };
    //控制面包屑的文字显示,以及点击后返回当前的一级目录
    changeBreadcrumb = (text, path) => {
        let opt = {
            'text': text,
            'path': path
        }
        console.log(`${text}${path}`)
        this.props.dispatch(changeBreadCrumb(opt));
    }

    downLoad = () => {

        var tt = new Date().getTime();
        var url = 'api/kanbox/down_tran_att/';
        var info = (getParmam('info'))　　//根据url获取下载id
        $.get('api/kanbox/down_tran_att/', { share_info: info, file_id: this.state.file_id, user_id: this.state.user_id, source_id: 1 }, (res) => {
            if (res.code == 200) {
                var url = res.url
                var link = document.createElement('a'); //创建事件对象
                link.setAttribute('href', url);//a元素增加href属性
                link.setAttribute("download", '');//增加download属性
                link.click()
            }
            else {
                this.setState({
                    lose: true,
                })
                message.error('分享链接失效')
            }
        })
    }

    componentDidMount() {

        var id = (getParmam('info'))　　//根据url获取下载id
        let params = {
            info: id
        }
        $.ajax({
            url: 'api/kanbox/get_shared_task_info/',
            type: 'GET',
            data: params,
            success: (res) => {
                if (res.code == 200) {
                    if (res.data.length) {
                        return this.setState({
                            name: res.data[0].file_name,
                            size: res.data[0].file_size,
                            user_id: res.owner_id,
                            file_id: res.data[0].id,
                            type: res.data[0].file_type,
                            who: res.owner
                        })
                    }
                }
                return this.setState({
                    lose: true,
                })
            },
            error: (res) => {
                message.error('服务器出现问题！')
            }
        })

    }
    render() {
        //根据文件类型展示对应图片
        let imgIcon;
        switch (this.state.type) {
            case 'dir':
                imgIcon = require("../images/file-dir.png")
                break;
            case 'mp4':
                imgIcon = require("../images/vid.png")
                break;
            case 'doc': case 'docx':
                imgIcon = require("../images/doc.png")
                break;
            case 'xls': case 'xlsx':
                imgIcon = require("../images/xls.png")
                break;
            case 'mp3':
                imgIcon = require("../images/audio.png")
                break;
            case 'js': case 'json':
                imgIcon = require("../images/code.png")
                break;
            case 'png': case 'svg': case 'jpg': case 'gif': case 'jpeg':
                imgIcon = require("../images/img.png")
                break;
            default:
                imgIcon = require("../images/files.png")
                break;
        }
        return (
            <section className='shareSection'>
                <Header className="header">
                    <img className="logo" src={logo} />
                    <div className="backHome" >
                        <Link to={'/home/allfiles'} onClick={(text, path) => this.changeBreadcrumb('全部文件', '/home/allfiles')}>
                            <Icon type="home" />  回到我的网盘
                         </Link>
                    </div>
                </Header>


                {this.state.lose &&
                    <div className='shareContent' >
                        <div className='shareModal'  >
                            <div className='shareHeader' >
                                分享链接失效
                        </div>

                            <div className='shareContentMoadl'>
                                <div className='shareFile'>
                                    <img style={{ marginTop: '25px' }} src={require("../images/link_fail.png")} />
                                </div>
                                <button className='shareButton button theme' style={{ width: '90px' }} onClick={(text, path) => this.changeBreadcrumb('全部文件', '/home/allfiles')}> 返回网盘</button>
                            </div>
                        </div>
                    </div>


                }
                {!this.state.lose &&
                    <div className='shareContent' >
                        <div className='shareModal'  >
                            <div className='shareHeader' >
                                {this.state.who}分享了一个文件
                        </div>

                            <div className='shareContentMoadl'>
                                <div className='shareFile'>
                                    <img style={{ marginTop: '10px' }} src={imgIcon} />
                                    <div style={{ height: '20px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: '0 2px' }}>{this.state.name}</div>
                                    <div style={{ height: '20px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', padding: '0 2px', color: '#F28321' }}>{this.state.size}</div>
                                </div>
                                <button className='shareButton button theme' style={{ width: '90px' }} onClick={this.downLoad}> 下载文件</button>
                            </div>
                        </div>
                    </div>
                }
            </section>
        )
    }
}

const mapStateToProps = state => {
    const BreadcrumbReducer = state.BreadcrumbReducer;
    return {
        breadCrumb: BreadcrumbReducer.breadCrumb
    }
}

export default connect(mapStateToProps)(ShareLink);
