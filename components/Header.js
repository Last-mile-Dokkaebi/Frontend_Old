import React from "react";
import styled from "styled-components";
import Router from "next/router";

const HeaderWrapper = styled.div`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  background-color: gray;
  text-align: center;
`;

const Centering = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: ${process.env.NEXT_PUBLIC_APP_WIDTH};
  height: 3.2rem;
  background-color: red;
  z-index: 10;
`;

const Logo = styled.div`
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  background-color: blue;
  font-size: 1.8em;

  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const onClickLogo = () => {
    Router.push("/");
  };

  return (
    <>
      <HeaderWrapper>
        <Centering>
          <Logo onClick={onClickLogo}>Dokkaebi</Logo>
        </Centering>
      </HeaderWrapper>
    </>
  );
};

export default Header;
