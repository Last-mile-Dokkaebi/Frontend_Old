import React from "react";
import RentalMap from "../components/RentalMap";
// import RentalMap from "../components/RentalMap";

const Index = () => {
  // const { identity } = useSelector((state) => state.user);

  /*로그인 되어 있을 경우 개인 페이지를 보여줌*/
  /* 첫 메인페이지는 맵을 띄워줌*/
  return (
    <>
      <RentalMap />
    </>
  );
};

export default Index;
