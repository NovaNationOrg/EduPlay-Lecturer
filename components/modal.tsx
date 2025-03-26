import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Backdrop from "./backdrop";
import DropdownComponent from './dropdown';
import { db } from "../src/database/db";
import {Toaster,toast} from 'sonner'
import { useLiveQuery } from "dexie-react-hooks"
import { JeopardyGame } from "../src/database/interfaces/jeopardy";

/* Interfaces for use */

interface ModalProps {
  handleClose: () => void;
  text: string;
}

interface FormEvent extends React.FormEvent<HTMLFormElement> { }

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

  const [category, updateCategory] = useState("")
  let questionAnswerData: JeopardyGame[] | undefined
  if (localStorage.getItem("jp_isPopulated") == "true") {
    try {
   
      questionAnswerData = useLiveQuery(() => db.jeopardyData.where("[game_id+theme]").equals([localStorage.getItem("jp_game_id")!, sessionStorage.getItem("curr-category")!]).toArray())
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


  const [items, setItems] = useState(
    [...Array(5)].map((_value) => (
      { question: "", answer: "", setQuestion: () => { }, setAnswer: () => { } }
    ))
  );

  async function addData(e: FormEvent) {
    e.preventDefault();
    const curr_category = Number(sessionStorage.getItem("curr-category"));
    try {
        const categoryToSave = category || `Category ${sessionStorage.getItem("curr-category")}`;

      for (const item of items) {
        const { question, answer } = item;
        if (question == "" || answer == "") {
          toast.warning("Please complete all of the fields!!", {id: "quest-id"})
          return
        }
      }

      db.jeopardyData.where("[game_id+category_num]").equals([localStorage.getItem("jp_game_id")!, curr_category]).delete() //#TODO: Make this depend on dynamic values
      localStorage.setItem("jp_isPopulated" + sessionStorage.getItem("curr-category"), "true")
      for (let i = 0; i < items.length; i++) {
        toast.success("Data has been saved", {id: "saved-data-toast"})
        const { question, answer } = items[i];
        await db.jeopardyData.add({
          question,
          answer,
          game_id: localStorage.getItem("jp_game_id")!, 
          theme: categoryToSave!, 
          points: (i + 1) * 100, 
          category_num: Number(sessionStorage.getItem("curr-category"))
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const categoryUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateCategory(event.target.value);
  };

  const setCategory = () => {
    if (category == "") {
      updateCategory(`Category ${sessionStorage.getItem("curr-category")}`)
    } else { /* empty */ }
  }

  useEffect(() => {
  const fetchCategoryName = async () => {
    try {
      const gameId = localStorage.getItem("jp_game_id");
      const categoryNum = sessionStorage.getItem("curr-category");
      
      if (gameId && categoryNum) {
        const data = await db.jeopardyData
          .where("[game_id+category_num]")
          .equals([gameId, Number(categoryNum)])
          .first();
          
        if (data && data.theme) {
          updateCategory(data.theme);
        }
      }
    } catch (error) {
      console.error("Error fetching category name:", error);
    }
  };
  
  fetchCategoryName();
}, []);

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
        <Toaster richColors position="top-right" />
        <div className="jeopardy-modal-container">
          <form className="jeopardy-dropdown-form" onSubmit={addData} >
            <button className="jeopardy-close-button" onClick={handleClose}> X </button>
            <div className="jeopardy-modal-content">
            <input 
              value={category} 
              onChange={categoryUpdate} 
              className="jeopardy-modal-title" 
              type="text" 
              placeholder={(`Category ${sessionStorage.getItem("curr-category")}`)}
            ></input>
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
                <motion.button onClick={setCategory} whileTap={{ y: 1 }} className="jeopardy-save-button" type="submit">Save</motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;