import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { scooterApi } from "../utils/api";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Map = () => {
  const { kakao } = window;
  const kakaoMap = useRef(null);
  const markers = [];

  // map, x(lon), y(lat)을 인자로 받아 해당하는 마커를 지도에 표시합니다.
  const addMarker = useCallback((map, x, y) => {
    const coords = new kakao.maps.LatLng(y, x);
    const marker = new kakao.maps.Marker({
      position: coords,
    });

    marker.setMap(map);
    markers.push(marker);
  });

  useEffect(async () => {
    const res = await scooterApi();
    if (res.isSuccess === false) {
      alert("퀵보드 정보를 읽어오는데 실패하였습니다.");
    } else {
      const { scooters } = res;
      console.log(scooters);
      const lon = [];
      const lat = [];
      scooters.forEach((scooter) => {
        lon.push(scooter.lon);
        lat.push(scooter.lat);
      });
      const x = lon.reduce((prev, current) => prev + current) / scooters.length;
      const y = lat.reduce((prev, current) => prev + current) / scooters.length;

      //const x = scooters.reduce(
      //     (prev, current) => parseFloat(prev.lon) + parseFloat(current.lon)
      //   ) / scooters.length;

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

      for (let i = 0; i < scooters.length; i++) {
        addMarker(map, lon[i], lat[i]);
      }

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

export default Map;
