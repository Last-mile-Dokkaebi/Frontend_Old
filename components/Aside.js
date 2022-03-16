import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BellOutlined,
  BarChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Router from "next/router";

const AsideWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
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
  background-color: rgba(225, 225, 225, 1);
  text-align: center;
`;

const Centering = styled.div`
  position: relative;
  left: 50%;
  width: 50%;
  height: 100%;
  transform: translate(-50%, 0);
`;

const GlobalStyle = createGlobalStyle`
  .navigationMenu{
    font-size: 2.4rem;
    position:relative;
    top:50%;
    transform: translate(0, -50%);
    margin: 0rem 1rem 1rem 0rem;
  }

  .navigationMenu:hover{
    color: rgba(64, 169, 255, 128);
  }
`;

const onClickAlram = () => {
  Router.push("/alram");
};
const onClickStatistics = () => {
  Router.push("/statistics");
};
const onClickSettings = () => {
  Router.push("/settings");
};

const Aside = () => {
  return (
    <>
      <GlobalStyle />
      <AsideWrapper>
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
      </AsideWrapper>
    </>
  );
};

export default Aside;
