import { Button } from 'antd';
import Router from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';
import { getAccessToken } from '../utils/token';

const Index = () => {
  const { identity } = useSelector((state) => state.user)

  const onTest = () => {
    const accessToken = getAccessToken()
    Router.push('/map')
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

export default Index;