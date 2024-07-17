"use client"

import { PlusOutlined } from "@ant-design/icons"
import { Button, Checkbox, Flex, Form, Input, Modal } from "antd"
import { Vazirmatn } from "next/font/google"
import Link from "next/link"
import CitizenRoles from "../Objects/CitizenRoles"
import MafiaRoles from "../Objects/MafiaRoles"
import IndependentRoles from "../Objects/IndependentRoles"
import Player from "../Interfaces/Player"
import { useEffect, useRef, useState } from "react"
import { AnyObject } from "antd/es/_util/type"

const vazir = Vazirmatn({ subsets: ["arabic"] });
let finalActs : AnyObject = {};
var persianFinalActs : any = [];

export default function selectRole(){

    let players : Player[] = [];
    
    useEffect(() => {
        document.title = "انتخاب نقش ها | مافیایی".trim();
        players = JSON.parse(localStorage.getItem("players")!)
    })

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [citizenForm] = Form.useForm();
    const [mafiaForm] = Form.useForm();
    const [independentForm] = Form.useForm();
    const [modalForm] = Form.useForm();
    const redirectLink = useRef(null);

    function shuffle(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const closeModal = () => setIsModalOpen(false)

    const handleOk = async () => {
        try {
            const modalFormResult = await modalForm.validateFields();
            let players : Player = JSON.parse(localStorage.getItem("players")!);
            await shuffle(persianFinalActs);
            await shuffle(players)
            await (players as any).map((player: any, index: number) => {
                persianFinalActs[index].name = player.name.toString();
            })
        }catch(e){}
        console.log(persianFinalActs)
        localStorage.setItem("players", JSON.stringify(persianFinalActs));
        await (redirectLink.current! as HTMLElement).click();
    }

    const devideRole = async () => {
        const citizenFormResult = await citizenForm.validateFields();
        const mafiaFormResult = await mafiaForm.validateFields();
        const independentFormResult = await independentForm.validateFields();
        finalActs = {};
        persianFinalActs = [];
        for (let key in citizenFormResult) {
            if(citizenFormResult[key] === "on")
                finalActs[key] = citizenFormResult[key];
        }
        for (let key in mafiaFormResult) {
            if(mafiaFormResult[key] === "on")
                finalActs[key] = mafiaFormResult[key];    
        }
        for (let key in independentFormResult) {
            if(independentFormResult[key] === "on")
                finalActs[key] = independentFormResult[key];
        }
        console.table(finalActs);
        CitizenRoles.map((value) => {
            for (const key in finalActs) {
                if(value.englishName == key){
                    persianFinalActs = [ ...persianFinalActs, {role: value.name, englishName: value.englishName}];
                }
            }
        })
        MafiaRoles.map((value) => {
            for (const key in finalActs) {
                if(value.englishName == key){
                    persianFinalActs = [ ...persianFinalActs, {role: value.name, englishName: value.englishName}];
                }
            }
        })
        IndependentRoles.map((value) => {
            for (const key in finalActs) {
                if(value.englishName == key){
                    persianFinalActs = [ ...persianFinalActs, {role: value.name, englishName: value.englishName}];
                }
            }
        })
        await console.log(persianFinalActs)
        await setIsModalOpen(true);
    }

    return (

        <Flex gap={4} style={{
            flexDirection: "column"
        }}>

          <Modal title="تعداد هر نقش" open={isModalOpen} onOk={handleOk} onCancel={closeModal} onClose={closeModal}>
            <Form form={modalForm}>
                { persianFinalActs.map((value: {name: string, englishName: string, role?: string}) =>
                    <Form.Item name={value.englishName} label={value.name ? value.name : value.role} initialValue={1} rules={[{
                        required: true
                    }]}>
                        <Input type="number" />
                    </Form.Item>
                )}
            </Form>
          </Modal>

          <Flex justify="space-around" align="center" style={{
              height: 50,
              width: "100%",
              backgroundColor: "#dd5419",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
              color: "#fff"
          }}>
              <span>تعداد بازیکن ها: {players.length} نفر</span>
              <PlusOutlined />
          </Flex>

          <Flex justify="space-around" align="center" style={{
              height: 29,
              width: "98%",
              backgroundColor: "#006600aa",
              borderRadius: 10,
              color: "#fff",
              margin: "0 auto"
          }}>
              <span style={{
                fontSize: 15
              }}>نقش های شهروند</span>
          </Flex>

          <Flex justify="space-around" align="center" wrap="wrap" gap={10} style={{
              width: "100%",
              color: "#fff",
              margin: "7px auto"
          }}>
            <Form form={citizenForm} style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
            {CitizenRoles.map((role) => 
                <Form.Item name={role.englishName}>
                  <Flex justify="space-around" align="center" gap={2} style={{
                      fontSize: 10,
                      width: "29vw",
                      border: "#006600aa solid 3px",
                      borderRadius: 6
                  }}>
                      <Checkbox />
                      <span>{role.name}</span>
                  </Flex>
                </Form.Item>
            )}
            </Form>
          </Flex>

          <Flex justify="space-around" align="center" style={{
              height: 29,
              width: "98%",
              backgroundColor: "#660000aa",
              borderRadius: 10,
              color: "#fff",
              margin: "0 auto"
          }}>
              <span style={{
                fontSize: 15
              }}>نقش های مافیا</span>
          </Flex>

          <Flex justify="space-around" align="center" wrap="wrap" gap={10} style={{
              width: "100%",
              color: "#fff",
              margin: "7px auto"
          }}>
            <Form form={mafiaForm} style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
            {MafiaRoles.map((role) =>
                <Form.Item name={role.englishName}>
                  <Flex justify="space-around" align="center" gap={2} style={{
                      fontSize: 10,
                      width: "29vw",
                      border: "#660000aa solid 3px",
                      borderRadius: 6
                  }}>
                      <Checkbox />
                      <span>{role.name}</span>
                  </Flex>
                </Form.Item>
            )}
            </Form>
          </Flex>

          <Flex justify="space-around" align="center" style={{
              height: 29,
              width: "98%",
              backgroundColor: "#ffaa11aa",
              borderRadius: 10,
              color: "#fff",
              margin: "0 auto"
          }}>
              <span style={{
                fontSize: 15
              }}>نقش های مستقل</span>
          </Flex>

          <Flex justify="space-around" align="center" wrap="wrap" gap={10} style={{
              width: "100%",
              color: "#fff",
              margin: "7px auto",
              paddingBottom: 50
          }}>
            <Form form={independentForm} style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
            {IndependentRoles.map((role) =>
                <Form.Item name={role.englishName}>
                  <Flex justify="space-around" align="center" gap={2} style={{
                      fontSize: 10,
                      width: "29vw",
                      border: "#ffaa11aa solid 3px",
                      borderRadius: 6
                  }}>
                      <Checkbox />
                      <span>{role.name}</span>
                  </Flex>
                </Form.Item>
            )}
            </Form>
          </Flex>

           <Flex justify="center" align="center" style={{
             position: "fixed",
             bottom: 0,
             right: 0,
             left: 0,
             width: "100%",
             height: 40,
             backgroundColor: "#dd541944",
             padding: "12px 0",
             borderRadius: "19px 19px 0 0"
           }}>
              <Button className={vazir.className} type="primary" onClick={devideRole} style={{
                  width: "100%"
              }}>تقسیم نقش ها میان {players.length} بازیکن</Button>
           </Flex>

           <Link href="../devideRole" ref={redirectLink} />

        </Flex>
    )
}