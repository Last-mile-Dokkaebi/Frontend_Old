import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logOutAction } from "../reducers/user";
import { ACCESS_TOKEN, IDENTITY, REFRESH_TOKEN } from "../utils/token";

const CustomButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primaryButton};
  border: 0px;
  height: ${(props) => props.theme.length.buttonHiehgt};
`;

const LogOutButton = () => {
  const dispatch = useDispatch();

  const onClickLogOut = () => {
    dispatch(logOutAction());
    localStorage.removeItem(IDENTITY);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    location.href = "/member/login";
  };

  return (
    <CustomButton type="primary" onClick={onClickLogOut}>
      로그아웃
    </CustomButton>
  );
};

export default LogOutButton;
