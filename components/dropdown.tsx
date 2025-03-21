import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { db } from "../src/database/db";
// import { JeopardyGame } from "../src/database/interfaces/jeopardy";

interface DropdownComponentProps {
    category: string;
    items: { question: string; answer: string; setQuestion: (value: string) => void; setAnswer: (value: string) => void }[];
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ category, items }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loadedItems, setLoadedItems] = useState<{ question: string; answer: string }[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameId = sessionStorage.getItem("game_id");
                const categoryNum = sessionStorage.getItem("curr-category");
                
                if (gameId && categoryNum) {
                    const data = await db.jeopardyData
                        .where("[game_id+category_num]")
                        .equals([gameId, Number(categoryNum)])
                        .toArray();
                    
                    if (data && data.length > 0) {
                        data.sort((a, b) => a.points - b.points);
                        
                        const formattedData = data.map(item => ({
                            question: item.question,
                            answer: item.answer
                        }));
                        
                        setLoadedItems(formattedData);
                        
                        formattedData.forEach((item, index) => {
                            if (index < items.length) {
                                items[index].setQuestion(item.question);
                                items[index].setAnswer(item.answer);
                            }
                        });
                        
                        setIsLoaded(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    }, [category]);
    
    useEffect(() => {
        if (isVisible && isLoaded && loadedItems.length > 0) {
            loadedItems.forEach((item, index) => {
                if (index < items.length) {
                    items[index].setQuestion(item.question);
                    items[index].setAnswer(item.answer);
                }
            });
        }
    }, [isVisible, isLoaded]);
    
    return (
        <div className="jeopardy-dropdown-items">
            <motion.button 
                onClick={() => setIsVisible(!isVisible)} 
                className="jeopardy-dropdown-button" 
                whileTap={{ y: 1 }}
            >
                {category}
                <AnimatePresence initial={true}>
                    <motion.i>
                        <FontAwesomeIcon id="down-arrow" className="jeopardy-down-arrow" icon={isVisible ? faChevronUp : faChevronDown}/>
                    </motion.i>
                </AnimatePresence>
            </motion.button>
            
            <div className="jeopardy-dropdown-content">
                <AnimatePresence initial={false}>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                        >
                        <motion.button className='jeopardy-prev-button'>Previous Games</motion.button>
                        <div className="jeopardy-dropdown-list">
                            {items.map((item, index) => (
                                <div key={index} className="jeopardy-input-box">
                                    <label htmlFor={`question-${index}`}> {index + 1} </label>
                                    <div className="jeopardy-input-fields">
                                        
                                        <input 
                                            type="text" 
                                            className="jeopardy-input" 
                                            id={`question-${index}`} 
                                            name={`question-${index}`} 
                                            placeholder={"Type your question here"} 
                                            value={item.question}
                                            onChange={(e) => item.setQuestion(e.target.value)}
                                        />

                                        <input 
                                            type="text" 
                                            className="jeopardy-input" 
                                            id={`answer-${index}`} 
                                            name={`answer-${index}`} 
                                            placeholder={"Type your answer here"} 
                                            value={item.answer}
                                            onChange={(e) => item.setAnswer(e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DropdownComponent;