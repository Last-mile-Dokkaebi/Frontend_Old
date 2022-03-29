import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeHistoryAction, setHistoriesAction } from "../reducers/map";
import { getPathApi } from "../utils/api";
import { startLoadingAction, endLoadingAction } from "../reducers/system";
import styled from "styled-components";
import MyMap from "../components/MyMap";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const history = () => {
  const { identity } = useSelector((state) => state.user);
  const { currentHistory, histories } = useSelector((state) => state.map);
  const [paths, setPaths] = useState([]);
  const [start, setStart] = useState({ lat: 0, lng: 0 });
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(startLoadingAction());
    const res = await getPathApi(identity);
    if (res.isSuccess) {
      if (!currentHistory) {
        //처음 불러올 경우
        dispatch(changeHistoryAction(0));
        dispatch(setHistoriesAction(res.data));
        setPaths(
          res.data[0].data.map((path) => ({
            lat: path.lat,
            lng: path.lon,
          }))
        );
        setStart({
          lat: res.data[0].data[0].lat,
          lng: res.data[0].data[0].lon,
        });
        dispatch(endLoadingAction());
      } else {
        //처음 불러오는 것이 아닌 경우
        dispatch(endLoadingAction());
      }
    } else {
      dispatch(endLoadingAction());
      alert(res.data);
    }
  }, []);

  if (histories.length === 0) {
    return <></>;
  }

  console.log(paths);
  console.log(start);

  return (
    <Wrapper>
      <MyMap positions={histories[currentHistory].data} level={2}>
        <MapMarker position={start} />
        <Polyline
          path={paths}
          strokeWeight={3}
          strokeColor={"#000000"}
          strokeOpacity={0.5}
        />
      </MyMap>
    </Wrapper>
  );
};

export default history;
