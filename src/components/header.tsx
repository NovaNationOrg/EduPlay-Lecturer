import "../styles/jeopardy/jeopardy.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
    headerText: string;
    gameClass: string;
};

function Header ({headerText, gameClass }: HeaderProps) {
    return (
        <div className={`${gameClass}-header`}>
            <div className="left">
                <Link to = "/"><FontAwesomeIcon className="left-arrow" icon={faArrowLeft} /></Link>
            </div>
            <div className="header-title">
                <div className={gameClass}> {headerText} </div>
            </div>  
        </div>
        
    );
};

export default Header;