import propTypes from 'prop-types'
import React from 'react'
import styled from "styled-components"

const BodyWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Body = ({ components }) => {
  return (
    <>
      <BodyWrapper >
        {components}
      </BodyWrapper>
    </>
  )
}

Body.propTypes = {
  components: propTypes.elementType.isRequired
}

export default Body;