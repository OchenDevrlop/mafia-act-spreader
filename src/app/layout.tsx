"use client"

import { ConfigProvider, theme } from "antd";
import faIR from "antd/locale/fa_IR"
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({ subsets: ["arabic"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" className={vazir.className}>
      <head>
        <title></title>
        <meta name="description" content="" />
        <meta name="author" content="Hossein Toluie" />
        <link rel="shortcut icon" href="/static/logo.png" />
      </head>
      <body className={vazir.className} dir="rtl" style={{
        outline: 0,
        margin: 0,
        boxSizing: "border-box",
        fontSize: "larger",
        backgroundColor: "#111111dd"
      }}>
        <ConfigProvider locale={faIR} theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#dd5419",
            fontFamily: "Vazirmatn"
          }
        }}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
