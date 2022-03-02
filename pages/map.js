import React, { useEffect, useRef } from 'react';

const map = () => {
  const kakaoMap = useRef(null)

  useEffect(() => {
    const x = 128.39090;
    const y = 36.14694;
    const coords = new window.daum.maps.LatLng(y, x)
    const options = {
      center: coords,
      level: 3,
    }

    const map = new window.daum.maps.Map(kakaoMap.current, options);
    const marker = new window.daum.maps.Marker({
      position: coords,
      map,
    })

    map.relayout();
    map.setCenter(coords);
    marker.setPosition(coords);

    const mapTypeControl = new window.daum.maps.MapTypeControl();

    map.addControl(
      mapTypeControl,
      window.kakao.maps.ControlPosition.TOPRIGHT
    );
    const zoomControl = new window.daum.maps.ZoomControl();
    map.addControl(
      zoomControl,
      window.daum.maps.ControlPosition.RIGHT
    )

  }, [kakaoMap])

  return (
    <div style={{ widht: '500px', height: '400px' }}>
      <div ref={kakaoMap} style={{ widht: '100%', height: '100%' }} />
    </div>
  )
}

export default map