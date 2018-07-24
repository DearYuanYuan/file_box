## 前端结构

#### 1.入口文件  src/index.js

actions,reducers,store目录下为redux相关文件

#####   Action 
中文译动作行为,行动.像它的名字一样,我们在redux体系中修改一个状态必须先发出action ,action是行为,一个行为可以分为不同的几种类型,比如打人,打别人左脸是一种type ,打右脸也是一种type,当然选择不打也是这种行为的一种体现方式.我们选择的type就会影响到这个人受挨打后的状态,那也就是他可能第二天左脸肿了,或右脸.
所以这里一种打人行为的几种处理方式,会造成不同的表现结果,也就是我们所谓的 ui对应的各种展现方式.


#####  dispatch
调度,我们定义了各种各样的行为,redux是单向数据流,想要触发action我们需要使用dispath(increase)来触发

##### connect
React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
connect 在我理解看来就是,连接reducers处理函数与ui的一个方法.

##### reducers
dispath 将action派发到reducers中我们根据派发过来的actions.type来具体确定使用什么业务逻辑来改变一些数据,致使ui发生改变,如图,我们可以自定义state的初始状态


#####  store

reducers处理完成后,store如何更新的?应该这么问reducers处理函数直接影响了新的视图, 在src/index.js中<Provider store={store}>在将store传入



#### 2.一级路由   src/App.js

#### 3. src/fonts   字体文件

#### 4. src/layout  页面布局
+ BreadcrumbCustom.js  面包屑模块
+ CustomHeader.js   自定义页面头
+ CustomSider.js    自定义页面侧边栏

#### 3. src/pages   各个模块的js文件



#### 4. src/styles   样式

#### 5. src/utils   封装的一些方法

+   src/utils/cookie.js   获取和删除cookie方法
+   src/utils/request.js   post和get请求封装
+   src/utils/urls.js     项目中所有的url地址



#### 6. src/components   自定义封装的组件


