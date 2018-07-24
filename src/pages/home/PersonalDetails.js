import React from 'react';
import '../../styles/personalDetails.less';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Row, Col, Modal, Button, message } from 'antd';
import CustomHeader from '../../layout/CustomHeader'
import BreadcrumbCustom from '../../layout/BreadcrumbCustom'
import CustomSider from '../../layout/CustomSider'
import URL from '../../utils/urls'
import $ from 'jquery'
import PATTREN from '../../utils/pattern'
import { logOut } from '../../actions/user';
const { Content, Footer, Sider } = Layout;

class PersonalDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,    //每条数据对应的ID 方便进行删除,编辑操作
      destroyUserModal: false,  //销毁


      email: '',            //邮箱
      phone: '',            //手机号
      placeholderEmail: '',
      placeholderPhone: '',

      confirmLoading: false,    //确认密码loading状态
      oldpassword: '',　　　　　　//现在使用的密码
      newpassword1: '',         //需要设定的新密码
      newpassword2: '',         //确认需要设定的新密码


      destroyPassword: '',
      destroyLoading: false,
    }
  }


  submitBasic = (e) => {
    e.preventDefault();
    //所需参数

    if(this.state.phone.length){
      if (!PATTREN.phone.test(this.state.phone)) {
        return message.warning("请检查手机号码是否合法!")
      } 
    }


    let params = {
      'phone': this.state.phone ? this.state.phone : this.props.user.phone,
      'email': this.state.email ? this.state.email : this.props.user.email
    }
    // url地址
    let url = URL.modify;
    $.post(url, params, (res) => {
      if (res.code == 200) {
        this.props.dispatch({ 'type': 'LOGGED_IN', user: Object.assign(this.props.user, params) });
        return message.success('已成功保存信息');
      }
      message.warning(res.message);
    }).error((res) => {
      message.error('服务器出现问题!');
    })
  }



  //显示销毁账户
  showDestroyUser = () => {
    this.setState({
      destroyUserModal: true
    });

  }
  //隐藏销毁账户
  hideDestroyUser = () => {
    this.setState({
      destroyUserModal: false,
      destroyPassword: '',
      destroyLoading: false,
    });
  }
  //提交销毁账户操作
  sumitDestroyUser = () => {

    //点击销毁账户确认按钮loading状态
    this.setState({
      destroyLoading: true,
    });
    setTimeout(() => {
      this.hideDestroyUser()
    }, 2000);
  }




  //清除修改密码的input的输入框
  clearPassWord = () => {
    this.setState({
      oldpassword: '',
      newpassword1: '',
      newpassword2: '',
      confirmLoading: false,
    });
  }
  //显示修改密码
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  //隐藏修改密码
  hideModal = () => {
    this.setState({ visible: false, })
    this.clearPassWord()
  }

  //提交修改完成的
  submitPassWord = () => {

    if (!this.state.oldpassword || !this.state.newpassword1 || !this.state.newpassword2) {
      return message.warning('请先补全信息')
    }
    if (this.state.newpassword1 != this.state.newpassword2) {
      return message.warning('两次输入密码不相同！')
    }
    //点击提交后确认按钮loading状态
    this.setState({
      confirmLoading: true,
    });
    //所需参数
    let params = {
      'password': this.state.oldpassword,
      'newpassword': this.state.newpassword1
    }
    // url地址
    let url = URL.modifyPass;

    $.ajax({
      url: url,
      type: 'POST',
      data: params,
      success: (res) => {
        if (res.code == 200) {
          this.hideModal()
          this.props.dispatch(logOut())
          return message.success('成功修改密码,请重新登录！')

        }
        this.clearPassWord()
        return message.error(res.message)
      },
      error: (res) => {
        message.error('服务器出现问题！')
      }
    })
  }


  componentWillMount() {
    this.setState({
      placeholderUser: 'JohnSmith',
      placeholderEmail: 'john.smith@gmail.com',
      placeholderPhone: '134-6723-8723 '
    })
  }

  componentDidMount() {
    // let { logIn } = this.props;
    // console.log(logIn)
    // //如果登录状态为false则跳到登录页面
    // if (!logIn) {
    //   this.props.history.push('/login')
    // }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { history } = this.props;
  //   if (nextProps.status === 'null') {
  //     history.push('/login')
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    const { children, user } = this.props;
    const { visible, confirmLoading, oldpassword, newpassword1, newpassword2, destroyUserModal, destroyPassword, destroyLoading, email, phone, placeholderEmail, placeholderPhone } = this.state;
    return (
      <section>
        <Row style={{ marginBottom: '25px' }}>
          <Col md={12} xs={24}>
            <p className='title'>基本信息</p>
            <p>您的用户名和电子邮箱将作为登录的依据。<br />正确填写移动电话以方便同事找到您。</p>
          </Col>
          <Col md={12} xs={24}>
            <form action='' className='from_warp' onSubmit={this.submitBasic} autoComplete="off">
              <label htmlFor="name" className='action_label'>
                用户名:
                      <input
                  className='action_input'
                  type="text"
                  value={user.username}
                  readOnly="readOnly"
                />
              </label>
              <label className='action_label'>
                电子邮箱:
                      <input
                  className='action_input'
                  type="email"
                  placeholder={user.email}
                  value={email}
                  onChange={(e) => { this.setState({ email: e.target.value }) }}
                />
              </label>
              <label className='action_label'>
                移动电话:<input
                  className='action_input'
                  type="text"
                  placeholder={user.phone}
                  value={phone}
                  onChange={(e) => {
                    this.setState({ phone: e.target.value })

                  }}
                />
              </label>
              <label htmlFor="">
                <input className='button gray ' type="submit" value="保存" style={{ marginTop: '20px' }} />
              </label>
            </form>
          </Col>
        </Row>
        <hr />
        <Row style={{ marginTop: '25px' }}>
          <Col md={12} xs={24}>
            <p className='title'>账户安全</p>
            <p>请不要使用生日等容易被猜到的组合作为密<br />码。永久销毁账户会删除账户内所有文件，<br />该操作无法恢复。</p>
          </Col>
          <Col md={12} xs={24}>
            <p className='title'>当前密码</p>
            <button className='button theme ' value="修改密码" onClick={this.showModal} >修改密码</button>
            <br />
            <button className='button gray ' value="永久销毁账户" style={{ marginTop: '30px' }} onClick={this.showDestroyUser} >永久销毁账户</button>
          </Col>
        </Row>





        <Modal
          title="修改密码"
          wrapClassName="vertical-center-modal"
          visible={visible}
          onOk={this.submitPassWord}
          onCancel={this.hideModal}
          confirmLoading={confirmLoading}
          okText="更改密码"
          cancelText="取消"
        >
          <form action='' className='from_warp' onSubmit={this.submitPassWord} autoComplete="off">
            <label className='action_label'>
              旧密码:
                    <input
                className='action_input'
                type="password"
                placeholder="········"
                value={oldpassword}
                onChange={(e) => { this.setState({ oldpassword: e.target.value }) }}
              />
            </label>
            <label className='action_label'>
              新密码:
                    <input
                className='action_input'
                type="password"
                placeholder="········"
                value={newpassword1}
                onChange={(e) => {
                  this.setState({ newpassword1: e.target.value });
                  if (!PATTREN.username.test(e.target.value)) {
                    e.target.setCustomValidity("密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)")
                  } else {
                    e.target.setCustomValidity("")
                  }

                }}
              />
            </label>
            <label className='action_label'>
              再次输入新密码:
                    <input
                className='action_input'
                type="password"
                placeholder='········'
                value={newpassword2}
                onChange={(e) => {
                  this.setState({ newpassword2: e.target.value });
                  if (this.state.newpassword1 != e.target.value) {
                    e.target.setCustomValidity("两次输入密码不同！")
                  } else {
                    e.target.setCustomValidity("")
                  }

                }}
              />
            </label>
          </form>
        </Modal>


        <Modal
          title="永久销毁账户"
          wrapClassName="vertical-center-modal"
          visible={destroyUserModal}
          onOk={this.sumitDestroyUser}
          onCancel={this.hideDestroyUser}
          confirmLoading={destroyLoading}
          okText="永久销毁"
          cancelText="取消"
          maskStyle={{ background: 'rgba(208,2,27,0.75)' }}
        >
          <p>
            <Icon type="warning" /> 当心！永久销毁账户将清除您的账户，并销毁账户内<br />所有文件。该操作不可恢复！
                </p>
          <form action='' className='from_warp' onSubmit={this.sumitDestroyUser} autoComplete="off">
            <label className='action_label'>
              请输入密码确认:
                    <input
                className='action_input'
                type="text"
                placeholder='········'
                value={destroyPassword}
                onChange={(e) => { this.setState({ destroyPassword: e.target.value }) }}
              />
            </label>
          </form>
        </Modal>






        <style>{`

        .action_input[readOnly="readOnly"]{
          cursor: not-allowed;
          // background:#ccc
        }
        .footer{
          display:none
        }
        .vertical - center - modal {
          text-align: center;
          white-space: nowrap;
        }
        
        .vertical-center-modal:before {
            content: '';
          display: inline-block;
          height: 100%;
          vertical-align: middle;
          width: 0;
        }
        
        .vertical-center-modal .ant-modal {
            display: inline-block;
             vertical-align: middle;
          top: 0;
          text-align: left;
        }
        
        .vertical-center-modal {
            display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .vertical-center-modal .ant-modal {
            top: 0;
        }
       `}</style>
      </section>

    );
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

export default connect(mapStateToProps)(PersonalDetails);