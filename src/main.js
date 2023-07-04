import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// bootstrap and popper
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';

const app = createApp(App);

axios.defaults.baseURL = 'https://novrirahman.my.id/library/';

app.use(router);

app.mount('#app');
