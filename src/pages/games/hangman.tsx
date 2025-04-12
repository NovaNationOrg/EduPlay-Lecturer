import { Toaster } from "sonner";
import HMCategoryLists from "../../components/hangman/hangman-category-lists";
import { useNavigate } from "react-router-dom";
import "../../styles/hangman/hangman.css"



export default function Hangman(){
  
   
    console.log(HMCategoryLists.length)
    return(<>
        <Toaster richColors position="top-right"/>
        <HMCategoryLists />
        
      
    </>)
}