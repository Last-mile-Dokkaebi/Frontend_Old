import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userUnclickPossibleScooterAction } from "../reducers/map";
import { DatePicker } from "antd";
import moment from "moment";
import { getRentalCost, rentalScooter } from "../utils/api";
import propTypes from "prop-types";

import { CloseOutlined } from "@ant-design/icons";

const RentalWrapper = styled.div`
  position: relative;
  top: -30%;
  height: 30%;
  width: 100%;
  z-index: 2;
  background-color: rgba(64, 169, 255, 0.55);
`;

const CustomCloseOutlined = styled(CloseOutlined)`
  position: absolute;
  left: 100%;
  font-size: 2.2rem;
  transform: translate(-100%, 5%);
  color: white;
  border-radius: 10px;
`;

const BodyWrapper = styled.div`
  height: 100%;
  widht: 100%;
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
          setCost(res.cost.toLocaleString("ko-KR") + "원");
        } else {
          alert(res.data);
        }
      } else {
        setCost("원");
      }
    },
    [start, end]
  );

  const onClickRental = async () => {
    const res = await rentalScooter(identity, scooter.bike, start, end);
    if (res.isSuccess) {
      alert(`${start} ~ ${end}까지 성공적으로 대여하였습니다.`);
      dispatch(userUnclickPossibleScooterAction());
    } else {
      alert(res.data);
    }
  };

  return (
    <RentalWrapper>
      <div>
        <CustomCloseOutlined onClick={onClickClose} />
      </div>
      <BodyWrapper>
        <div>현재 위치 : {scooter.address}</div>
        <div>현재 위치 도로명 주소 : {scooter.roadAddress}</div>
        <div>배터리 상태 : {scooter.soc}</div>
        <div>
          <RangePicker
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
        </div>
        <div>{cost}</div>
        <div onClick={onClickRental}>빌리기~~~~</div>
      </BodyWrapper>
    </RentalWrapper>
  );
};

ScooterRental.proptypes = {
  address: propTypes.string.isRequired,
  roadAddress: propTypes.string.isRequired,
};

export default ScooterRental;
