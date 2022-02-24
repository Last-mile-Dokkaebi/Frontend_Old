import { Button } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import { getAccessToken } from '../utils/token';

const Home = () => {
  const { identity } = useSelector((state) => state.user)

  const onTest = () => {
    const accessToken = getAccessToken()
    console.log(accessToken)
  }
  /*로그인 되어 있을 경우 개인 페이지를 보여줌*/
  return (
    <>
      <div>{`${identity}`}</div>
      <div>
        <Button
          onClick={onTest}
        >
          테스트용</Button>
      </div>
    </>
  )
}

export default Home;