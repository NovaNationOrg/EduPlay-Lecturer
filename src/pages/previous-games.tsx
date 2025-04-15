import { PreviousGamesList } from '../components/prev-games-list';
import { motion } from "framer-motion"

export type Jeopardy = {
    id: string;
    category: string;
    question: string;
    answer: string;
};

export default function Prev_Games() {
    return (
        <motion.div
        initial = {{opacity:0}}
        animate  ={{opacity:1}}
        exit={{opacity:0}}
        >
            <PreviousGamesList />
        </motion.div>
    )
}