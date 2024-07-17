"use client";

import React from "react";
import { Checkbox, Col, Flex, Modal, Row, notification } from "antd";
import { Vazirmatn } from "next/font/google";
import Player from "../Interfaces/Player";
import { EyeOutlined, BookOutlined } from "@ant-design/icons"

const vazir = Vazirmatn({ subsets: ["arabic"] });
let x = 0;
const cards = [
  {
    title: "ریوایو (برگشت یار)",
    description: "یک نفر که از بازی خارج شده را می تواند به بازی برگرداند، البته در هر صورت خودش خارج می شود."
  },
  {
    title: "شب خونین",
    description: "قبل از شات مافیا، تفنگ دست می گیرد و شخصی را میزند، اگر دکتر او را سیو نکند، از بازی بیرون می رود حتی اگر گادفادر یا زره پوش باشد."
  },
  {
    title: "ذهن زیبا",
    description: "کسی که در رای گیری بیرون می‌رود و کارت ذهن زیبا را می‌کشد، می‌تواند نقش یکی از بازیکنان را دقیق حدس بزند ( به طور مثال: بازیکن شماره 2 مافیای ساده هست یا کاراگاه یا....) اگر حدس او درست باشد و گرداننده تایید کند، به بازی بر می‌گردد و برای شخصی هم که نقش او را حدس زده اتفاقی نمی‌افتد."
  }
];


export default function narrator(){
  
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [showActs, IsShowActs] = React.useState<boolean>(false);
  const [finalCards, IsShowFinalCards] = React.useState<boolean>(false);
  const [cardToShow, setCardToShow] = React.useState<{ title: string, description: string}>({
    title: '',
    description: ''
  });
  
    React.useEffect(() => {
        document.title = "صفحه راوی و لیست بازیکنان | مافیایی".trim();
        setPlayers(JSON.parse(localStorage.getItem("players")!));
        document.querySelectorAll('*').forEach((elem) => {
          elem.classList.add(vazir.className);
        })
    }, [])

    React.useEffect(() => {
      let index = Math.floor(Math.random() * 3);
      setCardToShow({ 
        title: cards[index].title,
        description: cards[index].description
      });
    }, [finalCards])

    const changeStatusOfPlayer = (event: Event) => {
        if(x++ % 2 === 0){
            (event.target as HTMLElement).parentElement!.parentElement!.parentElement!.style.border = "#333 solid";
            (event.target as HTMLElement).parentElement!.parentElement!.parentElement!.style.backgroundColor = "#000";
        }else{
            (event.target as HTMLElement).parentElement!.parentElement!.parentElement!.style.border = "#720000aa solid";
            (event.target as HTMLElement).parentElement!.parentElement!.parentElement!.style.backgroundColor = "#630000aa";
        }
    }

    return (
        <Flex className={vazir.className} key={1} style={{
            color: "#fff",
            flexDirection: "column",
            position: "relative"
        }}>

          <Modal title='نمایش نقش' okType="primary" okText="متوجه شدم!" open={finalCards} onClose={()=>{IsShowFinalCards(!finalCards)}} onCancel={()=>{IsShowFinalCards(!finalCards)}} onOk={()=>{IsShowFinalCards(!finalCards)}} footer={(_, {OkBtn}) => (
              <Row>
                <Col span={24}>
                  <OkBtn key={1} />
                </Col>
              </Row>
            )}
          >
            <h1 style={{
              marginBottom: 0,
              outline: 0,
              paddingBottom: 0,
              textAlign: "center"
            }}>{cardToShow.title}</h1>
            <hr />
            <p style={{
              textAlign: "center"
            }}>{cardToShow.description}</p>

          </Modal>

          <Flex key={1} justify="space-around" align="center" style={{
                height: 50,
                width: "100%",
                backgroundColor: "#dd5419",
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                color: "#fff"
              }}>
                <span key={1}>صفحه راوی</span>
          </Flex>

          <Flex key={2} wrap="wrap" align="center" justify="center" gap={12} style={{
            marginTop: 12
          }}>
              
              {players.map((player, index) => 
                <Flex key={index + 1} align="center" justify="space-around" style={{
                    width: "90%",
                    height: 50,
                    border: "#720000aa solid",
                    backgroundColor: "#630000aa",
                    borderRadius: 12
                }}>

                    <Checkbox key={index + 1} checked onChange={() => {changeStatusOfPlayer(event as Event)}} />

                    <span key={index + 2}>{player.name}</span>

                    <span key={index + 3} style={{
                        fontSize: "small"
                    }}>نقش: {showActs ? player.role : ""}</span>

                </Flex>
              )}

          </Flex>
          
          <Flex key={3} justify="space-evenly" align="center" style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
            margin: "0 auto",
            height: 50,
            backgroundColor: "#dd5419aa",
            padding: "0px 0",
            borderRadius: "19px 19px 0 0"
          }}>
            
            <EyeOutlined key={1} onClick={() => {IsShowActs(!showActs)}} style={{
                padding: "6px 8px",
                border: "#720000aa solid",
                backgroundColor: "#720000aa",
                borderRadius: 7,
                cursor: "pointer"
            }} />

            <BookOutlined key={2} onClick={() => {IsShowFinalCards(!finalCards)}} style={{
                padding: "6px 8px",
                border: "#720000aa solid",
                backgroundColor: "#720000aa",
                borderRadius: 7,
                cursor: "pointer"
            }} />

          </Flex>

        </Flex>
    )
}