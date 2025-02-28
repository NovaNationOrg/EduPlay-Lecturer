import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface DropdownComponentProps {
    category: string;
    items: { question: string; answer: string; setQuestion: (value: string) => void; setAnswer: (value: string) => void; }[];
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ category, items }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="dropdown-items">
            <motion.button 
                onClick={() => setIsVisible(!isVisible)} 
                className="dropdown-button" 
                whileTap={{ y: 1 }}
            >
                {category}
                <AnimatePresence initial={true}>
                    <motion.i>
                        <FontAwesomeIcon id="down-arrow" className="down-arrow" icon={isVisible ? faChevronUp:faChevronDown}/>
                    </motion.i>
                </AnimatePresence>
            </motion.button>
            <div className="dropdown-content">
                <AnimatePresence initial={false}>
                    {isVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit=   {{ opacity: 0, scale: 0 }}
                        >
                        <motion.button className='prev-button'>Previous Games</motion.button>
                        <div className="dropdown-list">
                            {items.map((item, index) => (
                                <div key={index} className="input-box">
                                    <label htmlFor={`question-${index}`}> {index + 1} </label>
                                    <div className="input-fields">
                                        <input 
                                            type="text" 
                                            className="input" 
                                            id={`question-${index}`} 
                                            name={`question-${index}`} 
                                            placeholder="Type your Question here" 
                                            value={item.question}
                                            onChange={(e) => item.setQuestion(e.target.value)}
                                        />
                                        <input 
                                            type="text" 
                                            className="input" 
                                            id={`answer-${index}`} 
                                            name={`answer-${index}`} 
                                            placeholder="Type your Answer here" 
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
