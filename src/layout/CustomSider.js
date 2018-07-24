import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';                   //antd组件
import { Link } from 'react-router-dom';                     //router 的 Link组件 
import { changeBreadCrumb } from '../actions/breadCrumb';    //引入面包屑组件

const { Content, Footer, Sider } = Layout;
class CustomSider extends React.Component {
    constructor(props) {
        super(props);
    };


    //控制面包屑的文字显示,以及点击后返回当前的一级目录
    changeBreadcrumb = (text, path) => {
        let opt = {
            'text': text,
            'path': path
        }
        // console.log(`${text}${path}`)
        this.props.dispatch(changeBreadCrumb(opt));
    }


    render() {
        const { breadCrumb } = this.props;

        //根据当前的url地址，对应高亮显示
        let selectedKeys = '';
        switch (breadCrumb.path) {
            case '/home/allfiles':
                selectedKeys = 1
                break;
            case '/home/recently':
                selectedKeys = 2
                break;
            case '/home/share':
                selectedKeys = 3
                break;
            case '/home/trash':
                selectedKeys = 4
                break;
            case '/home/music':
                selectedKeys = 5
                break;
            case '/home/audio':
                selectedKeys = 6
                break;
            case '/home/word':
                selectedKeys = 7
                break;
            case '/home/image':
                selectedKeys = 8
                break;
            default:
        }

        return (
            <Sider
                width={200}
                style={{ background: '#fff', overflow: 'auto', height: 'calc(100vh - 170px)' }}>
                <Menu
                    mode="inline"
                    selectedKeys={[`${selectedKeys}`]}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                    <Menu.Item key="1">
                        <Link to={'/home/allfiles'} onClick={(text, path) => this.changeBreadcrumb('全部文件', '/home/allfiles')}>
                            <span> 全部文件</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={'/home/recently'} onClick={() => this.changeBreadcrumb('最近查看', '/home/recently')}>
                            <span>最近查看</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={'/home/share'} onClick={() => this.changeBreadcrumb('分享', '/home/share')}>
                            <span>分享</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to={'/home/trash'} onClick={() => this.changeBreadcrumb('回收站', '/home/trash')}>
                            <span>回收站</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to={'/home/music'} onClick={() => this.changeBreadcrumb('音频', '/home/music')}>
                            <span>音频</span>
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="6">
                        <Link to={'/home/audio'} onClick={() => this.changeBreadcrumb('视频', '/home/audio')}>
                            <span>视频</span>
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="7">
                        <Link to={'/home/word'} onClick={() => this.changeBreadcrumb('文档', '/home/word')}>
                            <span>文档</span>
                        </Link>

                    </Menu.Item>
                    <Menu.Item key="8">
                        <Link to={'/home/image'} onClick={() => this.changeBreadcrumb('图片', '/home/image')}>
                            <span>图片</span>
                        </Link>

                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}


const mapStateToProps = state => {
    const BreadcrumbReducer = state.BreadcrumbReducer;
    const userReducer = state.userReducer;
    return {
        logIn: userReducer.logIn,
        user: userReducer.user,
        status: userReducer.status,
        breadCrumb: BreadcrumbReducer.breadCrumb
    }
}

export default connect(mapStateToProps)(CustomSider);



