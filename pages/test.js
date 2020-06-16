import { useState, useEffect } from 'react'
const Test = () => {
  const [s,setS] = useState("---\nhey: \"you\"\n---")
  
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID)
  })
  return (
    <input value={s} onChange={setS} />
  )
}

export default Test