import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore'
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import JoinForm from '../components/joinForm';

const App = ({ Component }) => {
  const { isLoggedIn, isJoinPage } = useSelector((state) => state.user)

  return (
    <>
      <Head>
        <title>Dokkaebi</title>
        <meta charSet='utf-8' />
      </Head>
      <AppLayout>
        {isLoggedIn && <Component />}
        {!isLoggedIn && !isJoinPage && <LoginForm />}
        {isJoinPage && <JoinForm />}
      </AppLayout>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(App);