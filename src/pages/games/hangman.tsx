import HMCategoryLists from "../../components/hangman/hangman-category-lists";
import "../../styles/hangman/hangman.css"
import Header from "../../components/header";
import { motion } from "framer-motion"



export default function Hangman(){
  
    return( <motion.div
       initial = {{opacity:0}}
        animate  ={{opacity:1}}
        exit={{opacity:0}}
        >
        <Header headerText="Hangman" gameClass="hangman" />

            <HMCategoryLists />
  
        </motion.div>)
}