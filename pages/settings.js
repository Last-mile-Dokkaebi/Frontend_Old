import { Row } from "antd";
import { Col } from "antd";
import { Switch } from "antd";
import { Button } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LogOutButton from "../components/LogOutButton";
import {
  endLoadingAction,
  startLoadingAction,
  switchThemeModeAction,
} from "../reducers/system";

const Wrapper = styled.div`
  min-wdith: 100%;
  width: 100%;
`;

const RowWrapper = styled(Row)`
  min-width: 100%;
  background-color: ${(props) => props.theme.colors.ground};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25), 0 0 0.1rem rgba(0, 0, 0, 0.15);
`;

const ColWrapper = styled(Col)`
  width: 100%;
  height: 3rem;
`;

const Centering = styled.div`
  position: relative;
  width: 100%;
  left: 0.25rem;
  top: 50%;
  transform: translate(0, -50%);
`;

const ThemeSwitch = styled(Switch)`
  background-color: ${(props) => props.theme.colors.primaryButton};
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
    <Wrapper>
      <RowWrapper>
        <ColWrapper span={12}>
          <Centering>
            <ThemeSwitch
              checked={themeMode === "dark"}
              unCheckedChildren="다크모드 OFF"
              checkedChildren="다크모드 ON"
              onClick={onClickDarkMode}
            ></ThemeSwitch>
          </Centering>
        </ColWrapper>
        <ColWrapper span={12}>
          <Centering>
            <Button onClick={onClickLoading}>로딩 해보기</Button>
          </Centering>
        </ColWrapper>
        <ColWrapper span={12}>
          <Centering>
            <LogOutButton />
          </Centering>
        </ColWrapper>
        <ColWrapper span={12}>
          <Centering>2-2</Centering>
        </ColWrapper>
        <ColWrapper span={12}>
          <Centering>3-1</Centering>
        </ColWrapper>
        <ColWrapper span={12}>
          <Centering>3-2</Centering>
        </ColWrapper>
      </RowWrapper>
    </Wrapper>
  );
};

export default settings;
