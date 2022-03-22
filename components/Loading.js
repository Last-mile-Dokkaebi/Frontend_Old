import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const FullSize = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(230, 230, 230, 0.5);
  z-index: 100;
`;

const Centering = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Loading = () => {
  return (
    <FullSize>
      <Centering>
        <Spin size="large" />
      </Centering>
    </FullSize>
  );
};

export default Loading;
