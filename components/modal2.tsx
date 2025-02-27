import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Backdrop from "./backdrop";
import Rotate from "../src/pages/motion";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

  

// const rotate = {
//     up: {
//         animate={{ rotate: 360 }}
//         transition={{ duration: .2 }}
//     }
// }
  

interface ModalProps {
  handleClose: () => void;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ handleClose }) => {
    const [isVisible, setIsVisible] = useState(true)

    return (
      <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}  
                className="modal orange-gradient"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >   
                <div className="modal-container">
                    <button className="close-button" onClick={handleClose}> X </button>
                    <div className="modal-content">
                        <div className="modal-title">Categories</div>
                        <div className="dropdown-menus">
                            {/* <form className="dropdown-form" action="#" method="POST"> */}
                                <div className="dropdown-items">
                                    <motion.button onClick={() => setIsVisible(!isVisible)} className="dropdown-button" whileTap={{ y:1 }}>
                                        Category 1
                                        <AnimatePresence initial={true}>
                                            <motion.i>
                                                <FontAwesomeIcon id="down-arrow" className="down-arrow" icon={isVisible ? faChevronDown:faChevronUp}/>
                                            </motion.i>
                                        </AnimatePresence>
                                    </motion.button>
                                    <div className="dropdown-content">
                                        <AnimatePresence initial={true}>
                                            {!isVisible && (

                                                <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit=   {{ opacity: 0, scale: 0 }}
                                                >
                                                    <button>Previous Games</button>
                                                    <div className="dropdown-list">
                                                        {[...Array(5)].map((_, num) => (
                                                            <div className="input-box">
                                                                    <>
                                                                        <label htmlFor="name"> {num+1} </label>
                                                                        <div className="input-fields">
                                                                            <input type="text" className="input" id="question" name="question" placeholder="Type your Question here"/>
                                                                            <input type="text" className="input" id="answer" name="question" placeholder="Type your Answer here" />
                                                                        </div>
                                                                    </>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            ) }
                                        
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <Link to={"#"} className="save-link"><motion.button className="save-button" type="submit">Save</motion.button></Link>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
          </motion.div>
      </Backdrop>
    );
  };

  
  export default Modal;