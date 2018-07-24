import React from 'react';
import logo from '../images/octa_logo.png';
import { Icon, message } from 'antd';
import { connect } from 'react-redux';
import { logIn } from '../actions/user';
import PATTREN from '../utils/pattern'
import $ from 'jquery'
import URL from '../utils/urls'
import Vcode from 'react-vcode';
import '../styles/login.less'

class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isLogin: '注册',
            username: '',
            password: '',
            code: '',
            VCode: '',
            loading: false,


            register_username: '',
            register_email: '',
            register_phone: '',
            register_password: '',
            register_password2: '',
        }
    };



    toogle() {
        this.state.isLogin === '注册' ?
            this.setState({
                isLogin: '登录'
            })
            :
            this.setState({
                isLogin: '注册'
            })
    }

    componentDidMount() {
        let { logIn } = this.props;
        console.log(logIn)

        window.document.title = '登录'
    }
    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.logIn !== this.props.logIn && nextProps.logIn === true) {
            //will redirect
            console.log('登录成功')
            this.props.history.push('/')
            return false;
        }
        // if (nextProps.status === 'doing') {
        //     //loggining
        //     console.log('登录中')
        //     return false;
        // }
        // if (nextProps.status === 'error' || nextProps.status === 'done') {
        //     console.log('登录失败')
        //     return false;
        // }
        return true;
    }

    //登录
    login = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        if (!this.state.username || !this.state.password) {
            return message.warning('请补全您的输入信息！')

        }
        if (this.state.code != this.state.VCode) {
            return message.warning('验证码不正确!')
        }

        let opt = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.dispatch(logIn(opt));

    }

    register = (e) => {
        e.preventDefault();
        if (!this.state.register_username || !this.state.register_email  || !this.state.register_password || !this.state.register_phone) {
           return  message.warning('请补全您的注册信息！')
           
        }
        if(this.state.register_password!=this.state.register_password2){
            return  message.warning('两次输入密码不同！')
        }
        let params = {
            username: this.state.register_username,
            email: this.state.register_email,
            c: this.state.register_code,
            password: this.state.register_password,
            phone: this.state.register_phone
        }

        $.ajax({
            url:  URL.register,
            type: 'POST',
            data:params,
            success:(res)=>{
                if (res.code == 200) {
                    //切换到登录页面
                    this.setState({
                        isLogin: '注册'
                    })
                    return message.success('注册成功，您现在可以使用注册账号登录了！')
                }
                return message.error(res.message)
            },
            error:(res)=>{
                message.error('服务器出现问题！')
            }
        })
    }

    render() {
        let { status, logIn } = this.props;
        return (
            <div className='warpper clearfix'>
                <div className='left_warp'>
                    <img src={logo} alt='logo' style={{ height: '52px' }} className='logo' />
                    <div className='left_warp_center'>
                        <h1>区块链网盘客户端</h1>
                        <p style={{ color: ' #DEDEDE', marginBottom: '5%' }}>登录用户端以访问或管理账户下文件，若还没有账户，请先前往注册账户。</p>
                        <div className={`button ghost`} onClick={() => { this.toogle() }}>
                            {this.state.isLogin}
                        </div>
                    </div>

                    <ul className='firendLink'>
                        <li><a href="http://www.8lab.cn" target='_blank'>八分量官网</a> <i className="fa fa-share-square-o" aria-hidden="true"></i>  </li>
                        <li><a href="https://192.168.1.239:8099" target='_blank'>管理员系统登录</a><i className="fa fa-share-square-o" aria-hidden="true"></i></li>
                    </ul>
                </div>

                <div className='right_warp'>
                    {this.state.isLogin === '注册' &&
                        <form action='' className='from_warp' onSubmit={this.login} autoComplete="off">
                            <label htmlFor="name" className='from_label'>
                                用户名:
                                <input
                                    className='from_input' id='name'
                                    type="text"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={(e) => { this.setState({ username: e.target.value }) }}
                                />
                            </label>
                            <label className='from_label'>
                                密码:
                                <input
                                    className='from_input'
                                    type="password"
                                    placeholder="········"
                                    value={this.state.password}
                                    onChange={(e) => { this.setState({ password: e.target.value }) }}
                                />
                            </label>
                            <label className='from_label' style={{ position: 'relative' }}>
                                验证码:
                                <input
                                    className='from_input'
                                    type="text" placeholder='····'
                                    value={this.state.code}
                                    onChange={(e) => {
                                        this.setState({ code: e.target.value });
                                        if (e.target.value!= this.state.VCode) {
                                            e.target.setCustomValidity("验证码输入不正确！")
                                        } else {
                                            e.target.setCustomValidity("")
                                        }
                                    }}
                                />
                                <Vcode
                                    length={4}
                                    onChange={(v, e) => { this.setState({ VCode: v }); }}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '20px',
                                        backgroundColor: '#fff',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        verticalAlign: 'middle',
                                        userSelect: 'none',
                                    }}
                                />
                            </label>
                            <label htmlFor="">
                                <input className='login_submit button theme ' type="submit" value="登录" />
                            </label>
                        </form>
                    }
                    {
                        this.state.isLogin === '登录' &&
                        <form action='' className='from_warp' onSubmit={this.register} >
                            <label htmlFor="name" className='from_label'>
                                用户名:
                                <input
                                    className='from_input'
                                    type="text"
                                    placeholder="username"
                                    value={this.state.register_username}
                                    onChange={(e) => {
                                        this.setState({ register_username: e.target.value });
                                        if (!PATTREN.username.test(e.target.value)) {
                                            e.target.setCustomValidity("请检查帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)")
                                        } else {
                                            e.target.setCustomValidity("")
                                        }

                                    }}
                                />
                            </label>
                            <label htmlFor="email" className='from_label'>
                                电子邮箱:
                                <input
                                    className='from_input'
                                    type="email"
                                    value={this.state.register_email}
                                    onChange={(e) => {
                                        this.setState({ register_email: e.target.value });
                                    }}
                                    placeholder="ohn.smith@gmail.com"
                                />
                            </label>
                            <label htmlFor='telphone' className='from_label'>
                                移动电话:
                                <input
                                    className='from_input'
                                    type="tel"
                                    value={this.state.register_phone}
                                    onChange={(e) => {
                                        this.setState({ register_phone: e.target.value });
                                        if (!PATTREN.phone.test(e.target.value)) {
                                            e.target.setCustomValidity("请检查手机号码是否合法")
                                        } else {
                                            e.target.setCustomValidity("")
                                        }
                                    }}
                                    placeholder="134-6723-8723"
                                    name="number"
                                />
                            </label>
                            <label className='from_label'>
                                密码:
                                <input
                                    className='from_input'
                                    type="password"
                                    placeholder="········"
                                    value={this.state.register_password}
                                    onChange={(e) => {
                                        this.setState({ register_password: e.target.value })
                                        if (!PATTREN.passwrod.test(e.target.value)) {
                                            e.target.setCustomValidity("密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)")
                                        } else {
                                            e.target.setCustomValidity("")
                                        }
                                    }}
                                />  
                            </label>
                            <label className='from_label'>
                            再次输入密码:
                                <input
                                    className='from_input'
                                    type="password"
                                    placeholder='····'
                                    value={this.state.register_password2}
                                    onChange={(e) => { 
                                        this.setState({ register_password2: e.target.value }) 
                                        if (this.state.register_password!=e.target.value) {
                                            e.target.setCustomValidity("两次输入密码不同！")
                                        } else {
                                            e.target.setCustomValidity("")
                                        }
                                    }}
                                />
                            </label>
                            <label htmlFor="">
                                <input className='login_submit button theme ' type="submit" value="注册" />
                            </label>
                        </form>
                    }

                </div>

            </div>
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

export default connect(mapStateToProps)(Login);