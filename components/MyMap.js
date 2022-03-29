import React, { memo, useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import propTypes from "prop-types";

// eslint-disable-next-line react/display-name
const MyMap = memo(({ level = 4, children = "", positions }) => {
  if (!Array.isArray(positions)) {
    return <></>;
  }

  const [centerLat, setCenterLat] = useState(0);
  const [centerLon, setCenterLon] = useState(0);

  useEffect(() => {
    const lon = [];
    const lat = [];

    positions.forEach((position) => {
      if (Object.keys(position).includes("lng")) {
        lon.push(position.lng);
      } else {
        lon.push(position.lon);
      }
      lat.push(position.lat);
    });

    setCenterLon(
      lon.reduce((prev, current) => prev + current) / positions.length
    );
    setCenterLat(
      lat.reduce((prev, current) => prev + current) / positions.length
    );
  });

  return (
    <>
      <Map
        center={{ lat: centerLat, lng: centerLon }}
        style={{ width: "100%", height: "100%" }}
        level={level}
      >
        {children}
      </Map>
    </>
  );
});

MyMap.propTypes = {
  level: propTypes.number,
  positions: propTypes.array.isRequired,
  children: propTypes.node,
};

export default MyMap;
