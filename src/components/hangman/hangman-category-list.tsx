import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../../database/db"
import { useState } from "react"
import { toast } from "sonner"

interface HMCategoryItemsProps{
    list_id:number
    category:string
    category_number:number
}


export default function HMCategoryItems({list_id,category,category_number}:HMCategoryItemsProps){

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
    } 

    if((questionItems != undefined &&  questionItems.length!=0) && localStorage.getItem(game_code+"isPopulated"+category_number)=="false"){
      const populatedCount = Number(localStorage.getItem("_hm_populated_count"))
      localStorage.setItem(game_code+"populated_count",(populatedCount+1).toString())
    }

    const populated = (questionItems != undefined && questionItems.length!=0)
    console.log(populated)
    localStorage.setItem(game_code+"isPopulated"+category_number,String(populated))
    
    
    function createItem(item_id:number,question:string){
        return(<>
            <input key ={item_id + question} type="text" defaultValue={question} onChange ={(e) => updateNewQuestionValue(e.target.value)}
             onKeyUp={(ev) => {
                if (ev.key === 'Enter') {
                  db.hangmanItems.update(item_id,{question})
                }
              }}
            />
            <a onClick={() => {removeQuestion(item_id)}}>-</a>
        </>
        )
    }

    function addQuestion(){
        db.hangmanItems.add({
          question:newQuestion,
          category_id:list_id,
          category_number:category_number
        })
        toast.success("Question Added",{id:"question-added-toast"})
        updateNewQuestionValue("")
    }

    function removeQuestion(id:number){
      db.hangmanItems.delete(id)
      toast.error("Question Removed",{id:"question-removed-toast"})
    }

  function handleCategoryUpdate() {
    try {
      db.hangmanCategories.update(list_id,{category:categoryString})

    } catch (error) {
      console.log(error)
    }
    toast.success("Category Updated",{id:"category-update-toast"})
  }

    return (
        <div className="category-list">
            <input type="text" placeholder="Category" defaultValue={category} onChange={(e) => updateCategory(e.target.value)}
             onKeyUp={(ev) => {
                if (ev.key === 'Enter') {
                  handleCategoryUpdate()
                }}}/>
            {questionItems}
            <input value={newQuestion} type="text" placeholder="Enter a new question" onChange ={(e) => updateNewQuestionValue(e.target.value)}
            onKeyUp={(ev) => {
                if (ev.key === 'Enter') {
                  addQuestion()
                }
              }}
            />
        </div>
    )
}