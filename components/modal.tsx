import React, { useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "./backdrop";
import DropdownComponent from './dropdown';
import { db } from "../src/database/db";
import { ToastContainer, toast } from 'react-toastify';
import { useLiveQuery } from "dexie-react-hooks"
import { JeopardyGame } from "../src/database/interfaces/jeopardy";

/* Interfaces for use */

interface ModalProps {
  handleClose: () => void;
  text: string;
}

interface questionAnswer{
  question:string,
  answer:string
}
const errorToast = (toastMessage:string,toastIO:string) =>{
  toast(toastMessage ,{
    toastId: toastIO
  })

}

interface FormEvent extends React.FormEvent<HTMLFormElement> {}

const dropIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
    },
  };

const Modal: React.FC<ModalProps> = ({ handleClose }) => {
  // const questionAnswerData = db.jeopardyData.where("theme").equals(currTheme!).toArray()

  const [category, updateCategory] = useState("")
  let questionAnswerData: JeopardyGame[] | undefined
  if(sessionStorage.getItem("isPopulated")=="true"){
    try {
      questionAnswerData = useLiveQuery( () => db.jeopardyData.where("[game_id+theme]").equals(["jp1","default"]).toArray())
      console.log(questionAnswerData)
    } catch (error) {
      console.log(error)
    }

  }

  const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
};
  

  let questionAnswer:questionAnswer[] = []
  console.log(questionAnswerData == undefined)
  if(questionAnswerData != undefined){
    if(questionAnswerData.length > 0){
      for(let i=0;i<5;i++){
        questionAnswer.push({question: questionAnswerData[i].question,answer:questionAnswerData[i].answer})
      }
   }
  }else{
    
    // for(let x=0;x<5;x++){
    //   questionAnswer.push({question:"",answer:''})

    // }
  }

  let [items, setItems] = useState( //#FIX find less inneficient solution
    [...Array(5)].map((_value,index) => (
      { question: "" , answer: "", setQuestion: () => {}, setAnswer: () => {} }
      
    ))
  );
  

async function addData(e:FormEvent) {
  e.preventDefault();
  const curr_category = Number (sessionStorage.getItem("curr-category"));
  try {

    if(category==""){
      errorToast(`Category not set... setting as Category ${sessionStorage.getItem("curr-category")}`,"cat-id")
    }
      
    for (const item of items) {
      const { question, answer } = item;
      if(question == "" || answer == ""){
        errorToast("Please complete all of the fields!!","quest-id")
        return
      }
    }

  db.jeopardyData.where("[game_id+category_num]").equals(["jp1", curr_category]).delete() //#TODO: Make this depend on dynamic values
    sessionStorage.setItem("isPopulated"+sessionStorage.getItem("curr-category"),"true")
    for (let i =0;i< items.length;i++) { 
      const { question, answer } = items[i];
      const id = await db.jeopardyData.add({
        question,
        answer,
        game_id: "jp1", // replace with appropriate value
        theme: category!, // replace with appropriate value
        points: (i+1) * 100, // replace with appropriate value
        category_num: Number (sessionStorage.getItem("curr-category"))
      });
    }
  } catch (error) {
    console.error(error);
  }
}



const categoryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCategory(event.target.value);
};

const setCategory = (event: React.MouseEvent) => {
  if (category == "") {
    updateCategory(`Category ${sessionStorage.getItem("curr-category")}`)
  } else {

  }
}

const onSubmit = (e:FormEvent) => {
  e.preventDefault();


  const formData = new FormData(e.target as HTMLFormElement)
  const payload = Object.fromEntries(formData)
  
  console.log(payload)
}

    return (
      <Backdrop onClick={handleClose}>
            <motion.div
              onClick={(e) => e.stopPropagation()}  
              className="jeopardy-modal"
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >   
            <ToastContainer/> 
                <div className="jeopardy-modal-container">              
                  <form className="jeopardy-dropdown-form" onSubmit={addData} >
                    <button className="jeopardy-close-button" onClick={handleClose}> X </button>
                    <div className="jeopardy-modal-content">
                        <input onChange = {categoryUpdate} className = "jeopardy-modal-title" type="text" placeholder={(`Category ${sessionStorage.getItem("curr-category")}`)}></input>
                        <div className="jeopardy-dropdown-menus">
                            <div className="jeopardy-dropdown-items">
                              <DropdownComponent 
                                category={`Category ${sessionStorage.getItem("curr-category")}`}
                                items={items.map((item, index) => ({
                                    ...item, 
                                    setQuestion: (value) => updateItem(index, 'question', value),
                                    setAnswer: (value) => updateItem(index, 'answer', value)
                                }))} 
                              /> 
                            </div>
                            <motion.button onClick={setCategory} whileTap = {{ y: 1}} className="jeopardy-save-button" type="submit">Save</motion.button>
                        </div>
                    </div>
                  </form>
                </div>
          </motion.div>
      </Backdrop>
    );
  };

  
  export default Modal;