import 'es6-promise/auto'
import axios from 'axios'
import './bootstrap'

import Vue from 'vue'

import $ from 'jquery';
window.$ = window.jQuery = $;

require('overlayscrollbars');
window.moment = require('moment');
require('admin-lte/plugins/jquery-ui/jquery-ui.min');
require('admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js');
require('admin-lte/plugins/chart.js/Chart.min.js');
require('admin-lte/plugins/jqvmap/jquery.vmap.min');
require('admin-lte/plugins/jqvmap/maps/jquery.vmap.usa');
require('admin-lte/plugins/jquery-knob/jquery.knob.min');
require('admin-lte/plugins/daterangepicker/daterangepicker');
window.Sparkline = require('admin-lte/plugins/sparklines/sparkline');
require('admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min');
require('admin-lte/plugins/summernote/summernote.min');
require('admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min');
require('admin-lte/plugins/datatables/jquery.dataTables.min');
require('admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min');
require('admin-lte/dist/js/adminlte.min');





import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Index from './Index'
import auth from './auth'
import router from './router'
import {store} from './store';

// Set Vue globally
window.Vue = Vue
// Set Vue router
Vue.router = router
Vue.use(VueRouter)

// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = `${process.env.MIX_APP_URL}api/src`
Vue.use(VueAuth, auth)

import Sweetalert from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(Sweetalert);

Vue.component('index', Index)
const app = new Vue({
    el: '#app',
    store,
    router
});
