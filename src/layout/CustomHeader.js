import React from 'react';
import { Menu, Layout, Icon, Input, AutoComplete } from 'antd';
import avater from '../images/avater.jpg';
import logo from '../images/octa_logo.png'
import { connect } from 'react-redux';
import { logOut } from '../actions/user';
import { Link } from 'react-router-dom';

import { changeBreadCrumb } from '../actions/breadCrumb';
import { searchKey } from '../actions/searchKey';
import createHistory from 'history/createHashHistory'
import $ from 'jquery'
const history = createHistory()

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class CustomHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vagueDate:[],//获取模糊查询的数据
            vagueBox:false,//模糊查询的弹框
        }
    };


    jumpSearch(e){
        var keyWord = $('.SearchFileIpt').val()
        if(e.keyCode==13){
            this.changeBreadcrumb('搜索结果', '/home/search')
            this.searchKey(keyWord)

            history.push({
                pathname: '/home/broad',
            })

            this.setState({
                vagueBox:false
            })
        }else{

            this.setState({
                vagueBox:true
            })

            var self  = this;
            $.ajax({
                url: '/api/kanbox/search_file/',
                type: 'GET',
                dataType: 'json',
                cache: false,
                data:{
                    keywords:keyWord,
                },
                success: function (data) {
                    // console.log(JSON.stringify(data))
                    if(data.code==200){
                        self.setState({
                            vagueDate:data.data
                        })
                    }else{

                    }

                },
                error: function () {

                }
            })
        }
    }
    setVagueDate(e){
        $('.SearchFileIpt').val($(e.target).text())
        this.setState({
            vagueBox:false
        })
    }
    searchKey = (value) => {
        let opt = value
        this.props.dispatch(searchKey(opt))
    }
    //控制面包屑的文字显示,以及点击后返回当前的一级目录
    changeBreadcrumb = (text, path) => {
        let opt = {
            'text': text,
            'path': path
        }
        this.props.dispatch(changeBreadCrumb(opt));
    }




    render() {
        //获取用户store内存储的用户名
        const { user } = this.props;
        //自动完成的数据
        const { dataSource } = this.state;

        return (
            <Header className="header">
                <img className="logo" src={logo} style={{ marginLeft: '56px',width:'85px' }} />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right', background: '#213144', }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="1" style={{ borderBottom: '1px solid transparent' }}>


                    </Menu.Item>

                    <SubMenu style={{ borderBottom: '1px solid transparent' }}
                        title={
                            <div className="avatar" style={{color:'#fff'}}>
                                 你好 - {user.username}
                                {/*<img src={avater} alt="头像" style={{ width: '50px', height: '50px',borderRadius: '50%' }} /><i className="on bottom b-white" />*/}
                            </div>}
                    >
                        <MenuItemGroup title="用户中心">
                          {/*  <Menu.Item key="setting:1"  disabled>你好 - {user.username}</Menu.Item>*/}
                            <Menu.Item key="setting:2" onClick={(e) => {
                                this.changeBreadcrumb('个人信息', '/home/personalDetails')
                                history.push({
                                    pathname: '/home/personalDetails',
                                })
                            }}>个人信息</Menu.Item>
                            <Menu.Item key="logout"><div onClick={() => this.props.dispatch(logOut())}>退出登录</div></Menu.Item>
                        </MenuItemGroup>
                 
                    </SubMenu>
                </Menu>
                <div className="SearchFileBox">
                    <input className="SearchFileIpt" placeholder="搜索文件/文件夹" onKeyUp={this.jumpSearch.bind(this)}></input>
                    {
                        this.state.vagueBox &&
                        <div className="vagueBox">
                            {
                                this.state.vagueDate &&
                                this.state.vagueDate.map((data,index)=>{
                                    return(
                                        <p onClick={this.setVagueDate.bind(this)} key={index}>{data.file_name}</p>
                                    )
                                })
                            }
                        </div>
                    }

                </div>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                    .avatar:hover{
                        border-bottom:0;
                    }
                    .ant-select-auto-complete.ant-select .ant-select-selection--single{
                        background:transparent;
                    }
                    .ant-select-auto-complete.ant-select-lg .ant-input{
                        border-radius:40px;
                        color: #fff;
                    }
                    .ant-input-suffix{
                        color:#fff !important;
                    }
                `}</style>
            </Header>
        )
    }
}


const mapStateToProps = state => {
    const userReducer = state.userReducer;
    return {
        logIn: userReducer.logIn,
        user: userReducer.user,
        status: userReducer.status
    }
}

export default connect(mapStateToProps)(CustomHeader);