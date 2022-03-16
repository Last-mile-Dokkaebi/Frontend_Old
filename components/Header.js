import React from "react";
import styled from "styled-components";
import Router from "next/router";
import HeaderInfo from "./HeaderInfo";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";

// const HeaderWrapper = styled(Row)`
//   position: fixed;
//   left: 50%;
//   transform: translate(-50%, 0);
//   overflow: hidden;
//   max-width: ${process.env.NEXT_PUBLIC_APP_WIDTH}
//   width: 100%;
//   height: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
//   background-color: rgba(225, 225, 225, 1);
// `;

// const Centering = styled.div`
//   display: inline-block;
//   position: relative;
//   top: 0;
//   left: 50%;
//   transform: translate(-50%, 0%);
//   width: ${process.env.NEXT_PUBLIC_APP_WIDTH};
//   height: 3.2rem;
//   background-color: rgba(225, 225, 225, 0.75);
//   z-index: 10;
// `;

// const Logo = styled.div`
//   position: relative;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   font-size: 1.8em;
//   text-align: center;

//   &:hover {
//     cursor: pointer;
//     color: rgba(64, 169, 255, 128);
//   }
// `;

const RowWrapper = styled(Row)`
  width: 100%;
  height: 100%;
  background-color: gray;
`;

const Logo = styled.h1`
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
    <RowWrapper>
      <Col xs={0} sm={0} md={4}>
        바깥왼쪽
      </Col>
      <Col xs={24} sm={24} md={16}>
        <Row>
          <Col span={6}>왼쪽</Col>
          <Col style={{ textAlign: "center" }} span={12}>
            <Logo onClick={onClickLogo}>Dokkaebi</Logo>
          </Col>
          <Col style={{ textAlign: "right" }} span={6}>
            {identity && <HeaderInfo identity={identity} />}
          </Col>
        </Row>
      </Col>
      <Col xs={0} sm={0} md={4}>
        바깥오른쪽
      </Col>
    </RowWrapper>
  );
};

export default Header;
