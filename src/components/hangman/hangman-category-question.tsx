import { toast } from "sonner"
import { db } from "../../database/db"
import { useState } from "react"

interface QuestionProps{
    item_id:number
    question:string
}
export default function HMQuestionItem({item_id,question}:QuestionProps){

    const [questionValue,updateQuestionValue] = useState(question)
   
    function removeQuestion(id:number){
      db.hangmanItems.delete(id)
      toast.error("Question Removed",{id:"question-removed-toast"})
    }


    return(<>
        <input type="text" defaultValue={questionValue} onChange ={(e) => updateQuestionValue(e.target.value)}
         onKeyUp={(ev) => {
            if (ev.key === 'Enter') {
                toast.success("Question Updated",{id:"question--toast"})
                db.hangmanItems.update(item_id,{question:questionValue})
            }
          }}
        />
        <a onClick={() => {removeQuestion(item_id)}}>-</a>
    </>
    )
}