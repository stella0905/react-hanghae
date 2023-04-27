import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1,
  //0.0001초안에 응답을 안주면 오류를 내버린다는 의미 / 무조건 오류남.
})


instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    console.log('인터셉터 요청성공!')
    return config
  },
  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log('인터셉터 요청 오류!')
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    console.log('인터셉터 응답 받았습니다.')
    return response
  },
  // 오류 오류 응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log('인터셉터 응답 오류 발생')
    return Promise.reject(error)
  }
)

export default instance