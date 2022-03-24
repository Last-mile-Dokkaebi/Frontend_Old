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
  height: ${(props) => props.theme.length.navigationHeight};
  z-index: 10;
`;

const AsideRow = styled(Row)`
  transform: translate(-50%, 0);
  left: 50%;
  width: 100%;
  position: fixed;
  bottom: 0;
  height: ${(props) => props.theme.length.navigationHeight};
  z-index: 10;
  background-color: ${(props) => props.theme.colors.navigation};
`;

const BodyRow = styled(Row)`
  min-width: 100%;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding-top: calc(${(props) => props.theme.length.navigationHeight} + 0.5rem);
  padding-bottom: calc(
    ${(props) => props.theme.length.navigationHeight} + 0.5rem
  );
  background-color: ${(props) => props.theme.colors.background};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const AppLayout = ({ children }) => {
  const bodyRef = useRef(null);

  return (
    <>
      <Row>
        <Col span={0} lg={4}>
          컴퓨터로 볼 때 왼쪽
        </Col>
        <Col span={24} lg={16} ref={bodyRef}>
          <HeaderRow>
            <Header />
          </HeaderRow>
          <BodyRow>{children}</BodyRow>
          <AsideRow className="asideRow">
            <Aside />
          </AsideRow>
        </Col>

        <Col span={0} lg={4}>
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
