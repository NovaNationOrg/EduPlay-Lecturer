
import { useState, useEffect } from 'react'
import QRCode from "react-qr-code"
function Original() {
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
      <h1>{question}</h1>

      <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={question}
        viewBox={`0 0 256 256`}
      />

</div>
    </>
  )
}

export default Original

