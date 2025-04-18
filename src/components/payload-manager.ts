import { db } from "../database/db";
import { JeopardyGame } from "../database/interfaces/jeopardy";

export async function managePayloads(){
    let payload:Promise<string> 
    const game_code = localStorage.getItem("game_code")
    const game_id = localStorage.getItem(game_code+"game_id")
    switch (game_code) {
        case "_jp_":
            payload = handleJeopardyPayload(game_code,game_id!)
            break;
        case"_hm_":
            payload = handleHangmanPayload(game_code,game_id!)
            break
        default:
            payload= defaultPromiseString()
            break;
    }
    return payload

}

async function defaultPromiseString(){
    return ""
}
async function handleJeopardyPayload(game_code:string,game_id:string){
  const jeopardyGameDatas = await db.jeopardyData.where("game_id").equals(localStorage.getItem("_jp_game_id")!).toArray()
  const jeopardyGameData: JeopardyGame[] = []
  const qrBuffer = 1000

  jeopardyGameData.push(...jeopardyGameDatas)

  let qrPayload = [""], qrNumber = 0
   
  qrPayload[qrNumber] += game_code +"\n" + game_id + ":1|1\n"
  for (let i = 0; i < 29; i++) {
    if (i % 5 == 0) {
      qrPayload[qrNumber] += jeopardyGameData![i].theme + "\n"
    }
    qrPayload[qrNumber] += jeopardyGameData![i].question + "\n"
    qrPayload[qrNumber] += jeopardyGameData![i].answer + "\n"

    if(qrPayload[qrNumber].length >= qrBuffer){
      qrPayload.push(game_code+"\n" + game_id + ":" + (qrNumber + 2 )+ "|" + (qrNumber + 2)  +"\n")
      qrNumber = updateQrNumber(qrPayload,qrNumber)
    }  
    
  }
  qrPayload[qrNumber] += jeopardyGameData![29].question + "\n"
  qrPayload[qrNumber] += jeopardyGameData![29].answer


  return qrPayload.join("|_|")
}

async function handleHangmanPayload(game_code:string,game_id:string){
    const hangmanCategories = await db.hangmanCategories.where("game_id").equals(localStorage.getItem("_hm_game_id")!).toArray()
    let qrPayload = [""], qrNumber = 0
    const qrBuffer = 1000

    qrPayload[qrNumber] += game_code+"\n" + game_id + ":1|1\n"
    for(let i=0;i < hangmanCategories.length; i++){
        const questions = await db.hangmanItems.where("[category_id+category_number]").equals([hangmanCategories[i].id,hangmanCategories[i].category_number]).toArray()
        qrPayload[qrNumber] += hangmanCategories[i].category + ":" + questions.length + "\n"
        for(let x=0;x < questions.length;x++){
            qrPayload[qrNumber] += questions[x].question + "\n"
        }
    }

    if(qrPayload[qrNumber].length >= qrBuffer){
        qrPayload.push(game_code+"\n" + game_id + ":" + (qrNumber + 2 )+ "|" + (qrNumber + 2)  +"\n")
        qrNumber = updateQrNumber(qrPayload,qrNumber)
      }  

    return qrPayload.join("|_|")

    
}

function updateQrNumber(qrPayloads:string[],qrNumber:number){

    for(let i=0; i < qrPayloads.length;i++)
      qrPayloads[i] = qrPayloads[i].replace("|" + (qrNumber+1), "|" + (qrNumber+2))
   
    return ++qrNumber
  }