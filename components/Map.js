import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { scooterApi } from "../utils/api";
import { PropTypes } from "prop-types";
import {
  userClickPossibleScooterAction,
  userUnclickPossibleScooterAction,
} from "../reducers/map";
import ScooterRental from "./ScooterRental";
import { useDispatch, useSelector } from "react-redux";
import { endLoadingAction, startLoadingAction } from "../reducers/system";
import { addMarker } from "../utils/map";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  let kakao;
  const { rentalVisible } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const kakaoMap = useRef(null);
  const markers = [];

  useEffect(async () => {
    kakao = window.kakao;
    dispatch(startLoadingAction());
    const res = await scooterApi();
    if (res.isSuccess === false) {
      dispatch(endLoadingAction());
      alert("퀵보드 정보를 읽어오는데 실패하였습니다.");
    } else {
      const { scooters } = res;
      const geocoder = new kakao.maps.services.Geocoder();
      const lon = [];
      const lat = [];
      const possibleScooters = [];
      scooters.forEach((scooter) => {
        geocoder.coord2Address(scooter.lon, scooter.lat, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            scooter.address = result[0].address.address_name;
            scooter.roadAddress = result[0].road_address.address_name;
          }
        });
        if (scooter.status === "POSSIBLE") {
          scooter.road = possibleScooters.push(scooter);
          lon.push(scooter.lon);
          lat.push(scooter.lat);
        }
      });
      const x =
        lon.reduce((prev, current) => prev + current) / possibleScooters.length;
      const y =
        lat.reduce((prev, current) => prev + current) / possibleScooters.length;

      const coords = new kakao.maps.LatLng(y, x);
      const options = {
        center: coords,
        level: 3,
      };

      const map = new kakao.maps.Map(kakaoMap.current, options);

      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 5,
      });
      map.relayout();
      map.setCenter(coords);

      possibleScooters.forEach((scooter) => {
        addMarker(markers, map, scooter, () => {
          dispatch(userClickPossibleScooterAction(scooter));
        });
      });

      clusterer.addMarkers(markers);
      const mapTypeControl = new kakao.maps.MapTypeControl();

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      dispatch(endLoadingAction());
    }

    //페이지에서 나갈때는 켜져있던 rental창을 닫아줌
    return dispatch(userUnclickPossibleScooterAction());
  }, [kakaoMap]);

  return (
    <Container>
      <Container ref={kakaoMap} />
      {rentalVisible && <ScooterRental />}
    </Container>
  );
};

const MouseOver = ({ soc }) => {
  const Info = styled.div`
    width: 5rem;
    height: 1rem;
  `;
  return <Info>{soc}</Info>;
};

MouseOver.propTypes = {
  soc: PropTypes.number.isRequired,
};

export default Map;
