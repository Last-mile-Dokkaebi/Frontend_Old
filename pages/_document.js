import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY
    return (
      <Html lang="ko">
        <Head>
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services`}
          />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}