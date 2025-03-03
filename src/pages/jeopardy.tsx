import { useState } from 'react'
import Header from "../../components/header.tsx"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "../../components/modal.tsx"
import { Link } from 'react-router-dom';

const jeopardy_grid=[
    "Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", 
];

function setCategory (index:number) {
    sessionStorage.setItem("curr-category", index.toString());
}

function allCategories(){
    for(let i=0;i < 6;i++){
        if(sessionStorage.getItem("isPopulated"+(i+1))== null)
            return false
    }
    return true
}
function Jeopardy () {
    const [modalOpen, setModalOpen] = useState(false);
    const test = allCategories()
   
     

    const open = () => setModalOpen(true);
    const close = () => setModalOpen(false);
    return (
        <>
        <Header headerText="Jeopardy" gameClass="jeopardy" />    
    
        <main>
            <div className="jeopardy-game-container">
                <div className="jeopardy-category-grid">
                    {jeopardy_grid.map((categories, index) => 
                        <div className="jeopardy-category" key={index}>
                            <motion.button
                                whileHover={{ scale: 1.1, transition: {duration: .2} }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => (modalOpen ? close() : open(), setCategory(index+1))}
                                className="jeopardy-categories" id="openModal" key={index}>{categories}
                            </motion.button>
                        </div>
                    )}
                </div>
                <div className="jeopardy-question-grid">
                {[...Array(5)].map((_, row) => (
                     [...Array(6)].map((_, col) => (
                        <div key={row+1+ ":" +col+1} className="jeopardy-question">
                            <motion.button 
                            whileHover={{ scale: 1.1 }}
                            className='jeopardy-questions'
                            >
                                ${row+1}00
                            </motion.button>
                        </div> 
                     ))
                ))}
                </div>
            </div>
            <div>
                <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                >
                    {modalOpen && 
                        <Modal handleClose={close} text="hello"/>
                    }
                </AnimatePresence>
            </div>
            {
                test
                ?<Link className="join-area" to={"/original"}>
                <button className="join-button" 
                   >Begin</button></Link>
                :<div></div>
            }
        </main>
        </>
    )
}


export default Jeopardy