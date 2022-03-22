import React, { useState, useCallback } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import styled from "styled-components";
import { joinApi } from "../utils/api";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { endLoadingAction, startLoadingAction } from "../reducers/system";

const Wrapper = styled.div`
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

const RowWrapper = styled(Form)`
  display: table;
  width: 250px;
  padding-top: 1em;
  text-align: left;
`;

const ButtonRowWrapper = styled.div`
  padding-top: 2em;
`;

const JoinButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  border: 0px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const JoinForm = () => {
  const dispatch = useDispatch();

  const [name, onChangeName] = useInput("");
  const [identity, onChangeIdentity] = useInput("");

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setPasswordCheckError(e.target.value !== passwordCheck);
  });
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordCheckError(e.target.value !== password);
    },
    [password]
  );

  const [phoneNumber, setPhoneNumber] = useState(["", "", ""]);
  const onChangePhoneNumber = useCallback(
    (e, position) => {
      const nextPhoneNumber = [...phoneNumber];
      nextPhoneNumber[position] = e.target.value;
      setPhoneNumber(nextPhoneNumber);
    },
    [phoneNumber]
  );

  const onSubmitForm = useCallback(async () => {
    dispatch(startLoadingAction());
    const res = await joinApi({
      name,
      identity,
      password,
      passwordCheck,
      phoneNumber,
    });
    if (res.isSuccess === true) {
      dispatch(endLoadingAction());
      alert(`회원가입을 축하합니다.`);
      Router.push("/member/login");
    } else {
      dispatch(endLoadingAction());
      alert(`${res.data}`);
    }
  }, [name, identity, password, passwordCheck, phoneNumber]);

  const onCancle = useCallback(() => {
    Router.push("/member/login");
  }, []);

  return (
    <Wrapper>
      <Centering>
        <FormWrapper onFinish={onSubmitForm}>
          <RowWrapper>
            <label htmlFor="name">이름</label>
            <br />
            <Input name="name" value={name} onChange={onChangeName} required />
          </RowWrapper>

          <RowWrapper>
            <label htmlFor="identity">아이디</label>
            <br />
            <Input
              name="identity"
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
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              maxLength={20}
              required
            />
          </RowWrapper>

          <RowWrapper>
            <label htmlFor="passwordCheck">패스워드확인</label>
            <br />
            <Input
              type="password"
              name="passwordCheck"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              maxLength={20}
              required
            />
            {passwordCheckError && (
              <ErrorMessage>패스워드가 일치하지 않습니다.</ErrorMessage>
            )}
          </RowWrapper>

          <RowWrapper>
            <label htmlFor="phoneNumber">휴대폰번호</label>
            <br />
            <Row gutter={[5, 5]}>
              <Col span={6}>
                <Input
                  name="phoneNumber"
                  value={phoneNumber[0]}
                  onChange={(e) => onChangePhoneNumber(e, 0)}
                  maxLength={3}
                  required
                />
              </Col>
              <Col span={9}>
                <Input
                  value={phoneNumber[1]}
                  onChange={(e) => onChangePhoneNumber(e, 1)}
                  maxLength={4}
                  required
                />
              </Col>
              <Col span={9}>
                <Input
                  value={phoneNumber[2]}
                  onChange={(e) => onChangePhoneNumber(e, 2)}
                  maxLength={4}
                  required
                />
              </Col>
            </Row>
          </RowWrapper>

          <ButtonRowWrapper>
            <Row gutter={[5, 5]}>
              <Col span={12}>
                <JoinButton
                  type="primary"
                  loading={false}
                  htmlType="submit"
                  disabled={passwordCheckError}
                >
                  회원가입
                </JoinButton>
              </Col>
              <Col span={12}>
                <Button loading={false} onClick={onCancle}>
                  취소
                </Button>
              </Col>
            </Row>
          </ButtonRowWrapper>
        </FormWrapper>
      </Centering>
    </Wrapper>
  );
};

export default JoinForm;
