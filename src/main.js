import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'components/app.vue';
import Routers from './router.js';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import { config } from '@/config';

Vue.use(VueRouter);
Vue.use(ViewUI);

// 生产环境关掉提示
Vue.config.productionTip = false
//全局注册应用配置
Vue.prototype.$config = config
// The routing configuration
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});