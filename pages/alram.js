import React from "react";
import styled from "styled-components";

const Test = styled.div`
  position: block;
  width: 100%;
`;

const alram = () => {
  const t = [...new Array(1000)].map((_, index) => index);

  return (
    <>
      {t.map((elem) => (
        <Test key={elem}>알람페이지 예정</Test>
      ))}
    </>
  );
};

export default alram;
