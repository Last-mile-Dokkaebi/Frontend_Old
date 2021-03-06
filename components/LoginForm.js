import { Button, Col, Input, Row } from "antd";
import Form from "antd/lib/form/Form";
import Router from "next/router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { endLoadingAction, startLoadingAction } from "../reducers/system";
import { logInAction } from "../reducers/user";
import { loginApi } from "../utils/api";

const Wrapper = styled.div`
  background-color : ${(props) => props.theme.colors.back}
  margin: 0px;
  text-align: center;
  height: 100vh;
`;

const Centering = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const FormWrapper = styled(Form)`
  border: black solid 1px;
  padding: 1em;
  background-color: ${(props) => props.theme.colors.background};
`;

const RowWrapper = styled.div`
  display: table;
  width: 250px;
  padding-top: 1em;
  text-align: left;
`;

const ButtonRowWrapper = styled.div`
  padding-top: 2em;
`;

const LoginButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primaryButton};
  color: white;
  border: 0px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();

  const [identity, onChangeIdentity] = useInput("");
  const [password, onChangePassword] = useInput("");

  //identity(id)와 password를 그대로 보내면
  //accessToken, refreshToken을 받아옵니다
  const onSubmitForm = useCallback(async () => {
    dispatch(startLoadingAction());
    const res = await loginApi({ identity, password });

    if (res.isSuccess) {
      const data = {
        identity: identity,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        auth: res.auth,
      };
      dispatch(logInAction(data));
      dispatch(endLoadingAction());
      Router.push("/");
    } else {
      dispatch(endLoadingAction());
      alert("존재하지 않는 아이디이거나 패스워드가 일치하지 않습니다.");
    }
  }, [identity, password]);

  const onJoin = useCallback(() => {
    Router.push("/member/join");
  }, []);

  return (
    <Wrapper>
      <Centering>
        <FormWrapper onFinish={onSubmitForm}>
          <RowWrapper>
            <label htmlFor="id">아이디</label>
            <br />
            <Input
              name="id"
              value={identity}
              onChange={onChangeIdentity}
              maxLength={15}
              required
            />
          </RowWrapper>
          <RowWrapper>
            <label htmlFor="password">패스워드</label>
            <br />
            <Input
              name="password"
              type="password"
              value={password}
              onChange={onChangePassword}
              maxLength={20}
              required
            />
          </RowWrapper>
          <ButtonRowWrapper>
            <Row gutter={[5, 5]}>
              <Col span={12}>
                <LoginButton type="primary" loading={false} htmlType="submit">
                  로그인
                </LoginButton>
              </Col>
              <Col span={12}>
                <Button type="default" loading={false} onClick={onJoin}>
                  회원가입
                </Button>
              </Col>
            </Row>
          </ButtonRowWrapper>
        </FormWrapper>
      </Centering>
    </Wrapper>
  );
};

export default LoginForm;
