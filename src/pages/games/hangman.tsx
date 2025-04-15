import HMCategoryLists from "../../components/hangman/hangman-category-lists";
import "../../styles/hangman/hangman.css"
import Header from "../../components/header";



export default function Hangman(){
  
    return(<>
        <Header headerText="Hangman" gameClass="hangman" />

        <HMCategoryLists />
        
    </>)
}