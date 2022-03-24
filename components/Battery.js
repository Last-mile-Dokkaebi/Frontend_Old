import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const BatteryWrapper = styled.div`
  width: 5rem;
  height: 2.2rem;
  background-color: white;
  border: 2px black solid;
  border-radius: 0.3rem;
  padding: 0.1rem;
`;

const Battery = ({ soc }) => {
  const red = "rgb(255, 0, 0)";
  const yellow = "rgb(255, 127, 0)";
  const green = "rgb(0, 255, 0)";

  let currentColor;

  if (soc > 76) {
    currentColor = green;
  } else if (soc > 25) {
    currentColor = yellow;
  } else if (soc <= 25) {
    currentColor = red;
  }

  const currentBattery = `${soc}%`;

  return (
    <BatteryWrapper>
      <div
        style={{
          backgroundColor: currentColor,
          width: currentBattery,
          height: "100%",
          borderRadius: "0.2rem",
          position: "relative",
          top: "50%",
          transform: "translate(0, -50%)",
        }}
      ></div>
    </BatteryWrapper>
  );
};

Battery.propTypes = {
  soc: propTypes.number.isRequired,
};

export default Battery;
