import React from "react";
import styled from "styled-components";

const AsideWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  background-color: gray;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  z-index: 20;
`;

const Navigation = styled.div`
  width: 100%;
  max-width: ${process.env.NEXT_PUBLIC_APP_WIDTH};
  height: 3.2rem;
  display: flex;
  margin: 0 auto;
  background-color: red;
`;

const Aside = () => {
  return (
    <>
      <AsideWrapper>
        <Navigation>Navigation</Navigation>
      </AsideWrapper>
    </>
  );
};

export default Aside;
