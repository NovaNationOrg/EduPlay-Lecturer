import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { PreviousGamesList } from './../../components/prev-games-list';

export type Jeopardy = {
    id: string;
    category: string;
    question: string;
    answer: string;
};

export default function Prev_Games() {
    
    return (
        <>
            <div className="jeopardy-header">
                <div className="left">
                    <Link to = "/jeopardy"><FontAwesomeIcon className="left-arrow" icon={faArrowLeft} /></Link>
                </div>
                <div className="header-title">
                    <div className="jeopardy"> Jeopardy </div>
                </div>  
            </div>
            <PreviousGamesList />
        </>
    )
}
