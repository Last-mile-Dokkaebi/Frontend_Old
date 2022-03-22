import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";
import Router from "next/router";

import wrapper from "../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import { ACCESS_TOKEN, IDENTITY, REFRESH_TOKEN, THEME } from "../utils/token";
import { logInAction } from "../reducers/user";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../styles/theme";
import Loading from "../components/Loading";
import { setThemeModeAction } from "../reducers/system";

const App = ({ Component, pageProps, ...appProps }) => {
  const publicPath = ["/member/join", "/member/login"];
  const withoutLayoutPath = ["/member/join", "/member/login"];

  const { themeMode, isLoading } = useSelector((state) => state.system);
  const theme = themeMode === "light" ? light : dark;

  const dispatch = useDispatch();

  useEffect(() => {
    let isLogin = false;
    let theme = localStorage.getItem(THEME);

    theme
      ? dispatch(setThemeModeAction(theme))
      : dispatch(setThemeModeAction("right"));

    if (localStorage.getItem(IDENTITY)) {
      //로그인이 되어있을 경우 정보를 dispatch
      const data = {
        identity: localStorage.getItem(IDENTITY),
        accessToken: localStorage.getItem(ACCESS_TOKEN),
        refreshToken: localStorage.getItem(REFRESH_TOKEN),
      };
      dispatch(logInAction(data));
      isLogin = true;
    }

    if (publicPath.indexOf(window.location.pathname) === -1) {
      //public이 아닌 경우
      if (!isLogin) {
        Router.push("/member/login");
      }
    }
  }, []);

  //해당 URL의 경우 layout없이 component만 출력
  if (withoutLayoutPath.includes(appProps.router.pathname)) {
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  return (
    <>
      <Head>
        <title>Dokkaebi</title>
        <meta charSet="utf-8" />
      </Head>
      <ThemeProvider theme={theme}>
        {isLoading && <Loading />}
        <AppLayout>
          <Component />
        </AppLayout>
      </ThemeProvider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

export default wrapper.withRedux(App);
