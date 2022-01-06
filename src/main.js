import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'
import App from './App';
import router from './router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import config from '@/config';

//iview自定义主题
import './my-theme/index.less';

Vue.use(VueRouter);
Vue.use(ViewUI);

// 生产环境关掉提示
Vue.config.productionTip = false
//全局注册应用配置
Vue.prototype.$config = config
// The routing configuration


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});