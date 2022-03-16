import React, { useRef } from "react";
import styled from "styled-components";
import Header from "./Header";
import Aside from "./Aside";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

const HeaderRow = styled(Row)`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  top: 0;
  width: 100%;
  height: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  z-index: 10;
`;

const AsideRow = styled(Row)`
  transform: translate(-50%, 0);
  left: 50%;
  width: 100%;
  position: fixed;
  bottom: 0;
  height: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  z-index: 10;
  background-color: grba(220, 220, 220, 1);
`;

const BodyRow = styled(Row)`
  widht: 100%;
  min-height: 100vh;
  height: 100%;
  padding-top: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  padding-bottom: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
`;

const AppLayout = ({ children }) => {
  const bodyRef = useRef(null);

  return (
    <>
      <Row>
        <Col xs={0} sm={0} md={4}>
          컴퓨터로 볼 때 왼쪽
        </Col>
        <Col xs={24} sm={24} md={16} span={24} ref={bodyRef}>
          <HeaderRow>
            <Header />
          </HeaderRow>
          <BodyRow>{children}</BodyRow>
          <AsideRow className="asideRow">
            <Aside />
          </AsideRow>
        </Col>

        <Col xs={0} sm={0} md={4}>
          컴퓨터로 볼 때 오른쪽
        </Col>
      </Row>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
