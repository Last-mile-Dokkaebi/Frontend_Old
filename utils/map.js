const addMarker = (
  map,
  scooter,
  mouseOver = null,
  mouseOut = null,
  click = null
) => {
  const kakao = window.kakao;
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
};
