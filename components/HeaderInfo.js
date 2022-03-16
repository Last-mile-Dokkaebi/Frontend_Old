import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { Button } from "antd";
import { logoutAction } from "../reducers/user";
import { ACCESS_TOKEN, IDENTITY, REFRESH_TOKEN } from "../utils/token";

const MyProfile = styled.div`
  display: inline-block;
  position: absolute;
  right: 5%;
  transform: translate(50%, 0);
  background-color:
  z-index: 11;
`;

const HeaderInfo = ({ identity }) => {
  const onClickLogOut = () => {
    logoutAction();
    localStorage.removeItem(IDENTITY);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    location.reload();
  };

  return (
    <MyProfile>
      <div>{identity}</div>
      <Button type="primary" onClick={onClickLogOut}>
        로그아웃
      </Button>
    </MyProfile>
  );
};

HeaderInfo.propTypes = {
  identity: propTypes.string.isRequired,
};

export default HeaderInfo;
