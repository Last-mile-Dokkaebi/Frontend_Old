import React, { useState, useCallback } from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import styled from 'styled-components'
import { join } from '../utils/api'
import useInput from '../hooks/useInput'

const Wrapper = styled.div`
  padding: 2em 10em 2em 10em;
  text-align: center;
`
const RowWrapper = styled(Form)`
  display: table;
  width: 250px;
  padding-top: 1em;
  text-align:left;
`

const FormWrapper = styled(Form)`
  width: 250px;
  margin-left: auto;
  margin-right: auto;
`

const ButtonRowWrapper = styled.div`
  padding-top: 2em;
`

const ErrorMessage = styled.div`
  color: red;
`

const JoinForm = () => {
  const [name, onChangeName] = useInput('');
  const [identify, onChangeIdentify] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordCheckError, setPasswordCheckError] = useState(false)
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setPasswordCheckError(e.target.value !== password);
  }, [password])

  const [phoneNumber, setPhoneNumber] = useState(['', '', ''])
  const onChangePhoneNumber = useCallback((e, position) => {
    const nextPhoneNumber = [...phoneNumber]
    nextPhoneNumber[position] = e.target.value
    setPhoneNumber(nextPhoneNumber)
  }, [phoneNumber])

  const onSubmitForm = useCallback(() => {
    join({ name, identify, password, passwordCheck, phoneNumber })
  }, [name, identify, password, passwordCheck, phoneNumber])


  const test = useCallback(() => {
    console.log(`name: ${name} `)
    console.log(`id: ${identify} `)
    console.log(`password: ${password} `)
    console.log(`passwordCheck: ${passwordCheck} `)
    console.log(`phoneNumber: ${phoneNumber} `)
  }, [name, identify, password, passwordCheck, phoneNumber])

  return (
    <Wrapper>
      <FormWrapper
        onFinish={onSubmitForm}
      >
        <RowWrapper>
          <label htmlFor="name">이름</label>
          <br />
          <Input name="name" value={name} onChange={onChangeName} required />
        </RowWrapper>

        <RowWrapper>
          <label htmlFor="identify">아이디</label>
          <br />
          <Input name="identify" value={identify} onChange={onChangeIdentify} required />
        </RowWrapper>

        <RowWrapper>
          <label htmlFor="password">패스워드</label>
          <br />
          <Input type="password" name="password" value={password} onChange={onChangePassword} required />
        </RowWrapper>

        <RowWrapper>
          <label htmlFor="passwordCheck">패스워드확인</label>
          <br />
          <Input type="password" name="passwordCheck" value={passwordCheck} onChange={onChangePasswordCheck} required />
          {passwordCheckError && <ErrorMessage>패스워드가 일치하지 않습니다.</ErrorMessage>}
        </RowWrapper>

        <RowWrapper>
          <label htmlFor="phoneNumber">휴대폰번호</label>
          <br />
          <Row gutter={[5, 5]}>
            <Col span={6}>
              <Input name="phoneNumber" value={phoneNumber[0]}
                onChange={(e) => onChangePhoneNumber(e, 0)} required />
            </Col>
            <Col span={9}>
              <Input value={phoneNumber[1]}
                onChange={(e) => onChangePhoneNumber(e, 1)} required />
            </Col>
            <Col span={9}>
              <Input value={phoneNumber[2]}
                onChange={(e) => onChangePhoneNumber(e, 2)} required />
            </Col>
          </Row>
        </RowWrapper>


        <ButtonRowWrapper>
          <Row gutter={[5, 5]}>
            <Col span={12}>
              <Button
                type="primary"
                loading={false}
                htmlType="submit">
                회원가입
              </Button>
            </Col>
            <Col span={12}>
              <Button
                loading={false}
                onClick={test}>
                취소
              </Button>
            </Col>
          </Row>
        </ButtonRowWrapper>
      </FormWrapper>
    </Wrapper >
  )
}

export default JoinForm;