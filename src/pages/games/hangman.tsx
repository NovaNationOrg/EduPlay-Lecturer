import { Toaster } from "sonner";
import HMCategoryLists from "../../components/hangman/hangman-category-lists";
import { useNavigate } from "react-router-dom";

export default function Hangman(){
    const navigate = useNavigate();
    
    return(<>
        <Toaster richColors position="top-right"/>
        <HMCategoryLists />
        <button onClick={()=>{navigate("/qr-page")}}>Generate Code</button>
      
    </>)
}