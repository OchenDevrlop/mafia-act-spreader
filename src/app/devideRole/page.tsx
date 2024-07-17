"use client";

import { Col, Flex, Grid, Modal, Row, notification } from "antd";
import { Vazirmatn } from "next/font/google";
import { UndoOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Player from "../Interfaces/Player";

type NotificationType = 'success' | 'error';

const vazir = Vazirmatn({ subsets: ["arabic"] });

export default function devideRole(){

  const redirectLink = useRef(null);
  const [countPlayers, setCountPlayers] = useState<number>(0);
  const [players, setPlayers] = useState<Player[]>([])
  const [openNotification, InstrictJSXForNotification] = notification.useNotification();
  const [modalInfo, setModalInfo] = useState<{isOpen: boolean, actTitle: string, description: string}>({
    isOpen: false,
    actTitle: "",
    description: ""
  });

  const showActModal = (event: Event) => {
    players.map((value) => {
      if((event!.target! as HTMLElement).innerText == value.name){
        setModalInfo({
          isOpen: true,
          actTitle: value.role,
          description: ""
        });
        (event!.target! as HTMLElement).style!.display = 'none';
        setCountPlayers(countPlayers + 1);
        if(players.length - 1 <= countPlayers){
          openNotificationWithIcon("success", "پخش نقش ها انجام شد!", "تا لحظاتی به صفحه راوی یا خدا منتقل می شوید!")
          setTimeout(
            () => {
              (redirectLink.current! as HTMLElement).click();
          }, 2222);
        }
      }
    })
  }
  
  const openNotificationWithIcon = (type: NotificationType, title: string, text: string) => {
    openNotification[type]({
      message: title,
      description: text,
    });
  };

  useEffect(() => {
    try{
      document.title = "نمایش و پخش نقش ها | مافیایی".trim();
      setPlayers(JSON.parse(localStorage.getItem("players")!));
    }catch(e){
      (redirectLink.current! as HTMLElement).click();
    }
    document.querySelectorAll('*').forEach((elem) => {
      elem.classList.add(vazir.className);
    })
  }, [])

    return (
        <Flex style={{
            color: "#fff",
            flexDirection: "column"
        }}>

          {InstrictJSXForNotification}

          <Modal title='نمایش نقش' okType="primary" okText="متوجه شدم!" open={modalInfo.isOpen} onClose={()=>setModalInfo({
            isOpen: false,
            actTitle: '',
            description: ''
          })} onCancel={()=>setModalInfo({
            isOpen: false,
            actTitle: '',
            description: ''
          })} onOk={()=>setModalInfo({
            isOpen: false,
            actTitle: '',
            description: ''
          })} footer={(_, {OkBtn}) => (
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
              paddingBottom: 0
            }}>{modalInfo.actTitle}</h1>
            <hr />
            <br />
            <p>{modalInfo.description}</p>
          </Modal>

          <Flex justify="space-around" align="center" key={1} style={{
                height: 50,
                width: "100%",
                backgroundColor: "#dd5419",
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                color: "#fff"
              }}>
              <UndoOutlined />
              <span>تقسیم نقش ها</span>
              <EyeOutlined />
          </Flex>

          <Flex justify="space-evenly" align="center" wrap="wrap" gap={12} key={2} style={{
            paddingTop: 12,
            width: "99%",
            margin: "0 auto"
          }}>
              
              {players.map((player, index) =>
                <Flex justify="center" align="center" key={index + 1} onClick={()=>showActModal(event as Event)} style={{
                  textAlign: "center",
                  padding: "18px 34px",
                  backgroundColor: "#ff8519",
                  cursor: "pointer",
                  borderRadius: 12
                }}>
                  {player.name}
                </Flex>
              )}

          </Flex>
          
          <Link href="../narrator" ref={redirectLink} />

        </Flex>
    )
}