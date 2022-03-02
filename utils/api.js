import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_BACKEND_DEVELOP2
  : process.env.NEXT_PUBLIC_BACKEND_DEVELOP2;
// axios.defaults.withCredentials = true;

/* 회원가입을 위한 함수*/
const joinApi = async ({ name, identity, password, phoneNumber }) => {
  let res = {
    isSuccess: false,
    data: null,
  }

  if (name.length < 2) {
    res.data = "이름을 채워주세요"
  }
  else if (identity.length < 5 || identity.legnth > 15) {
    res.data = "아이디는 5~15글자이여야 합니다."
  }
  else if (password.length < 8 || password.legnth > 20) {
    res.data = "패스워드는 8~20글자이여야 합니다."
  }
  else if (phoneNumber[0].length !== 3 ||
    (phoneNumber[1].length < 3 || phoneNumber[1].length > 4) ||
    (phoneNumber[2].length < 3 || phoneNumber[2].length > 4)) {
    res.data = "휴대폰 번호를 기입해주세요"
  }
  else {
    const body = {
      name: name,
      identity: identity,
      password: password,
      phoneNumber: phoneNumber
    }

    try {
      await axios.post(`/member/new`, body)
      res.isSuccess = true
    }
    catch (err) {
      res.isSuccess = false
      res.data = err.response.data
    }
  }
  return res
}

const loginApi = async ({ identity, password }) => {
  const body = {
    identity: identity,
    password: password,
  }

  const res = {
    isSuccess: true,
  }

  try {
    const response = await axios.post('/member/login', body)
    res.accessToken = response.data.accessToken
    res.refreshToken = response.data.refreshToken
  }
  catch (err) {
    res.isSuccess = false;
    res.data = err.response.data
  }

  return res
}

export {
  joinApi,
  loginApi,
};
