import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Aside from "./Aside";
import PropTypes from "prop-types";

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  padding-bottom: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  background-color: white;
`;

const Centering = styled.div`
  max-width: ${process.env.NEXT_PUBLIC_APP_WIDTH};
  width: 100%;
  height: 100%;
  margin-top: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  margin-bottom: ${process.env.NEXT_PUBLIC_APP_NAVIGATION_HEIGHT};
  background-color: white;
  margin: 0 auto;
`;

const AppLayout = ({ children }) => {
  return (
    <BackGround>
      <Header></Header>

      <Body>
        <Centering>{children}</Centering>
      </Body>
      <Aside></Aside>
    </BackGround>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
