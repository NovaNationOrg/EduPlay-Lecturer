
import { useState } from 'react'
import QRCode from "react-qr-code"
import { db } from "../database/db"
import { JeopardyGame } from '../database/interfaces/jeopardy'
import "../styles/jeopardy/qrPage.css"

async function gatherQrData(){
  
  let jeopardyGameDatas = await db.jeopardyData.where("game_id").equals("jp1").toArray()
  let jeopardyGameData:JeopardyGame[] = []

  jeopardyGameData.push(...jeopardyGameDatas)
  
  jeopardyGameData.sort((a, b) => {
      if (a.category_num < b.category_num) {
        return -1;
      }
      if (a.category_num > b.category_num) {
          return 1;
      }
    return 0;
  })

  console.log(jeopardyGameData)

  let qrPayload = ""
  qrPayload+="_jp_\njp01\n"


  for(let i=0; i<jeopardyGameData.length; i++) {
    console.log(jeopardyGameData[i].question)
  }


  for(let i=0;i < 29;i++){
    if(i%5==0){
      qrPayload+=jeopardyGameData![i].theme + "\n"
    }
    qrPayload+=jeopardyGameData![i].question + "\n"
    qrPayload+=jeopardyGameData![i].answer + "\n"

  }
  qrPayload+=jeopardyGameData![29].question + "\n"
  qrPayload+=jeopardyGameData![29].answer 


  console.log(qrPayload)
  return qrPayload
}

function Original() {
  const [question, setQuestion] = useState("");
  
    const fetchData = async () => {
      const data = await gatherQrData();
      setQuestion(data);
    };
    fetchData();


  return (
    <>
      <h1 className='qr-title'>Scan QR Code To Play</h1>
      <div className='qr-container' >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={question}
        viewBox={`0 0 256 256`}
        className=''
      />

</div>
    </>
  )
}

export default Original

