import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../database/db"
import { useState } from "react"
import { toast } from "sonner"
import HMQuestionItem from "./hangman-category-question"
import { AnimatePresence } from 'framer-motion';
import MotionLI from "./hangman-list-item"

interface HMCategoryItemsProps{
    list_id:number
    category:string
    category_number:number
    triggerParent: React.Dispatch<React.SetStateAction<number>>
}


export default function HMCategoryItems({list_id,category,category_number, triggerParent: triggerParent}:HMCategoryItemsProps){

    const [newQuestion,updateNewQuestionValue] = useState("")
    const [categoryString, updateCategory] = useState(category)
    const categoryItems = useLiveQuery(
      () => db.hangmanItems.where("[category_id+category_number]")
      .equals([list_id,category_number]).toArray())
    const game_code = localStorage.getItem("game_code")!
    let categoryIdList:number[] = []

    categoryItems&& categoryItems!.forEach(category => {
            categoryIdList.push(category.id)
    })

    const questionItems = categoryItems?.map(item =>(
        createItem(item.id, item.question)
    ))

    
    if((questionItems == undefined || questionItems.length==0) && localStorage.getItem(game_code+"isPopulated"+category_number)=="true"){
      const populatedCount = Number(localStorage.getItem("_hm_populated_count"))
      localStorage.setItem(game_code+"populated_count",(populatedCount-1).toString())
      localStorage.setItem(game_code+"isPopulated"+category_number,"false")
      triggerParent(category_number)

    } 

    if((questionItems != undefined &&  questionItems.length!=0) && localStorage.getItem(game_code+"isPopulated"+category_number)=="false"){
      const populatedCount = Number(localStorage.getItem("_hm_populated_count"))
      localStorage.setItem(game_code+"populated_count",(populatedCount+1).toString())
      localStorage.setItem(game_code+"isPopulated"+category_number,"true")
      triggerParent(category_number)

    }

    const populated = (questionItems != undefined && questionItems.length!=0)
    
    function createItem(item_id:number,question:string){
        return(
          <HMQuestionItem key ={item_id + question} item_id={item_id} question={question} />
        )
    }

    function addQuestion(){
      if(newQuestion==""){
        toast.info("Please enter a question",{id:"question-info-toast"})
        return
      }
        db.hangmanItems.add({
          question:newQuestion,
          category_id:list_id,
          category_number:category_number
        })
        toast.success("Question Added",{id:"question-added-toast"})
        updateNewQuestionValue("")
    }


  function handleCategoryUpdate() {
    try {
      db.hangmanCategories.update(list_id,{category:categoryString})

    } catch (error) { 
      console.log(error)
    }
    toast.success("Category Updated",{id:"category-update-toast"})
  }

  function removeCategory(category_id:number){
      db.hangmanCategories.delete(category_id)
      const numCategories = categoryItems?categoryItems.length:0
      for(let i=0;i <numCategories ;i++){
        db.hangmanItems.delete(categoryItems![i].id)
      }
      localStorage.removeItem(game_code+"isPopulated"+category_number)
      toast.error("Category Deleted")
  } 
  if(category_number <= Number(localStorage.getItem(game_code+"num_categories")))
    localStorage.setItem(game_code+"isPopulated"+category_number,String(populated))


    return (
        <div className="category-list">
            <ul className = 'hangman-questions-list'>
            <AnimatePresence mode="popLayout">
              <MotionLI key ={`hangman-question-category`+list_id} >
                <div className="hangman-item">
                  <input type="text" placeholder="Category" defaultValue={category} onChange={(e) => updateCategory(e.target.value)}
                    onKeyUp={(ev) => {
                    if (ev.key === 'Enter') 
                      handleCategoryUpdate() 
                    }}/>
                    { category_number == Number(localStorage.getItem(game_code+"num_categories")) &&
                      <a onClick={() => {removeCategory(list_id)}}> - </a>
                    }
                </div>
              </MotionLI>
            
              { 
                categoryItems?.map(item =>(
                   <MotionLI key ={item.id.toString()} >
                  {createItem(item.id, item.question)}
                  </MotionLI>))
              }
              <MotionLI key ={`hangman-new-question`+list_id} >
                <input value={newQuestion} type="text" placeholder="Enter a new question" onChange ={(e) => updateNewQuestionValue(e.target.value)}
                onKeyUp={(ev) => {
                    if (ev.key === 'Enter')  
                      addQuestion()
                    }}/>
              </MotionLI>
            </AnimatePresence>
             </ul>
        </div>
    )
}