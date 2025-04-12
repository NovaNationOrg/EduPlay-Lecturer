import { db } from "../../database/db";

export async function fetchQuestions(category_id:number,category_number:number){

    return await db.hangmanItems.where("[category_id+category_number]").equals([category_id,category_number]).toArray()

}