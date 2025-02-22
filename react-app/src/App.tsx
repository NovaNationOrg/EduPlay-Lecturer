import ReactDOM from "react-dom/client";

import { useState, useEffect } from 'react'
import './App.css'
import QRCode from "react-qr-code"
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom"
import Clone from "./pages/clone"
import Original from "./pages/original";
import Layout from "./pages/layout";
function App() {
  const [question,setQuestion] = useState('abc')

  useEffect(() => {
    fetchQuestions()
  },[])
  
  const fetchQuestions = async () => {
    const resposne = await fetch("http://127.0.0.1:5000/questions")
    const data = await resposne.json()
    setQuestion(data.questions)
    console.log(data.questions)

  }
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Layout />}>
        
          <Route path ="Original" element = {<Original/>} />
          <Route path="Clone" element={<Clone />} />

        </Route>
      </Routes>
      </BrowserRouter>

      
    </>
  )
}

export default App

