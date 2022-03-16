import React from "react";
import propTypes from "prop-types";
import { Button } from "antd";
import { logoutAction } from "../reducers/user";
import { ACCESS_TOKEN, IDENTITY, REFRESH_TOKEN } from "../utils/token";

const HeaderInfo = ({ identity }) => {
  const onClickLogOut = () => {
    logoutAction();
    localStorage.removeItem(IDENTITY);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    location.reload();
  };

  return (
    <div>
      <span>{identity}</span>
      <Button type="primary" onClick={onClickLogOut}>
        로그아웃
      </Button>
    </div>
  );
};

HeaderInfo.propTypes = {
  identity: propTypes.string.isRequired,
};

export default HeaderInfo;
