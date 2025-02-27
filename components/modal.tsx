import React, { useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "./backdrop";
import DropdownComponent from './dropdown';
import { Link } from "react-router-dom";

/* Interfaces for use */

interface ModalProps {
  handleClose: () => void;
  text: string;
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
  const [items, setItems] = useState(
    [...Array(5)].map(() => (
      { question: '', answer: '', setQuestion: () => {}, setAnswer: () => {} }
    ))
);

const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
};

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
                className="modal "
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >   
                <div className="modal-container">                            
                  <form className="dropdown-form" onSubmit={onSubmit} >
                    <button className="close-button" onClick={handleClose}> X </button>
                    <div className="modal-content">
                        <div className="modal-title">Categories</div>
                        <div className="dropdown-menus">
                                <div className="dropdown-items">
                                  {/* {[...Array(6)].map((_, num) => ( */}
                                    <DropdownComponent 
                                      // category={`Category ${num+1}`}
                                      category="Category 1"
                                      items={items.map((item, index) => ({
                                          ...item, 
                                          setQuestion: (value) => updateItem(index, 'question', value),
                                          setAnswer: (value) => updateItem(index, 'answer', value)
                                      }))} 
                                    /> 
                                  {/* ))} */}
                                </div>
                                <motion.button className="save-button" type="submit">Save</motion.button>
                        </div>
                    </div>
                  </form>
                </div>
          </motion.div>
      </Backdrop>
    );
  };

  
  export default Modal;