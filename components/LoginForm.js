import { Button, Col, Input, Row } from "antd";
import Form from "antd/lib/form/Form";
import Router from "next/router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { joinPageAction, loginAction } from "../reducers/user";
import { loginApi } from "../utils/api";

const Wrapper = styled.div`
  background-color: rgb(240, 240, 240);
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
  background-color: rgb(206, 223, 246);
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

const LoginForm = () => {
  const dispatch = useDispatch();

  const [identity, onChangeIdentity] = useInput("");
  const [password, onChangePassword] = useInput("");

  //identity(id)와 password를 그대로 보내면
  //accessToken, refreshToken을 받아옵니다
  const onSubmitForm = useCallback(async () => {
    const res = await loginApi({ identity, password });

    if (res.isSuccess) {
      const data = {
        identity: identity,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      };
      dispatch(loginAction(data));
      Router.push("/");
    } else {
      alert("존재하지 않는 아이디이거나 패스워드가 일치하지 않습니다.");
    }
  }, [identity, password]);

  const onJoin = useCallback(() => {
    dispatch(joinPageAction());
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
                <Button type="primary" loading={false} htmlType="submit">
                  로그인
                </Button>
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
