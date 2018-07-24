

const domain = ''
// const domain = 'http://140.143.202.114:8080/'                            //域名
const URl = {

    domain: `${domain}`,
    creatAssets: `${domain}api/chain_trans/create/`,                     //新建资产
    login: `${domain}api/kanbox/log_in/`,                                        //登录
    downLoad: `${domain}api/chain_trans/down_tran_att/`,                 //下载
    getHistoryList: `${domain}api/chain_trans/query_trans_detail/`,      //历史记录
    modifyPass: `${domain}api/kanbox/modify_pass/`,                             //修改密码
    assetsTypeList: `${domain}api/chain_trans/query_tran_types/`,        //新建资产的类型选择
    assetsContent: `${domain}api/chain_trans/query_list/`,               //资产内容
    countsScore: `${domain}api/chain_trans/query_tran_counts/`,          //分数统计获取
    userMsg: `${domain}api/chain_user/query_detail/`,                    //用户个人信息获取
    modify: `${domain}api/kanbox/modify/`,                           //修改个人信息
    register: `${domain}api/kanbox/register/`,                                  //注册
    allUserList: `${domain}api/chain_user/query_all/`,                   //所有用户列表
    transfer: `${domain}api/chain_trans/transfer/`,                       //转移资产




    // login:`../../json/login.json`,
    
}
export default URl;