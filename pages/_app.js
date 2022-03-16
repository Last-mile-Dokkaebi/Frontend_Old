import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";
import Router from "next/router";

import wrapper from "../store/configureStore";
import { useDispatch } from "react-redux";
import AppLayout from "../components/AppLayout";
import { ACCESS_TOKEN, IDENTITY, REFRESH_TOKEN } from "../utils/token";
import { loginAction } from "../reducers/user";

const App = ({ Component }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const publicPath = ["/member/join", "/member/login"];
    let isLogin = false;
    if (localStorage.getItem(IDENTITY)) {
      //로그인이 되어있을 경우 정보를 dispatch
      const data = {
        identity: localStorage.getItem(IDENTITY),
        accessToken: localStorage.getItem(ACCESS_TOKEN),
        refreshToken: localStorage.getItem(REFRESH_TOKEN),
      };
      dispatch(loginAction(data));
      isLogin = true;
    }

    if (publicPath.indexOf(window.location.pathname) === -1) {
      //public이 아닌 경우
      if (!isLogin) {
        Router.push("/member/login");
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dokkaebi</title>
        <meta charSet="utf-8" />
      </Head>
      <AppLayout>
        <Component />
        {/* {isLoggedIn && <Component />}
        {!isLoggedIn && !isJoinPage && <LoginForm />}
        {isJoinPage && <JoinForm />} */}
      </AppLayout>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
