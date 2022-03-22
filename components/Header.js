import React from "react";
import styled from "styled-components";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "antd";
import { Button } from "antd";
import { ACCESS_TOKEN, IDENTITY, REFRESH_TOKEN } from "../utils/token";
import { logOutAction } from "../reducers/user";

const RowWrapper = styled(Row)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.navigation};
`;

const ColWrapper = styled(Col)`
  height: 100%;
`;

const LeftWrapper = styled(ColWrapper)`
  font-size: 1.25rem;
`;

const Centering = styled.div`
  position: relative;
  top: 50%;
  left: 1rem;
  transform: translate(0, -50%);
  font-weight: bold;
`;

const Logo = styled.h1`
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const LogOutButton = styled(Button)`
  position: relative;
  top: 50%;
  right: 1rem;
  transform: translate(0, -50%);
  background-color: ${(props) => props.theme.colors.primary};
  border: 0px;
`;

const Header = () => {
  const { isLoggedIn, identity } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClickLogo = () => {
    isLoggedIn ? Router.push("/") : Router.push("/member/login");
  };

  const onClickLogOut = () => {
    dispatch(logOutAction());
    localStorage.removeItem(IDENTITY);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    location.href = "/member/login";
  };

  return (
    <RowWrapper>
      <ColWrapper lg={4} span={0}></ColWrapper>
      <ColWrapper lg={16} span={24}>
        <RowWrapper>
          <LeftWrapper span={8}>
            <Centering>{identity}</Centering>
          </LeftWrapper>
          <ColWrapper style={{ textAlign: "center" }} span={8}>
            <Logo onClick={onClickLogo}>Dokkaebi</Logo>
          </ColWrapper>
          <ColWrapper style={{ textAlign: "right" }} span={8}>
            {identity && (
              <LogOutButton onClick={onClickLogOut}>로그아웃</LogOutButton>
            )}
          </ColWrapper>
        </RowWrapper>
      </ColWrapper>
      <ColWrapper lg={4} span={0}></ColWrapper>
    </RowWrapper>
  );
};

export default Header;
