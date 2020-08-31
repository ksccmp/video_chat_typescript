import axios, { AxiosInstance } from 'axios';

const axiosAPI: AxiosInstance = axios.create({
    // baseURL: 'http://localhost:8080/videochat', // axios 사용할 때 path앞에 baseURL이 항상 추가
    baseURL: 'https://ksccmp.iptime.org/videochat', // 배포
});

export default axiosAPI;
