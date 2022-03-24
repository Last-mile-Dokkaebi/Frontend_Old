import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  HistoryOutlined,
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
    color: ${(props) => props.theme.colors.primary}
  }
`;

const RowWrapper = styled(Row)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.navigation};
`;
const MidCol = styled(Col)`
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
`;

const Aside = () => {
  const isLoggedIn = useSelector((state) => state.user);

  const onClickHistory = () => {
    isLoggedIn ? Router.push("/history") : Router.push("/member/login");
  };
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
        <Col span={0} lg={4}></Col>
        <Col span={24} lg={16}>
          <Row>
            <MidCol span={24}>
              <HistoryOutlined
                onClick={onClickHistory}
                className="navigationMenu"
              />
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
        <Col span={0} lg={4}></Col>
      </RowWrapper>
    </>
  );
};

export default Aside;
