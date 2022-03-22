import React from "react";
import Map from "../components/Map";

const Index = () => {
  // const { identity } = useSelector((state) => state.user);

  /*로그인 되어 있을 경우 개인 페이지를 보여줌*/
  /* 첫 메인페이지는 맵을 띄워줌*/
  return (
    <>
      <Map />
    </>
  );
};

export default Index;
