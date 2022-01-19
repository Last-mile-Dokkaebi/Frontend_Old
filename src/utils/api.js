import axios from 'axios';

/**
 * 
 * @param {string} id 로그인 할 ID
 * @param {string} password 로그인 할 password
 * @returns 
 */
const login = async (id, password) => {
    const body = {
        id: id,
        password: password
    }
    const res = await axios.post('/login', body)
    return res
};

export {
    login
};