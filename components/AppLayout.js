import React from 'react';
import styled from 'styled-components';
import Header from './Header'
import Aside from './Aside'
import PropTypes from 'prop-types'

const BackGround = styled.div`
  width: 100%;
  height: 100%;
`

const Body = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 3.2rem;
  padding-bottom: 3.2rem;
  background-color: #f2f2f2!important;
`

const Centering = styled.div`
  max-width: 42rem;
  width: 100%;
  height: 100%;
  background-color:white;
  margin: 0 auto;
`

const AppLayout = ({ children }) => {
  return (
    <BackGround>
      <Header>

      </Header>

      <Body>
        <Centering>
          {children}
        </Centering>
      </Body>
      <Aside>

      </Aside>
    </BackGround>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout