import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore'
import { useSelector } from 'react-redux';
import Router from 'next/router';

const App = ({ Component }) => {
  const { isLoggedIn } = useSelector((state) => state.user)
  useEffect(() => {
    console.log("_app")
    /*로그인 되어 있지 않을 경우 */
    if (!isLoggedIn) {
      console.log("로그인 되어 있지 않음")
      Router.push('/member/login')
    }
    else {
      console.log("로그인 되어 있음")
    }
  }, [])

  return (
    <>
      <Head>
        <title>Dokkaebi</title>
        <meta charSet='utf-8' />
      </Head>
      <Component />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(App);