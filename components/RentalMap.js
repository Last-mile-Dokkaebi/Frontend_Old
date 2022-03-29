import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userClickPossibleScooterAction,
  userUnclickPossibleScooterAction,
} from "../reducers/map";
import { endLoadingAction, startLoadingAction } from "../reducers/system";
import { scooterApi } from "../utils/api";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import ScooterRental from "./ScooterRental";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const RentalMap = () => {
  let kakao;
  const [centerLat, setCenterLat] = useState(0); //Map객체의 중간Lat
  const [centerLon, setCenterLon] = useState(0); //Map객체의 중간Lon
  const [scooters, setScooters] = useState([]); //scooter객체의 배열

  const { rentalVisible } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  useEffect(async () => {
    kakao = window.kakao;
    dispatch(startLoadingAction()); //로딩화면 시작
    const res = await scooterApi();
    if (res.isSuccess === false) {
      dispatch(endLoadingAction());
      alert("퀵보드 정보를 읽어오는데 실패하였습니다.");
    } else {
      const geocoder = new kakao.maps.services.Geocoder();

      const lon = [];
      const lat = [];
      const possibleScooters = [];
      res.scooters.forEach((scooter) => {
        geocoder.coord2Address(scooter.lon, scooter.lat, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            scooter.address = result[0].address.address_name;
            scooter.roadAddress = result[0].road_address.address_name;
          }
        });
        if (scooter.status === "POSSIBLE") {
          possibleScooters.push(scooter);
          lon.push(scooter.lon);
          lat.push(scooter.lat);
        }
      });
      setCenterLon(
        lon.reduce((prev, current) => prev + current) / possibleScooters.length
      );
      setCenterLat(
        lat.reduce((prev, current) => prev + current) / possibleScooters.length
      );

      setScooters(possibleScooters);

      dispatch(endLoadingAction());
    }
    return dispatch(userUnclickPossibleScooterAction());
  }, []);

  const onClickMarker = (scooter) => {
    dispatch(userClickPossibleScooterAction(scooter));
  };

  return (
    <Container>
      <Map
        center={{ lat: centerLat, lng: centerLon }}
        style={{ width: "100%", height: "100%" }}
        level={4}
      >
        {scooters.map((scooter) => (
          <MapMarker
            key={`${scooter.lat}${scooter.lon}`}
            position={{ lat: scooter.lat, lng: scooter.lon }}
            onClick={() => {
              onClickMarker(scooter);
            }}
          />
        ))}
      </Map>
      {rentalVisible && <ScooterRental />}
    </Container>
  );
};

export default RentalMap;
