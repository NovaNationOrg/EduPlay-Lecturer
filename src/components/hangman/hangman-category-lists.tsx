import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../database/db"
import HMCategoryItems from "./hangman-category-list"
import { useEffect, useState } from "react"
import { generateDraftToast } from "../draft-handler"
import { toast } from "sonner"


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
        db.hangmanCategories.add({
            category:newCategory,
            game_id:game_id!,
            category_number:categoryCount?categoryCount+1:1
        })
        toast.success("Category Added",{id:"category-added-toast"})
        updateNewCategoryValue("")
    }

    return (
        <div className="category-list-container">
            {
            categoryLists?.map( list =>(
                <HMCategoryItems key={list.id + ":" + list.category_number} list_id={list.id} category_number = {list.category_number} category={list.category}/>
            ))
            }
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
        </div>
        )
}