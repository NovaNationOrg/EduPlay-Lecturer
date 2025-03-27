import { Link } from "react-router-dom";

interface PreviousGameProps{
    cardClass:string,
    game_id:string,
    title_date:Date
}

export function PreviousGameCard({cardClass,game_id,title_date}:PreviousGameProps){

function setupGame(){
    sessionStorage.clear()
    sessionStorage.setItem("game_id",game_id)
    sessionStorage.setItem("game_date",title_date.toString())
    sessionStorage.setItem("game_code",cardClass)
}

const card_date = new Date(title_date)
const month = card_date.toLocaleString('default', { month: 'long' });
const date = card_date.getDate()
const year = card_date.getFullYear()

if (cardClass == "_jp_"){
    return(
        <div className = "">
            <Link to="/original"><button className={cardClass} onClick={setupGame}>Jeopardy On {month} {date} {year}</button></Link>
        </div>
    )
} else{
    return(
        <>
            <h2>There are no Games available</h2>
        </>
    )
}
}