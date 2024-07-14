"use client"

import { 
  Flex,
  Form,
  Input,
  Button,
  Checkbox,
  notification
} from "antd";
import {
  SettingOutlined,
  SelectOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { Vazirmatn } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Player from "./Interfaces/Player";

type NotificationType = 'success' | 'error';

const vazir = Vazirmatn({ subsets: ["arabic"] });

export default function Home() {

  const [player, setPlayer] = React.useState<Player[]>([]);
  const [form] = Form.useForm();
  const redirectLink = useRef(null);
  const [openNotification, InstrictJSXForNotification] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, title: string, text: string) => {
    openNotification[type]({
      message: title,
      description: text,
    });
  };

  const formAction = async () => {
    const playerFromForm : { newPlayerName: string } = await form.validateFields();
    const newPlayer : Player = { name: playerFromForm.newPlayerName, role: ""};
    form.resetFields();
    setPlayer([...player, newPlayer]);
  }

  const deletePlayer = (playerName: string) => {
    const playersObject = player;
    playersObject.forEach((value, index) => {
      if(value.name === playerName){
        playersObject.splice(index, 1);
        setPlayer([ ...playersObject ]);
      }
    })
  }

  const authenticatePlayers = () => {
    localStorage.setItem("players", JSON.stringify(player));
    if(player.length < 5){
      // alert("Error in participators sum");
      openNotificationWithIcon('error', 'کمبود نفرات', 'بازی مافیا با حداقل 5 نفر می تواند آغاز شود.');
    }else{
      openNotificationWithIcon('success', 'تایید شد!', 'درحال رفتن به صفحه انتخاب نقش ...');
      setTimeout(() => redirectLink.current!.click(), 600);
    }
  }

  useEffect(() => {
    const player = localStorage.getItem("players");
    if(player){
      try {
        setPlayer(JSON.parse(player));
      }catch (error) {
        console.log("Error:", error)
      }
    }
  }, [])

  return (
    <>

      {InstrictJSXForNotification}
      
      <Flex style={{
        flexDirection: "column",
        position: "relative"
      }}>

        <Flex align="center" justify="space-evenly" key={1} style={{
          height: "80px",
          width: "100%",
          backgroundColor: "#dd5419",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          color: "#fff"
        }}>
          <SelectOutlined />
          <span style={{
            height: "85%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            width: "75%",
            // border: "#f00 solid 5px",
            // borderRadius: 16
          }}>لیست بازیکن ها</span>
          <SettingOutlined />
        </Flex>

        <Flex justify="center" align="center" key={2} style={{
          padding: "18px 0",
          width: "100%"
        }}>
          <Form
          form={form}
          style={{
            width: "90%"
          }}
          onFinish={formAction}
          >
            <p className={vazir.className}>افزودن بازیکن جدید</p>
            <Form.Item name="newPlayerName" className={vazir.className} label="" rules={[{
              min: 3,
              required: true,
              message: "حداقل سه کاراکتر"
            }]}>
              <Input name="newPlayerName" className={vazir.className} style={{
                width: "100%"
              }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" className={vazir.className} style={{
              width: "100%"
            }}>افزودن</Button>
          </Form>
        </Flex>

        <hr style={{
          width: "90%",
          margin: "0 auto"
        }} />

        <Flex gap={16} align="center" justify="center" wrap="wrap" key={3} style={{
          paddingTop: 24,
          paddingBottom: 85
        }}>

          {player.length > 0 ? player.map((player, index) =>
            <Flex justify="space-evenly" align="center" key={index + 1} style={{
              width: "90%",
              height: 100,
              border: "#dd5419 solid 2px",
              borderRadius: 12
            }}>
              <span style={{
                color: "#fff",
                width: "74%",
                textAlign: "center"
              }}>{player.name}</span>
              <DeleteOutlined onClick={() => deletePlayer(player.name)} style={{
                fontSize: "x-large",
                color: "#dd5419",
                cursor: "pointer"
              }} />
            </Flex>
          ) : 
            <div style={{ color: "#FFF"}}>بازیکنی وجود ندارد، اضافه کنید!</div>
          }
          
        </Flex>
        
        <Flex align="center" justify="center" key={4} style={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          margin: "0 auto",
          height: 50,
          backgroundColor: "#dd541944",
          padding: "12px 0",
          borderRadius: "19px 19px 0 0"
        }}>
            <Button type="primary" onClick={authenticatePlayers} className={vazir.className}>تقسیم و انتخاب نقش ها بین بازیکنان انتخاب شده</Button>
        </Flex>

        <Link href="./selectRole" key={1} ref={redirectLink} />

      </Flex>
     </>
  );
}
