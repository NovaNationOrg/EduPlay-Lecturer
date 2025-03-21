import { Jeopardy } from "../../pages/csv-import-func";
// import {toast } from 'react-toastify';
import { db } from "../db";

const date = new Date();
// const generateToast = (toastMessage: string, toastIO: string) => {
//    toast(toastMessage, {
//    toastId: toastIO
//     });
//   };
export async function addJeopardyGame(jeopardyContent: Jeopardy[],gameID:string) {

    let category_num = 0

    

    await db.gameList.add({
        game_code: "_jp_",
        game_id: "jp" + gameID,
        date: date
    })

    for (let i = 0; i < jeopardyContent.length; i++) {
        if ((i % 5) == 0)
            category_num += 1

        await db.jeopardyData.add({
            question: jeopardyContent[i].question,
            answer: jeopardyContent[i].answer,
            game_id: "jp" + gameID,
            theme: jeopardyContent[i].category,
            points: (i % 5) * 100,
            category_num: category_num
        })


    }

}