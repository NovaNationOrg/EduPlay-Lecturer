import { Jeopardy } from "../../pages/csv-import-func";
import { db } from "../db";

const date = new Date();

export async function addJeopardyGame(jeopardyContent: Jeopardy[],gameID:string) {

    let category_num = 0
    await db.gameList.add({
        game_code: "_jp_",
        game_id: "_jp_" + gameID,
        date: date
    })

    for (let i = 0; i < jeopardyContent.length; i++) {
        if ((i % 5) == 0)
            category_num += 1

        await db.jeopardyData.add({
            question: jeopardyContent[i].question,
            answer: jeopardyContent[i].answer,
            game_id: "_jp_" + gameID,
            theme: jeopardyContent[i].category,
            points: (i % 5) * 100,
            category_num: category_num
        })

    }
    localStorage.setItem("game_code","_jp_")

}

export function deleteJeopardyGame(game_id:string){
    db.jeopardyData.where("game_id").equals(game_id).delete() 
}

export function deleteJeopardyCategory(game_id:string,category:number){
      db.jeopardyData.where("[game_id+category_num]").equals([game_id, category]).delete() //#TODO: Make this depend on dynamic values
}