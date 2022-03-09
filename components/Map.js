import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { scooterApi } from "../utils/api";
import { PropTypes } from "prop-types";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const { kakao } = window;
  const kakaoMap = useRef(null);
  const markers = [];

  // map, x(lon), y(lat)을 인자로 받아 해당하는 마커를 지도에 표시합니다.
  const addMarker = useCallback((map, x, y, soc) => {
    const coords = new kakao.maps.LatLng(y, x);
    const marker = new kakao.maps.Marker({
      position: coords,
    });

    const content = `<div 
    style="transform:translate(0, -3rem);width:8rem;height:1.4rem;text-align:center;background-color:white;">
    배터리 상태 : ${soc}%
    </div>`;
    const overlay = new kakao.maps.CustomOverlay({
      position: coords,
      content: content,
    });

    kakao.maps.event.addListener(marker, "mouseover", () => {
      overlay.setMap(map);
    });
    kakao.maps.event.addListener(marker, "mouseout", () => {
      overlay.setMap(null);
    });

    kakao.maps.event.addListener(marker, "click", () => {
      alert(soc);
    });

    // const content = `<div>${soc}</div>`;
    // const infoWindow = new kakao.maps.InfoWindow({
    //   content: content,
    // });

    // kakao.maps.event.addListener(marker, "mouseover", () => {
    //   infoWindow.open(map, marker);
    // });
    // kakao.maps.event.addListener(marker, "mouseout", () => {
    //   infoWindow.close();
    // });

    marker.setMap(map);
    markers.push(marker);
  }, []);

  useEffect(async () => {
    const res = await scooterApi();
    if (res.isSuccess === false) {
      alert("퀵보드 정보를 읽어오는데 실패하였습니다.");
    } else {
      const { scooters } = res;
      console.log(scooters);
      const lon = [];
      const lat = [];
      const possibleScooters = [];
      scooters.forEach((scooter) => {
        if (scooter.status === "POSSIBLE") {
          possibleScooters.push(scooter);
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
        addMarker(map, scooter.lon, scooter.lat, scooter.soc);
      });

      clusterer.addMarkers(markers);
      const mapTypeControl = new kakao.maps.MapTypeControl();

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    }
  }, [kakaoMap]);

  return (
    <Container>
      <Container ref={kakaoMap} style={{ widht: "100%", height: "100%" }} />
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
