import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BellOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Router from "next/router";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

const GlobalStyle = createGlobalStyle`
  .navigationMenu{
    font-size: 2.4rem;
    position:relative;
    top:50%;
    margin-top:0.25rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .navigationMenu:hover{
    color: rgba(64, 169, 255, 128);
  }
`;

const RowWrapper = styled(Row)`
  width: 100%;
  height: 100%;
  background-color: gray;
`;
const MidCol = styled(Col)`
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
`;

const Aside = () => {
  const isLoggedIn = useSelector((state) => state.user);

  const onClickAlram = () => {
    isLoggedIn ? Router.push("/alram") : Router.push("/member/login");
  };
  const onClickStatistics = () => {
    isLoggedIn ? Router.push("/statistics") : Router.push("/member/login");
  };
  const onClickSettings = () => {
    isLoggedIn ? Router.push("/settings") : Router.push("/member/login");
  };

  return (
    <>
      <GlobalStyle />
      <RowWrapper>
        <Col xs={0} sm={0} md={4}>
          바깥왼쪽
        </Col>
        <Col xs={24} sm={24} md={16}>
          <Row>
            <MidCol span={24}>
              <BellOutlined onClick={onClickAlram} className="navigationMenu" />
              <BarChartOutlined
                onClick={onClickStatistics}
                className="navigationMenu"
              />
              <SettingOutlined
                onClick={onClickSettings}
                className="navigationMenu"
              />
            </MidCol>
          </Row>
        </Col>
        <Col xs={0} sm={0} md={4}>
          바깥오른쪽
        </Col>
      </RowWrapper>
      {/* <div>
        <Navigation>
          <Centering>
            <BellOutlined onClick={onClickAlram} className="navigationMenu" />
            <BarChartOutlined
              onClick={onClickStatistics}
              className="navigationMenu"
            />
            <SettingOutlined
              onClick={onClickSettings}
              className="navigationMenu"
            />
          </Centering>
        </Navigation>
      </div> */}
    </>
  );
};

export default Aside;
