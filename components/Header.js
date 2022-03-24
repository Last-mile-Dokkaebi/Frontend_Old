import React from "react";
import styled from "styled-components";
import Router from "next/router";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

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

const Header = () => {
  const { isLoggedIn, identity } = useSelector((state) => state.user);

  const onClickLogo = () => {
    isLoggedIn ? Router.push("/") : Router.push("/member/login");
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
          <ColWrapper style={{ textAlign: "right" }} span={8}></ColWrapper>
        </RowWrapper>
      </ColWrapper>
      <ColWrapper lg={4} span={0}></ColWrapper>
    </RowWrapper>
  );
};

export default Header;
