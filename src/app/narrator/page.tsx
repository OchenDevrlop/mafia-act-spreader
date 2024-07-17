"use client";

import React from "react";
import { Checkbox, Flex, notification } from "antd";
import { Vazirmatn } from "next/font/google";
import Player from "../Interfaces/Player";
import { EyeOutlined } from "@ant-design/icons"

const vazir = Vazirmatn({ subsets: ["arabic"] });
let x = 0;

export default function narrator(){

    document.title = "صفحه راوی و لیست بازیکنان | مافیایی".trim();

    const [players, setPlayers] = React.useState<Player[]>([]);
    const [showActs, IsShowActs] = React.useState<boolean>(false);

    React.useEffect(() => {
        setPlayers(JSON.parse(localStorage.getItem("players")!));
    }, [])

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
        <Flex className={vazir.className} style={{
            color: "#fff",
            flexDirection: "column",
            position: "relative"
        }}>

          <Flex justify="space-around" align="center" key={1} style={{
                height: 50,
                width: "100%",
                backgroundColor: "#dd5419",
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                color: "#fff"
              }}>
                <span>صفحه راوی</span>
          </Flex>

          <Flex wrap="wrap" align="center" justify="center" gap={12} style={{
            marginTop: 12
          }}>
              
              {players.map((player, index) => 
                <Flex align="center" justify="space-around" style={{
                    width: "90%",
                    height: 50,
                    border: "#720000aa solid",
                    backgroundColor: "#630000aa",
                    borderRadius: 12
                }}>

                    <Checkbox key={index + 1} checked onChange={() => {changeStatusOfPlayer(event as Event)}} />

                    <span key={index + 1}>{player.name}</span>

                    <span key={index + 1} style={{
                        fontSize: "small"
                    }}>نقش: {showActs ? player.role : ""}</span>

                </Flex>
              )}

          </Flex>
          
          <Flex justify="space-evenly" align="center" style={{
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
            <EyeOutlined onClick={() => {IsShowActs(!showActs)}} style={{
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