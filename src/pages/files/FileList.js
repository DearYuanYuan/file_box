import React from 'react';
import $ from 'jquery'
import '../../styles/files.less'
import Operate from './Operate.js'

import { connect } from 'react-redux';
import { changeBreadCrumb } from '../../actions/breadCrumb';    //引入面包屑组件

import createHistory from 'history/createHashHistory'
const history = createHistory()
class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayWay:true,//列表视图or图片icon视图
            fileUrlGet:[
                'get_task_info',//全部文件
                'rubbish_file',//回收站
                'search_file',//搜索
                'recently_viewed',//最近查看
                'get_shared_file',//分享
                'get_type_file',//视频、音频、表格、文档
            ],
            fileContent:[],//文件列表
            fileSelectOperate:false,//页面中是否有文件被选中
            selectAll:false, //是否全选
            fileAjaxTips:'',//加载文件列表时的错误提示
            operateFileBox:false,//文件增删改上传下载等弹框
            operateFileResult:false,//文件操作成功提示
            operateFileAction:'',//文件增删改上传下载操作类型，以此确定显示哪一个弹框组件
            operateFileMsg:[],//文件增删改上传下载操作类型，不同的title信息
            operateFileError:'',//文件操作失败信息提示
            loadingAction:false, //文件列表页面请求文件列表loading
            loadingFileAction:false,//文件操作弹框确定时loading

        }
    };
    //更换列表展示
    changeDisplayWay(state){
        this.setState({
            displayWay:this.state.displayWay==state?state:!this.state.displayWay,
            fileSelectOperate:false,
        })
    }
    /*
    * 遍历文件列表，是否有文件被选中，
    * 发现有选中的文件，就跳出循环
    * */
    selectedEach(ele,className){
        var self = this
        $(ele).each(function (index,e) {
            if($(e).hasClass(className)){
                self.setState({
                    fileSelectOperate:true
                })
                return false;
            }else{
                self.setState({
                    fileSelectOperate:false
                })
            }
        })
    }
    //列表或者图片icon点击
    filesSelect(index,display,fileId,fileName,e){
        e.stopPropagation();
        e.preventDefault();
        //选中文件的id和name
        this.setState({
            operateFileMsg:[fileId,fileName]
        })
        switch(display){
            case "box" :
                $('.fileCover li').eq(index).toggleClass('li-checked').siblings().removeClass('li-checked');
                //判断是否有文件被选中
                this.selectedEach($('.fileCover li'),'li-checked')
                break;
            case "list" :
                //取消全选
                // $('.fileTableBox thead tr th').removeClass('checkBoxSelected')

                $('.fileTableBox tbody tr').eq(index).find('td').eq(0).toggleClass('checkBoxSelected');
                $('.fileTableBox tbody tr').eq(index).siblings().each(function (index,ele) {
                    $(ele).find('td').eq(0).removeClass('checkBoxSelected')
                })
                //判断是否有文件被选中
                this.selectedEach($('.fileTableBox tbody tr td'),'checkBoxSelected')
                break;
        }

    }
    //todo 全选 多项选择
    // selectAll(e){
    //     this.setState({
    //         selectAll:!this.state.selectAll
    //     })
    //     var list = $('.fileTableBox tbody tr')
    //     list.map((index,every)=>{
    //         switch(!this.state.selectAll){
    //             case true :
    //                 $(e.target).addClass('checkBoxSelected')
    //                 $(every).find('td').eq(0).addClass('checkBoxSelected');
    //                 break;
    //             case false :
    //                 $(e.target).removeClass('checkBoxSelected')
    //                 $(every).find('td').eq(0).removeClass('checkBoxSelected');
    //                 break;
    //         }
    //
    //     })
    // }
    //列表点击显示更多操作
    showOperation(index,e){
        e.stopPropagation()
        $('.fileTableBox tbody tr').eq(index).find('td .operation-box').fadeIn(500);
    }
    //列表点击隐藏更多操作
    hideOperation(index,e){
        e.stopPropagation()
        $('.fileTableBox tbody tr').eq(index).find('td .operation-box').fadeOut(500);
    }
    //获取指定文件夹的目录
    /*
    * dir_id ： 文件夹id
    * path ： 文件夹名 （生成标题的目录）
    * */
    fileGetList(dir_id,path){
        //首先要将页面中所有选择的文件取消选中，右侧操作按钮恢复
        $('.fileCover li').removeClass('li-checked');
        $('.fileTableBox tbody tr td').eq(0).removeClass('checkBoxSelected');
        this.setState({
            fileSelectOperate:false,//页面没有文件被选中
        })
        // 搜索、全部文件、页面时，请求文件夹内容
        // 请求url、文件id

        var url;
        var urlData;
        switch(this.props.getAllFileType){
            case 'allFile': case 'search' :
                url = '/api/kanbox/'+this.state.fileUrlGet[0]+'/';
                urlData = {
                    dir_id:dir_id
                }
                break;
            case 'trash' :
                url = '/api/kanbox/'+this.state.fileUrlGet[1]+'/';
                urlData = {
                    dir_id:dir_id
                }
                break;
            case 'recently' :
                url = '/api/kanbox/'+this.state.fileUrlGet[3]+'/';
                urlData = {

                }
                break;
            case 'share' :
                url = '/api/kanbox/'+this.state.fileUrlGet[4]+'/';
                urlData = {

                }
                break;
            case 'music' :
                url = '/api/kanbox/'+this.state.fileUrlGet[5]+'/';
                urlData = {
                    type:1
                }
                break;
            case 'audio' :
                url = '/api/kanbox/'+this.state.fileUrlGet[5]+'/';
                urlData = {
                    type:2
                }
                break;
            case 'word' :
                url = '/api/kanbox/'+this.state.fileUrlGet[5]+'/';
                urlData = {
                    type:3
                }
                break;
            case 'image' :
                url = '/api/kanbox/'+this.state.fileUrlGet[5]+'/';
                urlData = {
                    type:0
                }
                break;
        }
        this.setState({
            loadingAction:true,//loading显示
            fileContent:false,//将文件列表内容数据设置为false
            fileAjaxTips:'',//文件列表加载错误提示
        })
        this.getAjaxFileList(dir_id,path,url,urlData)
    }
    /*
    * 页面第一次加载文件列表
    * 判断是哪个type，加载不同的接口
    * */
    ajaxGetFile(dir_id,path){
        //首先要将页面中所有选择的文件取消选中，右侧操作按钮恢复
        $('.fileCover li').removeClass('li-checked');
        $('.fileTableBox tbody tr td').eq(0).removeClass('checkBoxSelected');
        this.setState({
            fileSelectOperate:false,//页面没有文件被选中
        })
        this.changeApiUrl(dir_id,path)
    }
    /*
     * 左侧导航栏或者搜索进入页面获取文件列表，访问不同的接口，传入不同的参数
     * 需要做下列处理
     * getAllFileType ： 获取文件的不同方式
     * */
    changeApiUrl(dir_id,path){
        var url;
        var urlData;
        switch(this.props.getAllFileType){
            case 'allFile':
                url = '/api/kanbox/'+this.state.fileUrlGet[0]+'/';
                urlData = {
                    dir_id:dir_id
                }
                break;
            case 'trash' :
                url = '/api/kanbox/'+this.state.fileUrlGet[1]+'/';
                urlData = {
                    dir_id:dir_id
                }
                break;
            case 'search' :
                url = '/api/kanbox/'+this.state.fileUrlGet[2]+'/';
                urlData = {
                    keywords:this.props.searchKeyWord
                }
                break;
            case 'recently' :
                url = '/api/kanbox/'+this.state.fileUrlGet[3]+'/';
                urlData = {

                }
                break;
            case 'share' :
                url = '/api/kanbox/'+this.state.fileUrlGet[4]+'/';
                urlData = {

                }
                break;
            case 'music' :
                url = '/api/kanbox/'+this.state.fileUrlGet[5]+'/';
                urlData = {
                    type:1
                }
                break;
            case 'audio' :
                url = '/api/kanbox/'+this.state.fileUrlGet[5]+'/';
                urlData = {
                    type:2
                }
                break;
            case 'word' :
                url = '/api/kanbox/'+this.state.fileUrlGet[5]+'/';
                urlData = {
                    type:3
                }
                break;
            case 'image' :
                url = '/api/kanbox/'+this.state.fileUrlGet[5]+'/';
                urlData = {
                    type:0
                }
                break;
        }
        this.setState({
            loadingAction:true,//loading显示
            fileContent:false,//将文件列表内容数据设置为false
            fileAjaxTips:'',//文件列表加载错误提示
        })
        this.getAjaxFileList(dir_id,path,url,urlData)
    }
    /*
    * 根据不同的情况，传入不同的参数，获取文件列表
     * dir_id ： 文件夹id
     * path ： 文件夹名 （生成标题的目录）
     * url : 访问不同的后端接口
     * urlData : 访问不同后端接口传的参数
    * */
    getAjaxFileList(dir_id,path,url,urlData){
        var self = this;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            cache: false,
            data:urlData,
            success: function (data) {
                // console.log(JSON.stringify(data))
                if(data.code==200){
                    self.setState({
                        fileContent:data.data,
                        fileAjaxTips:(data.data.length==0)?'暂无内容':'',
                        loadingAction:false,
                    })
                    if(path==''){
                        //点击面包屑进入文件夹时，不额外再添加目录
                        return
                    }else if(path=='全部文件'){
                        //当页面加载获取总文件夹时
                        $('#title-nav').empty().append('<a name='+dir_id+'>'+path+' </a>')
                    }else {
                        //点击列表或者图片icon进入文件夹，需要给面包屑增加目录
                        $('#title-nav').append('<a name='+dir_id+'> <i class="fa fa-angle-right"></i> '+path+' </a>')
                    }

                }else{
                    self.setState({
                        fileAjaxTips:data.message,
                        loadingAction:false,
                    })
                }

            },
            error: function () {
                self.setState({
                    fileAjaxTips:'服务器繁忙，请稍后重试',
                    loadingAction:false,
                })
            }
        })
    }

    //弹框操作

    //文件操作按钮点击
    /*
     * operateFileAction : 操作类型
     * dir_id,file_name : 操作文件的id和name，当选组列表行右侧的按钮点击操作时
     * inline : 是否是列表内按钮点击文件操作按钮
     * operateFileMsg [
     *   操作的文件id
     *   操作的文件name
     *   title1
     *   title2
     *   title3
     * ]
     *
     * 移动和新建需要知道当前的目录id、第二个参数name为当前目录
     * 删除、分享、重命名、需要知道选中的文件名和id
     * */
    fileOperateAction(action,dir_id,file_name,inline){
        this.setState({
            operateFileBox:true,
            operateFileError:'',//初始化错误信息提示
        })
        if(inline=='inline'){
            //列表按钮点击时，会传入文件的id和name，这种情况不需要根据是否选中状态来定义文件的id和name
            var operateFileMsg = [dir_id,file_name];
        }else{
            var operateFileMsg = this.state.operateFileMsg
            //数组前两项分别是需要操作文件的id和name，所以每次弹框被点击显示，都将数组前两位截取
            operateFileMsg = operateFileMsg.slice(0,2);
        }

        switch (action){
            case 'upload' :
                //获取新建文件夹时，所在的目录以及目录id
                var dirId = $('#title-nav a:nth-last-child(1)').attr('name')
                var dirName = $('#title-nav a:nth-last-child(1)').text()
                //将operateFileMsg初始化
                operateFileMsg = [dirId,dirName]
                operateFileMsg.push(
                    '上传文件',
                    '所在文件夹：'+dirName,
                    '待上传文件',
                )
                this.setState({
                    operateFileAction:'upload',
                    operateFileMsg:operateFileMsg
                })
                break;
            case 'rename' :
                operateFileMsg.push(
                    '重命名',
                    '原始名称：' + operateFileMsg[1],
                    '文件/文件夹名称',
                )
                this.setState({
                    operateFileAction:'rename',
                    operateFileMsg:operateFileMsg
                })
                break;
            case 'new' :
                //获取新建文件夹时，所在的目录以及目录id
                var dirId = $('#title-nav a:nth-last-child(1)').attr('name')
                var dirName = $('#title-nav a:nth-last-child(1)').text()
                //将operateFileMsg初始化
                operateFileMsg = [dirId,dirName]
                operateFileMsg.push(
                    '新建文件夹',
                    '所属文件夹：'+ dirName,
                    '文件名称',
                )
                this.setState({
                    operateFileAction:'new',
                    operateFileMsg:operateFileMsg
                })
                break;
            case 'move' :
                operateFileMsg.push(
                    '移动至...',
                    '选取目标文件夹',
                    '',
                )
                this.setState({
                    operateFileAction:'move',
                    operateFileMsg:operateFileMsg
                })
                break;
            case 'delete' :
                operateFileMsg.push(
                    '删除文件',
                    '删除的文件可以在回收站中查看',
                    '待删除文件',
                )
                this.setState({
                    operateFileAction:'delete',
                    operateFileMsg:operateFileMsg
                })
                break;
            case 'share' :
                operateFileMsg.push(
                    '分享文件',
                    '您可随时取消分享，链接将自动失效',
                    '',
                )
                this.setState({
                    operateFileAction:'share',
                    operateFileMsg:operateFileMsg
                })
                break;
            case 'shareCancel' :
                operateFileMsg.push(
                    '取消分享文件',
                    '您可随时取消分享，链接将自动失效',
                    '',
                )
                this.setState({
                    operateFileAction:'shareCancel',
                    operateFileMsg:operateFileMsg
                })
                break;
            case 'deleteAll' :
                //清空回收站
                //将operateFileMsg初始化
                operateFileMsg = ['delete','delete']
                operateFileMsg.push(
                    '清空',
                    '清空您的回收站',
                    '',
                )
                this.setState({
                    operateFileAction:'deleteAll',
                    operateFileMsg:operateFileMsg
                })
                break;
            case 'recover' :
                operateFileMsg.push(
                    '还原文件',
                    '您可还原您删除的文件',
                    '',
                )
                this.setState({
                    operateFileAction:'recover',
                    operateFileMsg:operateFileMsg
                })
                break;
        }
    }
    //关闭弹框
    handleCloseOperateBox(){
        this.setState({
            operateFileBox:false
        })
    }
    /*
    * 删除
    * */
    deleteFile(dirId){
        var self  = this;
        $.ajax({
            url: '/api/kanbox/del_file/',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data:{
                file_id:dirId,
                state:1,
            },
            success: function (data) {
                // console.log(JSON.stringify(data))
                if(data.code==200){
                    self.setState({
                        operateFileBox:false,
                        loadingFileAction:false,
                    })
                    //文件操作成功页面小提示
                    self.operateFileSuccess()
                    //获取新建文件夹时，所在的目录以及目录id，面包屑最后一个路径元素属性name值
                    var dirId = $('#title-nav a:nth-last-child(1)').attr('name')
                    //请求获取文件结构
                    self.fileGetList(dirId,'')
                }else{
                    self.setState({
                        operateFileError:data.message,
                        loadingFileAction:false,
                    })
                }

            },
            error: function () {
                self.setState({
                    operateFileError:'服务器繁忙请稍后重试',
                    loadingFileAction:false,
                })
            }
        })
    }

    filePutRules(value){
        if(value==''){
            return false;
        }else{
            return true;
        }
    }
    /*
    * 重命名
    * */
    reNameFile(dirId){
        var value = $('.operate-model-reName').val()

        if(!this.filePutRules(value)){
            this.setState({
                operateFileError:'请输入文件名'
            })
        }else {
            var self  = this;
            $.ajax({
                url: '/api/kanbox/rename_file/',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data:{
                    file_id:dirId,
                    new_name:value,
                },
                success: function (data) {
                    // console.log(JSON.stringify(data))
                    if(data.code==200){
                        self.setState({
                            operateFileBox:false,
                            loadingFileAction:false,
                        })
                        //文件操作成功页面小提示
                        self.operateFileSuccess()
                        //获取新建文件夹时，所在的目录以及目录id，面包屑最后一个路径元素属性name值
                        var dirId = $('#title-nav a:nth-last-child(1)').attr('name')
                        //请求获取文件结构
                        self.fileGetList(dirId,'')
                    }else{
                        self.setState({
                            operateFileError:data.message,
                            loadingFileAction:false,
                        })
                    }

                },
                error: function () {
                    self.setState({
                        operateFileError:'服务器繁忙请稍后重试',
                        loadingFileAction:false,
                    })
                }
            })
        }

    }
    /*
    * 新建文件夹
    * */
    newFolder(){
        var value = $('.operate-model-newFile').val()

        if(!this.filePutRules(value)){
            this.setState({
                operateFileError:'请输入文件名'
            })
        }else{
            //获取新建文件夹时，所在的目录以及目录id，面包屑最后一个路径元素属性name值
            var dirId = $('#title-nav a:nth-last-child(1)').attr('name')

            var self  = this;
            $.ajax({
                url: '/api/kanbox/create_dir/',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data:{
                    dir_id:dirId,
                    dir_name:value,
                },
                success: function (data) {
                    // console.log(JSON.stringify(data))
                    if(data.code==200){
                        self.setState({
                            operateFileBox:false,
                            loadingFileAction:false,
                        })
                        //文件操作成功页面小提示
                        self.operateFileSuccess()
                        //请求获取文件结构
                        self.fileGetList(dirId,'')
                    }else{
                        self.setState({
                            operateFileError:data.message,
                            loadingFileAction:false,
                        })
                    }

                },
                error: function () {
                    self.setState({
                        operateFileError:'服务器繁忙请稍后重试',
                        loadingFileAction:false,
                    })
                }
            })
        }

    }

    /*
    * 移动文件
    * dirId : [操作的文件id，目标文件夹id] | type：array
    * */
    moveFile(dirId){
        if(dirId[1]===false){
            this.setState({
                operateFileError:'请选择您要移动到的文件夹',
                loadingFileAction:false,
            })
        }else{
            var self  = this;
            $.ajax({
                url: '/api/kanbox/move_file/',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data:{
                    file_id:dirId[0],
                    to_dir_id:dirId[1],
                },
                success: function (data) {
                    // console.log(JSON.stringify(data))
                    if(data.code==200){
                        self.setState({
                            operateFileBox:false,
                            loadingFileAction:false,
                        })
                        //文件操作成功页面小提示
                        self.operateFileSuccess()
                        //获取新建文件夹时，所在的目录以及目录id，面包屑最后一个路径元素属性name值
                        var currentId = $('#title-nav a:nth-last-child(1)').attr('name')
                        //请求获取当前路径文件结构
                        self.fileGetList(currentId,'')
                    }else{
                        self.setState({
                            operateFileError:data.message,
                            loadingFileAction:false,
                        })
                    }

                },
                error: function () {
                    self.setState({
                        operateFileError:'服务器繁忙请稍后重试',
                        loadingFileAction:false,
                    })
                }
            })
        }

    }
    /*
    * 上传
    * dirId : 当前上传文件的目录id
    * */
    uploadFile(dirId){
        //取得选择的文件的大小
        var file = $('#pickFileIpt')[0].files[0]
        // console.log(file)
        //若file不存在，则未选择文件
        if(!file){
            this.setState({
                operateFileError:'请选择您要上传的文件',
                loadingFileAction:false,
            })
        // }else if(file.size/1024>512){
        //     //当文件大于512kb
        //     this.setState({
        //         loadingFileAction:false,
        //     })
        }else{
            //文件< 10M
            this.setState({
                operateFileError:'',
            })
            var formData = new FormData();
            formData.append('current_id',dirId);
            formData.append('file',$('#pickFileIpt')[0].files[0]);
            var self  = this;
            $.ajax({
                url: '/api/kanbox/create/',
                type: 'POST',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data:formData,
                success: function (data) {
                    // console.log(JSON.stringify(data))
                    if(data.code==200){
                        self.setState({
                            operateFileBox:false,
                            loadingFileAction:false,
                        })
                        //文件操作成功页面小提示
                        self.operateFileSuccess()
                        //请求获取当前路径文件结构
                        self.fileGetList(dirId,'')
                    }else{
                        self.setState({
                            operateFileError:data.message,
                            loadingFileAction:false,
                        })
                    }

                },
                error: function () {
                    self.setState({
                        operateFileError:'服务器繁忙请稍后重试',
                        loadingFileAction:false,
                    })
                }
            })
        }
    }
    /*
    * todo 下载
    * file_id:self.state.operateFileMsg[0], //文件id
    * */
    downLoadFile(){

        var self  = this;
        $.ajax({
            url: '/api/kanbox/down_tran_att/',
            type: 'GET',
            dataType: 'json',
            cache: false,
            data:{
                file_id:self.state.operateFileMsg[0],
            },
            success: function (data) {
                // console.log(JSON.stringify(data))
                if(data.code==200){
                    var url = data.url

                    var link = document.createElement('a'); //创建事件对象
                    link.setAttribute('href', url);//a元素增加href属性
                    link.setAttribute("download", '');//增加download属性
                    link.click()
                    //var event = document.createEvent("MouseEvents"); //初始化事件对象
                    //event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //触发事件
                    // var event = new MouseEvent("click", {
                    //     bubbles: true,
                    //     cancelable: true,
                    //     view: window
                    // });
                    //link.dispatchEvent(event);//监听事件
                    //文件操作成功页面小提示
                    self.operateFileSuccess()
                }else{
                    self.setState({
                        fileAjaxTips:data.message
                    })
                }

            },
            error: function () {
                self.setState({
                    fileAjaxTips:'服务器繁忙请稍后重试'
                })
                // var url = 'http://192.168.1.239:8100/chain-attach/2018-05-25-16-37-13d268962a-5ff6-11e8-9139-0242ac105102-1.txt'
                //
                // var link = document.createElement('a'); //创建事件对象
                // link.setAttribute('href', url);//a元素增加href属性
                // link.setAttribute("download", '');//增加download属性
                // //var event = document.createEvent("MouseEvents"); //初始化事件对象
                // // event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //触发事件
                // var event = new MouseEvent("click", {
                //     bubbles: true,
                //     cancelable: true,
                //     view: window
                // });
                // link.dispatchEvent(event);//监听事件
            }
        })
    }
    /*
    * 分享
    * */
    shareFile(){
        this.setState({
            operateFileBox:false,
            loadingFileAction:false,
        })
    }
    /*
    * 回收站清空
    * todo 回收站选择性删除
    *
    * */
    emptyAllFile(){
        var self  = this;
        $.ajax({
            url: '/api/kanbox/del_rubbish_file/',
            type: 'GET',
            dataType: 'json',
            cache: false,
            data:{

            },
            success: function (data) {
                console.log(JSON.stringify(data))
                if(data.code==200){
                    self.setState({
                        operateFileBox:false,
                        loadingFileAction:false,
                    })
                    //文件操作成功页面小提示
                    self.operateFileSuccess()
                    //刷新回收站
                    self.ajaxGetFile(0,'')
                }else{
                    self.setState({
                        operateFileError:data.message,
                        loadingFileAction:false,
                    })
                }

            },
            error: function () {
                self.setState({
                    operateFileError:'服务器繁忙请稍后重试',
                    loadingFileAction:false,
                })

            }
        })
    }
    /*
     * 回收站还原
     *
     * */
    recoverFile(dirId){

        var self  = this;
        $.ajax({
            url: '/api/kanbox/recover_rubbish_file/',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data:{
                file_id:dirId
            },
            success: function (data) {
                // console.log(JSON.stringify(data))
                if(data.code==200){
                    self.setState({
                        operateFileBox:false,
                        loadingFileAction:false,
                    })
                    //文件操作成功页面小提示
                    self.operateFileSuccess()
                    //刷新回收站
                    self.ajaxGetFile(0,'')
                }else if(data.code==202){   //如果待还原文件的上层文件夹被删除了
                    let operateFileMsg = self.state.operateFileMsg.slice(0,-1)
                    operateFileMsg.push('此文件的上层文件夹已被删除，此文件将被还原到网盘根目录。您确定吗？')
                    self.setState({
                        operateFileBox:true,
                        operateFileAction:'recoverToRoot',
                        loadingFileAction:false,
                        operateFileMsg:operateFileMsg
                    })

                }else{
                    self.setState({
                        operateFileError:data.message,
                        loadingFileAction:false,
                    })
                }

            },
            error: function () {
                self.setState({
                    operateFileError:'服务器繁忙请稍后重试',
                    loadingFileAction:false,
                })

            }
        })

    }

    /*  
     * 
     *
     **/
    /**
     * 回收站还原文件到根目录
     * @param  {int} dirId 文件id
     */
    recoverFileToRoot(dirId){
        var self  = this;
        $.ajax({
            url: '/api/kanbox/recover_rubbish_file_root/',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data:{
                file_id:dirId
            },
            success: function (data) {
                // console.log(JSON.stringify(data))
                if(data.code==200){
                    self.setState({
                        operateFileBox:false,
                        loadingFileAction:false,
                    })
                    //文件操作成功页面小提示
                    self.operateFileSuccess()
                    //刷新回收站
                    self.ajaxGetFile(0,'')
                }else{
                    self.setState({
                        operateFileError:data.message,
                        loadingFileAction:false,
                    })
                }
            },
            error: function () {
                self.setState({
                    operateFileError:'服务器繁忙请稍后重试',
                    loadingFileAction:false,
                })

            }
        })

    }
    /*
    * 取消文件分享
    * */
    shareFileLinkCancel(dirId){
        var self  = this;
        $.ajax({
            url: '/api/kanbox/close_share_file/',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data:{
                id:dirId
            },
            success: function (data) {
                // console.log(JSON.stringify(data))
                if(data.code==200){
                    self.setState({
                        operateFileBox:false,
                        loadingFileAction:false,
                    })
                    //文件操作成功页面小提示
                    self.operateFileSuccess()
                    //刷新回收站
                    self.ajaxGetFile(0,'')
                }else{
                    self.setState({
                        operateFileError:data.message,
                        loadingFileAction:false,
                    })
                }

            },
            error: function () {
                self.setState({
                    operateFileError:'服务器繁忙请稍后重试',
                    loadingFileAction:false,
                })

            }
        })
    }
    //文件操作确认
    /*
    * type : 文件操作类型
    * id : 操作文件的id
    *
    * */
    handleConfirmOperateBox(dirId,operateAction){
        this.setState({
            loadingFileAction:true, //显示loading
            operateFileError:'',//清除上次遗留的错误提示
        })
        switch (operateAction){
            case 'upload' :
                this.uploadFile(dirId)
                break;
            case 'rename' :
                this.reNameFile(dirId)
                break;
            case 'new' :
                this.newFolder(dirId)
                break;
            case 'move' :
                this.moveFile(dirId)
                break;
            case 'delete' :
                this.deleteFile(dirId);
                break;
            case 'share' :
                this.shareFile();
                break;
            case 'deleteAll' :
                this.emptyAllFile();
                break;
            case 'recover' :
                this.recoverFile(dirId);
                break;
            case 'recoverToRoot' :
                this.recoverFileToRoot(dirId);
                break;
            case 'shareCancel' :
                this.shareFileLinkCancel(dirId);
                break;
        }
    }
    /*
    * 文件增删改等操作时，成功完成，页面显示一行绿色的提示文字
    * 2s后隐藏
    * */
    operateFileSuccess(){
        this.setState({
            operateFileResult:true, //显示文件操作成功小提示文字
        })
        var self = this;
        setTimeout(()=>{
            self.setState({
                operateFileResult:false, //显示文件操作成功小提示文字
            })
        },2000)
    }
    //控制面包屑的文字显示,以及点击后返回当前的一级目录
    changeBreadcrumb = (text, path) => {
        let opt = {
            'text': text,
            'path': path
        }
        this.props.dispatch(changeBreadCrumb(opt));
    }

    componentDidMount(){
        //获取文件列表
        this.ajaxGetFile(0,'全部文件')
        var self = this;
        $('#title-nav ').on('click','a',function () {
            //获取之前存储的文件夹id
            var dirId = $(this).attr('name')
            //请求获取文件结构
            self.fileGetList(dirId,'')
            //移除此节点之后的所有a节点
            $(this).nextAll().remove()
        })
    }

    render() {
        return (

            <div className="fileBox">
                {
                    this.state.operateFileResult &&
                    <p className="operateTips">文件操作成功</p>
                }
                <h1 className="show-way-title clearfloat">

                    <b id="title-nav"></b>

                    <i className= { !this.state.displayWay ?
                        'fa fa-bars show-way-icon select-way' :
                        'fa fa-bars show-way-icon '}
                       onClick={this.changeDisplayWay.bind(this,false)}
                    ></i>
                    <i className= { this.state.displayWay ?
                        'fa fa-th-large show-way-icon select-way' :
                        'fa fa-th-large show-way-icon'}
                       onClick={this.changeDisplayWay.bind(this,true)}></i>

                </h1>
                {
                    this.state.loadingAction &&
                    <div className="loadingAction">
                        <i className="fa fa-spinner fa-spin fa-2x"></i>
                    </div>
                }

                {
                    this.state.displayWay &&
                    <div className="displayBox">
                        <ul className="fileCover clearfloat" >
                        {
                            this.state.fileContent &&
                                this.state.fileContent.map((data,index)=>{
                                    var imgIcon ;
                                    switch(data.file_type){
                                        case 'dir' :
                                            imgIcon = require("../../images/file-dir.png")
                                            break;
                                        case 'mp4' :
                                            imgIcon = require("../../images/vid.png")
                                            break;
                                        case 'doc' : case 'docx' :
                                            imgIcon = require("../../images/doc.png")
                                            break;
                                        case 'xls' : case 'xlsx' :
                                            imgIcon = require("../../images/xls.png")
                                            break;
                                        case 'mp3' :
                                            imgIcon = require("../../images/audio.png")
                                            break;
                                        case 'js' : case 'json' :
                                            imgIcon = require("../../images/code.png")
                                            break;
                                        case 'png' : case 'svg' : case 'jpg': case 'gif' : case 'jpeg' :
                                            imgIcon = require("../../images/img.png")
                                            break;
                                        default :
                                            imgIcon = require("../../images/files.png")
                                            break;
                                    }
                                return(
                                    <li className="file-list" key={index}>
                                        {/*回收站文件夹不能点击*/}
                                        <div className="file-block"
                                             onClick={(data.file_type=='dir' && this.props.getAllFileType != 'trash')?
                                                 this.fileGetList.bind(this,data.id,data.file_name):
                                                 ()=>{}
                                             }>
                                            <a href="" className="file-selected" onClick={this.filesSelect.bind(this,index,'box',data.id,data.file_name)}></a>
                                            <img src={imgIcon} alt=""/>
                                            <p className="file-name">{data.file_name}</p>
                                            <p className="file-size">{data.file_type == 'dir' ? '-' :data.file_size}</p>
                                        </div>

                                    </li>
                                    )

                                })
                        }
                        </ul>
                    </div>

                }
                {
                    !this.state.displayWay &&
                    <div className="displayLine">
                        {
                            this.state.fileContent &&
                            <table className="fileTableBox">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>文件名称</th>
                                    <th>最后修改时间</th>
                                    <th>大小</th>
                                    <th>文件类型</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {

                                    this.state.fileContent.map((data,index)=>{
                                        var imgIcon ;
                                        switch(data.file_type){
                                            case 'dir' :
                                                imgIcon = require("../../images/folder-small.png")
                                                break;
                                            case 'mp4' :
                                                imgIcon = require("../../images/vid-small.png")
                                                break;
                                            case 'doc' : case 'docx' :
                                                imgIcon = require("../../images/doc-small.png")
                                                break;
                                            case 'xls' : case 'xlsx' :
                                                imgIcon = require("../../images/xls-small.png")
                                                break;
                                            case 'mp3' :
                                                imgIcon = require("../../images/audio-small.png")
                                                break;
                                            case 'js' : case 'json' :
                                                imgIcon = require("../../images/code-small.png")
                                                break;
                                            case 'png' : case 'svg' : case 'jpg': case 'gif' : case 'jpeg' :
                                                imgIcon = require("../../images/img-small.png")
                                                break;
                                            default :
                                                imgIcon = require("../../images/files-small.png")
                                                break;
                                        }
                                        {/*回收站文件夹不能点击*/}
                                        return(
                                            <tr key={index}
                                                onClick={(data.file_type=='dir' && this.props.getAllFileType != 'trash')?
                                                    this.fileGetList.bind(this,data.id,data.file_name):
                                                    ()=>{}
                                                }>
                                                <td className="checkBoxSelect"  onClick={this.filesSelect.bind(this,index,'list',data.id,data.file_name)} ></td>
                                                <td>
                                                    <img src={imgIcon} alt=""/>
                                                    <b>{data.file_name}</b></td>
                                                <td>{data.edittime}</td>
                                                <td>{data.file_type == 'dir' ? '-' :data.file_size}</td>
                                                <td>{data.file_type}</td>
                                                {
                                                    //只有请求所有文件时，才有右侧按钮
                                                    this.props.getAllFileType == 'allFile' &&
                                                    <td onMouseLeave={this.hideOperation.bind(this,index)}
                                                        onClick={this.showOperation.bind(this,index)} style={{position:'relative'}}>
                                                        <button className="buttonOperate operation-total">···</button>
                                                        <div className="operation-box">
                                                            <p onClick={this.fileOperateAction.bind(this,'rename',data.id,data.file_name,'inline')}>重命名</p>
                                                            <p onClick={this.fileOperateAction.bind(this,'delete',data.id,data.file_name,'inline')}>删除</p>
                                                            <p onClick={this.fileOperateAction.bind(this,'move',data.id,data.file_name,'inline')}>移动</p>
                                                            <p onClick={this.fileOperateAction.bind(this,'share',data.id,data.file_name,'inline')}>分享</p>
                                                        </div>
                                                    </td>
                                                }

                                            </tr>
                                        )

                                    })
                                }


                                </tbody>
                            </table>
                        }

                    </div>
                }

                {
                    (this.props.getAllFileType == 'allFile') &&
                    <div className="rightOperate">
                        <p className="selectNum">目前版本不支持多选</p>
                        {
                            !this.state.fileSelectOperate &&
                            <button className="buttonOperate file-upload"
                                    onClick={this.fileOperateAction.bind(this,'upload')}><i className="fa fa-upload icon-operate"></i>上传</button>
                        }

                        {
                            this.state.fileSelectOperate &&
                            <button className="buttonOperate file-download"
                                onClick={this.downLoadFile.bind(this)}><i className="fa fa-download icon-operate"></i>下载</button>
                        }

                        <p className="line-separate"></p>
                        {
                            !this.state.fileSelectOperate &&
                            <button className="buttonOperate file-other-action"
                                    onClick={this.fileOperateAction.bind(this,'new')}><i className="fa fa-folder icon-operate"></i>新建文件夹</button>
                        }
                        {
                            this.state.fileSelectOperate &&
                            <div>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'delete')}><i className="fa fa-trash icon-operate"></i>删除</button>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'rename')}><i className="fa fa-edit icon-operate"></i>重命名</button>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'share')}><i className="fa fa-share-alt icon-operate"></i>分享</button>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'move')}><i className="fa fa-clone icon-operate"></i>移动到</button>
                            </div>

                        }

                    </div>
                }

                {/*/!*todo 删除、还原*!/*/}
                {/*<div className="rightOperate">*/}
                    {/*<p className="selectNum">目前版本不支持多选</p>*/}
                    {/*<button className="buttonOperate file-upload"><i className="fa fa-trash icon-operate"></i>删除</button>*/}
                    {/*<button className="buttonOperate file-download"><i className="fa fa-reply icon-operate"></i>还原</button>*/}
                {/*</div>*/}
                {
                    this.props.getAllFileType == 'trash' &&
                    <div className="rightOperate">
                        <p className="selectNum">目前版本不支持选择性删除</p>
                        <button className="buttonOperate file-upload"
                                onClick={this.fileOperateAction.bind(this,'deleteAll')}><i className="fa fa-trash icon-operate"></i>清空</button>
                        {
                            this.state.fileSelectOperate &&
                            <button className="buttonOperate file-download"
                                    onClick={this.fileOperateAction.bind(this,'recover')}><i className="fa fa-reply icon-operate"></i>还原</button>
                        }

                    </div>

                }
                {
                    this.props.getAllFileType == 'share' &&
                    <div className="rightOperate">
                        <p className="selectNum">目前版本不支持多选</p>

                        {
                            this.state.fileSelectOperate &&
                            <button className="buttonOperate file-download"
                                    onClick={this.downLoadFile.bind(this)}><i className="fa fa-download icon-operate"></i>下载</button>
                        }

                        <p className="line-separate"></p>

                        {
                            this.state.fileSelectOperate &&
                            <div>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'delete')}><i className="fa fa-trash icon-operate"></i>删除</button>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'shareCancel')}><i className="fa fa-share-alt icon-operate"></i>取消分享</button>
                            </div>

                        }

                    </div>
                }
                {
                    (   this.props.getAllFileType == 'search'||
                        this.props.getAllFileType == 'recently'||
                        this.props.getAllFileType == 'music'||
                        this.props.getAllFileType == 'word'||
                        this.props.getAllFileType == 'image'||
                        this.props.getAllFileType == 'audio')&&
                    <div className="rightOperate">
                        <p className="selectNum">目前版本不支持多选</p>

                        {
                            this.state.fileSelectOperate &&
                            <button className="buttonOperate file-download"
                                    onClick={this.downLoadFile.bind(this)}><i className="fa fa-download icon-operate"></i>下载</button>
                        }

                        <p className="line-separate"></p>

                        {
                            this.state.fileSelectOperate &&
                            <div>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'delete')}><i className="fa fa-trash icon-operate"></i>删除</button>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'rename')}><i className="fa fa-edit icon-operate"></i>重命名</button>
                                <button className="buttonOperate file-other-action"
                                        onClick={this.fileOperateAction.bind(this,'share')}><i className="fa fa-share-alt icon-operate"></i>分享</button>
                            </div>

                        }

                    </div>
                }
                {
                    this.state.operateFileBox &&
                    <Operate
                        operateFileAction = {this.state.operateFileAction}
                        operateFileMsg = {this.state.operateFileMsg}
                        operateFileError = {this.state.operateFileError}
                        loadingFileAction = {this.state.loadingFileAction}
                        handleCloseOperateBox = {this.handleCloseOperateBox.bind(this)}
                        handleConfirmOperateBox = {this.handleConfirmOperateBox.bind(this)}
                    />
                }

                <p className="selectNum">{this.state.fileAjaxTips}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const BreadcrumbReducer = state.BreadcrumbReducer;
    return {
        breadCrumb: BreadcrumbReducer.breadCrumb
    }
}

export default connect(mapStateToProps)(FileList);
