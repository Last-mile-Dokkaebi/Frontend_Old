import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import 'antd/dist/antd.css';

const Dokkaebi = ({ Component }) => {
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

Dokkaebi.propTypes = {
  Component: PropTypes.elementType.isRequired
}

export default Dokkaebi;