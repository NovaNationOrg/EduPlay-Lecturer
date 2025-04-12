import { Toaster } from "sonner";
import HMCategoryLists from "../../components/hangman/hangman-category-lists";
import "../../styles/hangman/hangman.css"



export default function Hangman(){
  
    return(<>
        <Toaster richColors position="top-right"/>
        <HMCategoryLists />
        
    </>)
}