import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_BACKEND_DEVELOP
  : process.env.NEXT_PUBLIC_BACKEND_DEVELOP

const join = async ({ name, identity, password, phoneNumber }) => {
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

const login = ({ id, password }) => {
  //현재는 test코드
  console.log(id, password)
  if (id === "cilab") {
    return { "isSuccess": true }
  }
  else {
    return { "isSuccess": false }
  }

  //여기부터는 실제
  // const body = {
  //   id: id,
  //   password: password,
  // }

  // const res = await axios.post('/api/member/login', body)
  // return res
}

export {
  join,
  login,
};
