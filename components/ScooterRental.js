import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userUnclickPossibleScooterAction } from "../reducers/map";
import { Button, DatePicker, Input } from "antd";
import moment from "moment";
import { getRentalCost, rentalScooter } from "../utils/api";
import { CloseOutlined } from "@ant-design/icons";
import { endLoadingAction, startLoadingAction } from "../reducers/system";
import Battery from "./Battery";

const RentalWrapper = styled.div`
  position: relative;
  top: -30%;
  left: 50%;
  transform: translate(-50%, 0);
  height: calc(30% - 0.14rem);
  width: calc(100% - 0.14rem);
  z-index: 2;
  background-color: ${(props) => props.theme.colors.popup};
  box-shadow: 0 0.07rem 0.1rem rgba(0, 0, 0, 0.6),
    0 0.14rem 0.1rem rgba(0, 0, 0, 0.23);
  padding: 1rem;
`;

const CustomCloseOutlined = styled(CloseOutlined)`
  position: absolute;
  right: -1.5rem;
  font-size: 2.2rem;
  transform: translate(-100%, 5%);
  color: white;
  border-radius: 10px;
`;

const CostInput = styled(Input)`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  width: 50%;
  text-align: right;
`;

const RentalButton = styled(Button)`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  background-color: ${(props) => props.theme.colors.primaryButton};
  border: 0px;
`;

const ScooterRental = () => {
  const { RangePicker } = DatePicker;

  const dateFormat = "YYYY-MM-DD";
  const today = new Date();

  const { scooter } = useSelector((state) => state.map);
  const { identity } = useSelector((state) => state.user);

  const [start, setStart] = useState(
    [today.getFullYear(), today.getMonth() + 1, today.getDay()].join("/")
  );
  const [end, setEnd] = useState(undefined);
  const [cost, setCost] = useState(0);

  const dispatch = useDispatch();

  const onClickClose = useCallback(() => {
    dispatch(userUnclickPossibleScooterAction());
  }, []);

  const onCalendarChange = useCallback(
    async (_, dates) => {
      setStart(dates[0]);
      setEnd(dates[1]);
      if (dates[0] && dates[0]) {
        //두개의 날짜모두 채워져있을 경우
        const res = await getRentalCost(dates[0], dates[1]);
        if (res.isSuccess) {
          setCost(res.cost.toLocaleString("ko-KR"));
        } else {
          alert(res.data);
        }
      } else {
        setCost(0);
      }
    },
    [start, end]
  );

  const onClickRental = async () => {
    dispatch(startLoadingAction());
    const res = await rentalScooter(identity, scooter.bike, start, end);
    if (res.isSuccess) {
      dispatch(endLoadingAction());
      alert(`${start} ~ ${end}까지 성공적으로 대여하였습니다.`);
      dispatch(userUnclickPossibleScooterAction());
    } else {
      dispatch(endLoadingAction());
      alert(res.data);
    }
  };

  return (
    <RentalWrapper>
      <CustomCloseOutlined onClick={onClickClose} />
      <div>현재 위치 : {scooter.address}</div>
      <div>현재 위치 도로명 주소 : {scooter.roadAddress}</div>
      <Battery soc={scooter.soc} />
      <RangePicker
        style={{
          position: "absolute",
          bottom: "3.25rem",
          left: "1rem",
          width: "50%",
        }}
        showTime
        defaultValue={[moment(start, dateFormat), moment(end, dateFormat)]}
        format={dateFormat}
        value={[
          start ? moment(start, dateFormat) : undefined,
          end ? moment(end, dateFormat) : undefined,
        ]}
        onChange={onCalendarChange}
        allowEmpty={[false, false]}
      />
      <CostInput readOnly={true} value={cost} suffix="원" />
      <RentalButton onClick={onClickRental}>빌리기</RentalButton>
    </RentalWrapper>
  );
};

export default ScooterRental;
