
import { useEffect, useState } from 'react'
import { db } from "../database/db"
import { JeopardyGame } from '../database/interfaces/jeopardy'
import "../styles/jeopardy/qrPage.css"
import QrCodeGenerator from "../components/qr-codes"
import { managePayloads } from '../components/payload-manager'


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
  return managePayloads()
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

