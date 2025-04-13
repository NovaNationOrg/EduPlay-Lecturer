import {generateUUID} from "./uuid-generator";
import {toast} from "sonner"
import { deleteJeopardyGame } from "../database/scripts/jeopardy-import";

export function handleDraft(game_code:string){
    localStorage.setItem("game_code",game_code!)
    if(Number(localStorage.getItem(game_code+"populated_count")) == 0)
        initialiseStorage(game_code)
    else
        localStorage.setItem(game_code+"in_draftable","true")     
}

function prepareGame(game_code:string){
    dismissToast()
    localStorage.setItem(game_code+"populated_count","0")
    deleteJeopardyGame(localStorage.getItem(game_code+"game_id")!)
    const numCategories = Number(localStorage.getItem(game_code+"num_categories")) //Whenever a new game is being added, the num categories field must be added
    for(let i=0;i < numCategories;i++){
        localStorage.removeItem(game_code+"isPopulated" + (i+1))
    }
    initialiseStorage(game_code)
    window.location.reload()
}

function initialiseStorage(game_code:string){
    localStorage.setItem(game_code+"game_id",game_code+generateUUID())
    localStorage.setItem(game_code+"populated_count","0")
}

function dismissToast(){
    localStorage.removeItem(localStorage.getItem("game_code")+"in_draftable")
    toast.dismiss("draft-toast")
}

export function generateDraftToast(){
    const game_code = localStorage.getItem("game_code")
    if(game_code==null)
        return
    toast.info("Continue working from draft?",{duration:Infinity,id:"draft-toast",
        cancel : {label:"Yes",key:"yes-button",onClick: () =>{dismissToast}},
        action : {label:"No",key:"no-button",onClick: () =>{prepareGame(game_code!)}}
    })
}
