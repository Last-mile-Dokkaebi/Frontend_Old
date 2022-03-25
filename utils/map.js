/**
 * @typedef {object} Scooter
 * @property  {string} address
 * @property  {string} bike
 * @property  {float} lat
 * @property  {float} lon
 * @property  {int} road
 * @property  {string} roadAddress
 * @property  {int} soc
 * @property  {string} status
 */

/**
 *
 * @param {[]} markers Array of Marker
 * @param {object} map kaka.maps.Map
 * @param {Scooter} scooter Scooter Object
 * @param {function} click Click Function
 */
const addMarker = (markers, map, scooter, click = null) => {
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

  kakao.maps.event.addListener(marker, "mouseover", () => overlay.setMap(map));
  kakao.maps.event.addListener(marker, "mouseout", () => overlay.setMap(null));

  kakao.maps.event.addListener(marker, "click", click);

  marker.setMap(map);
  markers.push(marker);
};

export { addMarker };
