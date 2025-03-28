import { Link } from "react-router-dom";

interface PreviousGameProps{
    game_code:string,
    game_id:string,
    title_date:Date
}

export function PreviousGameCard({game_code,game_id,title_date}:PreviousGameProps){

function setupGame(){
    localStorage.setItem(game_code+"game_id",game_id)
    localStorage.setItem("game_code",game_code)
}

if (game_code == "_jp_"){
    return(
        <div className = "">
            <Link to="/original"><button className={game_code} onClick={setupGame}>Jeopardy On {title_date.toLocaleDateString('en-GB', { 
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long' 
                })}</button>
            </Link>
        </div>
    )
} else{
    return(
        <>
            <h2>There are no Jeopardy Games available</h2>
        </>
    )
}}