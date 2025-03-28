import React from 'react';
import Backdrop from "./backdrop";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const ReviewModal: React.FC<ModalProps> = ({ isOpen, handleClose, children }) => {
    if (!isOpen) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    function handleTransition() {
        localStorage.setItem("first_load", "true")
        navigate("/original")
    }

    return (
        <Backdrop onClick={handleClose}>
            <div className="jeopardy-review-modal" onClick={(e) => e.stopPropagation()}>
                {children}
                <motion.button
                    onClick={() => handleTransition()}
                    whileTap={{ y: 1 }}
                    className="jeopardy-start-button"
                    type="submit"
                >
                    start game
                </motion.button>
                <button className="review-close-button" onClick={handleClose}> X </button>
            </div>
        </Backdrop>
    );
};

export default ReviewModal

