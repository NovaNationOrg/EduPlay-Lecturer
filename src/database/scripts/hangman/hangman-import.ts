import { Hangman } from "../../../pages/csv-import-func";
import { db } from "../../db";



export async function addHangmanGame(hangmanContent: Hangman[],gameID:string){
    const date = new Date();
    const game_code = "_hm_"

    await db.gameList.add({
        game_code: game_code,
        game_id: game_code + gameID,
        date: date
    })

    let categoryNumber = 1
    let category
    for(let i=0;i < hangmanContent.length;i++){
        category = hangmanContent[i].category
        await db.hangmanCategories.add(
            {
                game_id : game_code+ gameID,
                category: category,
                category_number: categoryNumber
            }
        )
        let categoryObject = await db.hangmanCategories.orderBy("id").last()
        let categoryId = categoryObject?.id
        while(i < hangmanContent.length && hangmanContent[i].category==category){
            await db.hangmanItems.add(
                    {
                        category_id:categoryId!,
                        category_number:categoryNumber,
                        question:hangmanContent[i].question
                    }
            )
            i++
        }
        categoryNumber++
        i--
    }

    localStorage.setItem("game_code","_hm_")
    
}