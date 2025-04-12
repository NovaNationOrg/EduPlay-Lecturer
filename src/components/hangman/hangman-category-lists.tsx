import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../database/db"
import HMCategoryItems from "./hangman-category-list"
import { useEffect, useMemo, useState } from "react"
import { generateDraftToast } from "../draft-handler"
import { toast } from "sonner"
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom"
import MotionLI from "./hangman-list-item"

export function gameReady(category_count:number){
    const game_code = localStorage.getItem("game_code")
    for(let i=1;i <= category_count ; i++){
        if(localStorage.getItem(game_code+"isPopulated"+i) == "false"){
            return false
        }
    }
    return true
}

export default function HMCategoryLists(){
    
    const game_id = localStorage.getItem("_hm_game_id")
    const [newCategory,updateNewCategoryValue] = useState("")

    const categoryLists = useLiveQuery(
        () => db.hangmanCategories.where({
            game_id:game_id
        }).toArray())   

    let categoryCount = categoryLists ? categoryLists.length : 0

   
 
    
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
        updateNewCategoryValue("")
    }

    const navigate = useNavigate();
    
    function handleTransition() {
       localStorage.setItem("first_load", "true")
       navigate("/qr-page")
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
                    <HMCategoryItems key={list.id + ":" + list.category_number} list_id={list.id} category_number = {list.category_number} category={list.category}/>
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
                gameReady(categoryCount) == true && ( //Fix conditional rednering to actually work here
                    <button className="hangman-ready-button" onClick={()=>{handleTransition()}}>Generate Code</button>
                )   
            }

        </div>

        
        )
}