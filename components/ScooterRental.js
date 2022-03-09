import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userUnclickPossibleScooterAction } from "../reducers/map";
import { DatePicker } from "antd";
import moment from "moment";
import { getRentalCost, rentalScooter } from "../utils/api";

/*
const customWeekStartEndFormat = value =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week')
    .format(weekFormat)}`;

ReactDOM.render(
  <Space direction="vertical" size={12}>
    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
    <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
    <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" />
    <DatePicker defaultValue={moment()} format={customWeekStartEndFormat} picker="week" />
    <RangePicker
      defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={customFormat} />
  </Space>,
  mountNode,

*/

const ScooterRental = () => {
  const { kakao } = window;
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";
  const today = new Date();

  const { scooter } = useSelector((state) => state.map);
  const { identity } = useSelector((state) => state.user);

  const [address, setAddress] = useState("");
  const [roadAddress, setRoadAddress] = useState("");

  const [start, setStart] = useState(
    [today.getFullYear(), today.getMonth() + 1, today.getDay()].join("/")
  );
  const [end, setEnd] = useState(undefined);

  const [cost, setCost] = useState(0);

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(scooter.lon, scooter.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
        setRoadAddress(
          result[0].road_address.address_name +
            " " +
            result[0].road_address.building_name
        );
      }
    });
  }, []);

  const RentalWrapper = styled.div`
    position: absolute;
    top: 50%;
    height: 50%;
    width: ${process.env.NEXT_PUBLIC_APP_WIDTH};
    background-color: yellow;
    z-index: 2;
  `;

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
      <div onClick={onClickClose}>이 창 닫기</div>
      <div>현재 위치 : {address}</div>
      <div>현재 위치 도로명 주소 : {roadAddress}</div>
      <div>배터리 상태 : {scooter.soc}</div>
      <div>
        <RangePicker
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
    </RentalWrapper>
  );
};

export default ScooterRental;
