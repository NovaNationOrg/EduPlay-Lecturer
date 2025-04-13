import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../database/db"
import HMCategoryItems from "./hangman-category-list"
import { useEffect, useState } from "react"
import { generateDraftToast } from "../draft-handler"
import { toast } from "sonner"
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom"
import MotionLI from "./hangman-list-item"

export function gameReady(category_count:number){
    const game_code = localStorage.getItem("game_code")
    for(let i=1;i <= category_count ; i++){
        if(localStorage.getItem(game_code+"isPopulated"+i) == "false"|| localStorage.getItem(game_code+"isPopulated"+i) == null){
            return false
        }
    }
    return true
}

export default function HMCategoryLists(){
    
    const game_id = localStorage.getItem("_hm_game_id")
    const [newCategory,updateNewCategoryValue] = useState("")
    const [readyTrigger,enactReadyTrigger] = useState(0.1)

    const categoryLists = useLiveQuery(
        () => db.hangmanCategories.where({
            game_id:game_id
        }).toArray())   

    let categoryCount = categoryLists ? categoryLists.length : 0

    const [numCategories,updateNumCategories] = useState(categoryCount)

    function buttonRefresh(){
        try {
            enactReadyTrigger(readyTrigger + 0.001)
            sessionStorage.removeItem("do-trigger")
        } catch (error) {
            console.log(error)
        }
    }
   
 
    
    categoryCount = categoryCount?categoryCount:0
    localStorage.setItem("_hm_num_categories",categoryCount.toString())
    
    useEffect(()=>{
        if(localStorage.getItem("_hm_in_draftable") != null)
            generateDraftToast()
    },[])

    function addCategory(){
        if(newCategory == ""){
            toast.info("Please enter a category",{id:"category-info-toast"})
            return
        }
        db.hangmanCategories.add({
            category:newCategory,
            game_id:game_id!,
            category_number:categoryCount?categoryCount+1:1
        })
        toast.success("Category Added",{id:"category-added-toast"})
        sessionStorage.setItem("do-trigger","true")
        updateNewCategoryValue("")
        updateNumCategories(numCategories+1)
    }

    const navigate = useNavigate();
    
    function handleTransition() {
       localStorage.setItem("first_load", "true")
       navigate("/qr-page")
   }

   useEffect(()=>{
    buttonRefresh()
   },[numCategories])

    

    function renderNeeded() {
        if(sessionStorage.getItem("do-trigger")!=null){
            sessionStorage.removeItem("do-trigger")
            buttonRefresh()
            return true
        }
    return false
    }

    return (
        <div>
        <div className="hangman-list-area">
            <div className="category-list-container">
                <AnimatePresence 
                mode="popLayout"
                >
                {
                categoryLists?.map( list =>(
                    <HMCategoryItems key={list.id + ":" + list.category_number} list_id={list.id} category_number = {list.category_number} category={list.category} triggerParent ={buttonRefresh}/>
                ))
                }
                </AnimatePresence>
                <MotionLI>
                <div>
                    <input value = {newCategory} onChange ={(e) => updateNewCategoryValue(e.target.value)} type="text" placeholder="Add new Category" 
                    onKeyUp={(ev) => {
                        if (ev.key === 'Enter') {
                        addCategory()
                        }
                    }}
                    />
                    <a onClick={addCategory}>+</a>
                </div>
                </MotionLI>
                
            </div>
            </div>

            {
                gameReady(numCategories) == true && numCategories!=0 && renderNeeded() == false && ( //Fix conditional rednering to actually work here
                    <button className="hangman-ready-button" onClick={()=>{handleTransition()}}>Generate Code</button>
                )   
            }

        </div>

        
        )
}