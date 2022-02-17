import React from 'react'
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  return (
    <>
      {isLoggedIn ?
        <div>로그인 되있음</div>
        : <LoginForm></LoginForm>
      }
    </>
  )
}

export default Home;