
import { useEffect, useState } from 'react'
import "../styles/jeopardy/qrPage.css"
import QrCodeGenerator from "../components/qr-codes"
import { managePayloads } from '../components/payload-manager'
import { db } from '../database/db'
import { motion } from "framer-motion"

async function addGameEntry(){
  const date = new Date();
  const game_code = localStorage.getItem("game_code")!
  const game_id = localStorage.getItem(game_code+"game_id")
  await db.gameList.add({
    game_code: game_code,
    game_id: game_id!,
    date: date
})
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
    addGameEntry()
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
    <motion.div
       initial = {{opacity:0}}
        animate  ={{opacity:1}}
        exit={{opacity:0}}
    >
      <h1 className='qr-title'>Scan QR Code(s) To Play</h1>
      <div className='qr-grid'>
        <QrCodeGenerator payload={question} />
      </div>
    </motion.div>
  )
}

export default QrPage

