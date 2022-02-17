import { Button, Col, Input, Row } from 'antd';
import Form from 'antd/lib/form/Form';
import Router from 'next/router';
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';
import { login } from '../utils/api';

const Wrapper = styled.div`
  background-color:	rgb(240, 240, 240);
  margin: 0px;
  text-align: center;
  height:100vh;
`

const Centering = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%)
`
const FormWrapper = styled(Form)`
  border: black solid 1px;
  padding: 1em;
  background-color: rgb(206, 223, 246);
`

const RowWrapper = styled.div`
  display: table;
  width: 250px;
  padding-top: 1em;
  text-align: left
`

const ButtonRowWrapper = styled.div`
  padding-top: 2em;
`

const LoginForm = () => {
  const dispatch = useDispatch();

  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm = useCallback(() => {
    const result = login({ id, password })
    result.isSuccess
      ? dispatch(loginAction(id))
      : alert("존재하지 않는 아이디이거나 패스워드가 일치하지 않습니다.")
  }, [id])

  const onJoin = useCallback(() => {
    Router.push("/member/join")
  }, [])

  return (
    <Wrapper>
      <Centering>
        <FormWrapper
          onFinish={onSubmitForm}
        >
          <RowWrapper>
            <label htmlFor="id">아이디</label>
            <br />
            <Input name="id" value={id} onChange={onChangeId} maxLength={15} required />
          </RowWrapper>
          <RowWrapper>
            <label htmlFor="password">패스워드</label>
            <br />
            <Input name="password" type="password" value={password} onChange={onChangePassword} maxLength={20} required />
          </RowWrapper>
          <ButtonRowWrapper>
            <Row gutter={[5, 5]}>
              <Col span={12}>
                <Button
                  type="primary"
                  loading={false}
                  htmlType="submit"
                >
                  로그인</Button>
              </Col>
              <Col span={12}>
                <Button
                  type="default"
                  loading={false}
                  onClick={onJoin}
                >
                  회원가입</Button>
              </Col>
            </Row>
          </ButtonRowWrapper>
        </FormWrapper>
      </Centering>
    </Wrapper>
  )
}

export default LoginForm;