import { Link } from "react-router-dom";
import { GameList } from "./../components/gamelist";

interface PreviousGameProps{
    game_code:string,
    game_id:string,
    title_date:Date
}

const dateFormat: Intl.DateTimeFormatOptions = { 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'  
};
        
export function PreviousGameCard({game_code,game_id,title_date}:PreviousGameProps){

    function setupGame(){
        localStorage.setItem(game_code+"game_id",game_id)
        localStorage.setItem("game_code",game_code)
    }

    const formattedDate = new Date(title_date).toLocaleDateString('en-US', dateFormat);
    const gameType = game_code as keyof typeof GameList;

    return(
        <>
            <Link to="/original"><button className = {`${game_code}-prev-card`} onClick={setupGame}>{GameList[gameType]} On { formattedDate }</button></Link>
        </>
    )
}