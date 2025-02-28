
import { useState, useEffect } from 'react'
import QRCode from "react-qr-code"
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from "../database/db"


// let gameData = useLiveQuery(
//   async () => {
//       const gameData = await db.jeopardyData
//           .where('game_id')
//           .equals("jp1")
//           .toArray()

//       return gameData
//   }
// )

async function gatherQrData(){
  
  let jeopardyGameData =await db.jeopardyData.where("game_id").equals("jp1").toArray()
  let qrPayload = ""
  const themes = [...new Set(jeopardyGameData?.map(record => record.theme))]

 
  for(let i=0;i < 29;i++){
    if((i-2)%5==0){
      qrPayload+=jeopardyGameData![i].theme + "\n"
    }
    else if(i%2==0){
      qrPayload+=jeopardyGameData![i].answer + "\n"
    }else{
      qrPayload+=jeopardyGameData![i].question + "\n"
    }
  }
  qrPayload+=jeopardyGameData![30].answer
  return qrPayload
}

function Original() {
  const [question,setQuestion] = useState('uunasd')
  
  // gatherQrData()
  // setQuestion(gatherQrData)

  return (
    <>
      <h1>{question}</h1>

      <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={question}
        viewBox={`0 0 256 256`}
      />

</div>
    </>
  )
}

export default Original

