
import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);  //applyMiddleware添加中间件处理异步函数
function configureStore() {
    const store = createStoreWithMiddleware(reducers);
    return store;
}


export default configureStore;