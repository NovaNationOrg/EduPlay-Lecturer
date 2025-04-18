import { JSX } from "react";
import { motion } from 'framer-motion';

interface Props{
    children:JSX.Element
}
export default function MotionLI({children}:Props){
    return(
        <motion.li className="hangman-question-item" layout animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}transition={{ type: "tween" }}>
            {children}
        </motion.li>
    )
    
}