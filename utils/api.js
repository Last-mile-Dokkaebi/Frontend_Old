import axios from 'axios';

const join = async ({ name, id, password, phoneNumber }) => {
  const body = {
    name: name,
    id: id,
    password: password,
    phoneNumber: phoneNumber
  }

  const res = await axios.post('/api/member/new', body)
  return res
}

export {
  join,
};