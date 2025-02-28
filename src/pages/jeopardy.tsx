import { useState } from 'react'
import Header from "../../components/header.tsx"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "../../components/modal.tsx"

const jeopardy_grid=[
    "Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", 
];

function setCategory (index:number) {
    sessionStorage.setItem("curr-category", index.toString());
}

function Jeopardy () {
    const [modalOpen, setModalOpen] = useState(false);

    const open = () => setModalOpen(true);
    const close = () => setModalOpen(false);
    return (
        <>
        <header>
            <Header headerText="Jeopardy" gameClass="jeopardy" />    
        </header>
        <main>
            <div className="game-container">
                <div className="category-grid">
                    {jeopardy_grid.map((categories, index) => 
                        <div className="category" key={index}>
                            <motion.button
                                whileHover={{ scale: 1.1, transition: {duration: .2} }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => (modalOpen ? close() : open(), setCategory(index+1))}
                                className="categories" id="openModal" key={index}>{categories}
                            </motion.button>
                        </div>
                    )}
                </div>
                <div className="question-grid">
                {[...Array(5)].map((_, row) => (
                     [...Array(6)].map((_, col) => (
                        <div key={row+1+ ":" +col+1} className="question">
                            <motion.button 
                            whileHover={{ scale: 1.1 }}
                            className='questions'
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
        </main>
        </>
    )
}


export default Jeopardy