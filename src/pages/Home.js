import React from 'react';
import '../styles/home-layout.less';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import CustomHeader from '../layout/CustomHeader'
import BreadcrumbCustom from '../layout/BreadcrumbCustom'
import CustomSider from '../layout/CustomSider'
import Routes from './home/router';
import $　from 'jquery'
const { Content, Footer, Sider } = Layout;

// import Routes from './routes';





class HomeLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalFile:[],
        }
    };

    componentWillMount(){
      this.getTotalFile()
    }
  componentDidMount() {
    let { logIn } = this.props;
    // console.log(logIn)
    //如果登录状态为false则跳到登录页面
    if (!logIn) {
      this.props.history.push('/login')
    }
      window.document.title = '网盘'
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { history } = this.props;
    if (nextProps.status === 'null') {
      history.push('/login')
      return false;
    }
    if (nextProps.logIn !== this.props.logIn && nextProps.logIn === false) {
      //will redirect
      console.log('登录成功')
      this.props.history.push('/')
      return false;
    }
    return true;
  }
  getTotalFile(){
      var self = this;
      $.ajax({
          url: '/api/kanbox/total_file/',
          type: 'GET',
          dataType: 'json',
          cache: false,
          success: function (data) {
              // console.log(JSON.stringify(data.data[0]))
              if(data.code==200){
                  self.setState({
                      totalFile:[data.data[0].file_count,data.data[0].file_size]
                  })

              }else{
                  self.setState({

                  })
              }

          },
          error: function () {
              self.setState({

              })
          }
      })
  }
  render() {
    const { children, user } = this.props;
    return (
      <Layout style={{ height: '100%' }}>
        <CustomHeader />
        <Content >
          <BreadcrumbCustom />
          <Layout>
            <CustomSider user={user} />
            <div className="content-right">
              <Routes />
            </div>
          </Layout>
        </Content>
        <footer className="footer">
          共 {this.state.totalFile[0]} 个条目，占用空间 {this.state.totalFile[1]}
          </footer>
      </Layout>
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

export default connect(mapStateToProps)(HomeLayout);