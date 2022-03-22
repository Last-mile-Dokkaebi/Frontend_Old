import { Row } from "antd";
import { Col } from "antd";
import { Switch } from "antd";
import { Button } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  endLoadingAction,
  startLoadingAction,
  switchThemeModeAction,
} from "../reducers/system";

const RowWrapper = styled(Row)`
  min-width: 100%;
  width: 1000px;
  height: 2rem;
  border: 10px black;
`;

const ColWrapper = styled(Col)`
  background-color: red;
`;

const settings = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.system);

  const onClickDarkMode = useCallback(() => {
    dispatch(switchThemeModeAction());
  }, []);

  const onClickLoading = useCallback(() => {
    dispatch(startLoadingAction());
    setTimeout(() => {
      dispatch(endLoadingAction());
    }, 3000);
  }, []);

  return (
    <>
      <RowWrapper>
        <ColWrapper span={8}>
          <Switch
            defaultChecked={themeMode === "dark"}
            onClick={onClickDarkMode}
          ></Switch>
        </ColWrapper>
        <ColWrapper span={8}>
          <Button onClick={onClickLoading}>로딩 해보기</Button>
        </ColWrapper>
      </RowWrapper>
    </>
  );
};

export default settings;
