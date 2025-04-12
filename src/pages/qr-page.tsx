
import { useEffect, useState } from 'react'
import { db } from "../database/db"
import { JeopardyGame } from '../database/interfaces/jeopardy'
import "../styles/jeopardy/qrPage.css"
import QrCodeGenerator from "../components/qr-codes"

function updateQrNumber(qrPayloads:string[],qrNumber:number){

  for(let i=0; i < qrPayloads.length;i++)
    qrPayloads[i] = qrPayloads[i].replace("|" + (qrNumber+1), "|" + (qrNumber+2))
 
  return ++qrNumber
}

function clearLocalStorage(){
    const game_code = localStorage.getItem("game_code")
    const first_load = localStorage.getItem("first_load")

    if(first_load == undefined)
      return
    for(let i=0;i < Number(localStorage.getItem(game_code+"num_categories"));i++){
      localStorage.removeItem(game_code+"isPopulated"+(i+1))
    }
    localStorage.removeItem(game_code+"populated_count")
    localStorage.removeItem(game_code+"num_categories")
    localStorage.removeItem("first_load")
}
async function gatherQrData() {
  
  const jeopardyGameDatas = await db.jeopardyData.where("game_id").equals(localStorage.getItem("_jp_game_id")!).toArray()
  const jeopardyGameData: JeopardyGame[] = []
  const qrBuffer = 1000

  jeopardyGameData.push(...jeopardyGameDatas)

  let qrPayload = [""], qrNumber = 0
   
  const game_id = localStorage.getItem("_jp_game_id")
  qrPayload[qrNumber] += "_jp_\n" + game_id + ":1|1\n"
  for (let i = 0; i < 29; i++) {
    if (i % 5 == 0) {
      qrPayload[qrNumber] += jeopardyGameData![i].theme + "\n"
    }
    qrPayload[qrNumber] += jeopardyGameData![i].question + "\n"
    qrPayload[qrNumber] += jeopardyGameData![i].answer + "\n"

    if(qrPayload[qrNumber].length >= qrBuffer){
      qrPayload.push("_jp_\n" + game_id + ":" + (qrNumber + 2 )+ "|" + (qrNumber + 2)  +"\n")
      qrNumber = updateQrNumber(qrPayload,qrNumber)
    }  
    
  }
  qrPayload[qrNumber] += jeopardyGameData![29].question + "\n"
  qrPayload[qrNumber] += jeopardyGameData![29].answer


  return qrPayload.join("|_|")

}

function QrPage() {
  const [question, setQuestion] = useState("");

  const fetchData = async () => {
    const data = await gatherQrData();
    setQuestion(data);
  };
  fetchData();
  
  useEffect(()=>{
    clearLocalStorage()
  },[])

  return (
    <>
      <h1 className='qr-title'>Scan QR Code(s) To Play</h1>
      <div className='qr-grid'>
        <QrCodeGenerator payload={question} />
      </div>
    </>
  )
}

export default QrPage

