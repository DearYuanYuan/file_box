import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'       //导入react-redux <Provider/>组件
import configureStore from './store/index'   //导入store
import './styles/index.less';                //样式
import App from './App';
let store = configureStore();
// import registerServiceWorker from './registerServiceWorker';

if(module.hot){
    module.hot.accept();
}


//APP外层用<Provider/>组件包裹 将store传入,方便全局控制
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
// registerServiceWorker();
