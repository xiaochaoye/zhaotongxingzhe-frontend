import axios from "axios";
import { showToast } from "vant";

const myAxios = axios.create({
    baseURL:'http://localhost:8080/api'
})

myAxios.defaults.withCredentials = true;

myAxios.interceptors.request.use(function(config){
    console.log('我开始发请求了')
    return config;
}),
function (error: any) {
    return Promise.reject(error);
};

myAxios.interceptors.response.use(function (response) {
    if (response?.data?.code === 40100) {
        showToast({
            message: '未登录，请登录或注册',
            icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
          });
    }
    return response.data;
}),
function (error: any) {
    return Promise.reject(error)
};

export default myAxios;