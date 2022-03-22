import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { scooterApi } from "../utils/api";
import { PropTypes } from "prop-types";
import { userClickPossibleScooterAction } from "../reducers/map";
import ScooterRental from "./ScooterRental";
import { useDispatch, useSelector } from "react-redux";
import { endLoadingAction, startLoadingAction } from "../reducers/system";

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

  // scooter객체를 인자로 받아 해당하는 마커를 지도에 표시합니다.
  const addMarker = useCallback((map, scooter) => {
    const { lon, lat, soc } = scooter;
    const coords = new kakao.maps.LatLng(lat, lon);
    const marker = new kakao.maps.Marker({
      position: coords,
    });

    const content = `<div 
    style="width:8rem;height:1.4rem;text-align:center;background-color:white;">
    배터리 상태 : ${soc}%
    </div>`;
    const overlay = new kakao.maps.CustomOverlay({
      position: coords,
      content: content,
      yAnchor: 2.75,
    });

    kakao.maps.event.addListener(marker, "mouseover", () => {
      overlay.setMap(map);
    });
    kakao.maps.event.addListener(marker, "mouseout", () => {
      overlay.setMap(null);
    });

    kakao.maps.event.addListener(marker, "click", () => {
      dispatch(userClickPossibleScooterAction(scooter));
    });

    marker.setMap(map);
    markers.push(marker);
  }, []);

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
        addMarker(map, scooter);
      });

      clusterer.addMarkers(markers);
      const mapTypeControl = new kakao.maps.MapTypeControl();

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      dispatch(endLoadingAction());
    }
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
