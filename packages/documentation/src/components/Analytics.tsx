/* eslint-disable react/no-danger */
import React, { FC } from "react";

const GA_CODE = process.env.GA_CODE || "UA-76079335-2";
const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_CODE}`;

const html = {
  __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_CODE}');`,
};

const Analytics: FC = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <script src={GA_SRC} async />
      <script dangerouslySetInnerHTML={html} />
    </>
  );
};

export default Analytics;
