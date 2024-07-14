"use client";

import { Flex, Modal } from "antd";
import { Vazirmatn } from "next/font/google";
import { UndoOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Player from "../Interfaces/Player";

const vazir = Vazirmatn({ subsets: ["arabic"] });

export default function devideRole(){

  const [players, setPlayers] = useState<Player[]>([])
  const [modalInfo, setModalInfo] = useState<{isOpen: boolean, actTitle: string, description: string}>({
    isOpen: false,
    actTitle: "",
    description: ""
  });

  const showActModal = (event: Event) => {
    players.map((value) => {
      if(event!.target!.innerText == value.role){
        setModalInfo({
          isOpen: true,
          actTitle: value.name,
          description: ""
        });
        event!.target!.style!.display = 'none'
      }
    })
  }

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem("players")!));
  }, [])

    return (
        <Flex className={vazir.className} style={{
            color: "#fff",
            flexDirection: "column"
        }}>

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
              <>
                <OkBtn key={1} />
              </>
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
                <Flex justify="center" align="center" key={index + 1} onClick={()=>showActModal(event)} style={{
                  textAlign: "center",
                  padding: "18px 34px",
                  backgroundColor: "#ff8519",
                  cursor: "pointer",
                  borderRadius: 12
                }}>
                  {player.role}
                </Flex>
              )}

          </Flex>

        </Flex>
    )
}