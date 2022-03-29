import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userClickPossibleScooterAction,
  userUnclickPossibleScooterAction,
} from "../reducers/map";
import { endLoadingAction, startLoadingAction } from "../reducers/system";
import { scooterApi } from "../utils/api";
import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import ScooterRental from "./ScooterRental";
import MyMap from "./MyMap";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const RentalMap = () => {
  let kakao;
  const [scooters, setScooters] = useState([]); //scooter객체의 배열

  const { rentalVisible } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  useEffect(async () => {
    kakao = window.kakao;
    dispatch(startLoadingAction());
    const res = await scooterApi();
    if (res.isSuccess) {
      const geocoder = new kakao.maps.services.Geocoder();
      const possibleScooters = [];
      res.scooters.forEach((scooter) => {
        geocoder.coord2Address(scooter.lon, scooter.lat, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            scooter.address = result[0].address.address_name;
            scooter.roadAddress = result[0].road_address.address_name;
          }
        });
        if (scooter.status === "POSSIBLE") possibleScooters.push(scooter);
      });
      setScooters(possibleScooters);
    }

    dispatch(endLoadingAction());
    return dispatch(userUnclickPossibleScooterAction());
  }, []);

  const onClickMarker = (scooter) => {
    dispatch(userClickPossibleScooterAction(scooter));
  };

  if (scooters.length === 0) {
    return <></>;
  }

  return (
    <Wrapper>
      <MyMap positions={scooters}>
        {scooters.map((scooter) => (
          <MapMarker
            key={`${scooter.lat}${scooter.lon}`}
            position={{ lat: scooter.lat, lng: scooter.lon }}
            onClick={() => {
              onClickMarker(scooter);
            }}
          />
        ))}
      </MyMap>
      {rentalVisible && <ScooterRental />}
    </Wrapper>
  );
};

export default RentalMap;
