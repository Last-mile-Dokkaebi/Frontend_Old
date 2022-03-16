import React from "react";
import styled from "styled-components";
import Router from "next/router";
import HeaderInfo from "./HeaderInfo";
import { useSelector } from "react-redux";

const HeaderWrapper = styled.div`
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  text-align: center;
`;

const Centering = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: ${process.env.NEXT_PUBLIC_APP_WIDTH};
  height: 3.2rem;
  background-color: rgba(225, 225, 225, 0.75);
  z-index: 10;
`;

const Logo = styled.div`
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  font-size: 1.8em;

  &:hover {
    cursor: pointer;
    color: rgba(64, 169, 255, 128);
  }
`;

const Header = () => {
  const { isLoggedIn, identity } = useSelector((state) => state.user);
  const onClickLogo = () => {
    isLoggedIn ? Router.push("/") : Router.push("/member/login");
  };

  return (
    <>
      <HeaderWrapper>
        <Centering>
          <Logo onClick={onClickLogo}>Dokkaebi</Logo>
          {identity && <HeaderInfo identity={identity} />}
        </Centering>
      </HeaderWrapper>
    </>
  );
};

export default Header;
