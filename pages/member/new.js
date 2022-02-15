import React from 'react'
import styled from 'styled-components'
import JoinForm from '../../components/JoinForm'

const Wrapper = styled.div`
  background-color:	rgb(240, 240, 240);
  margin: 0px;
  text-align: center;
  height:100vh;
`
const New = () => {
  return (
    <Wrapper>
      <JoinForm />
    </Wrapper>
  )
}



export default New;