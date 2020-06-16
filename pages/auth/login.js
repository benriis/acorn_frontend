import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'


const Login = () => {
  const [input, setInput] = useState({
    "email": "",
    "password": ""
  })

  const handleOnChange = e => {
    e.persist()
    setInput(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const submit = async e => {
    e.preventDefault()
    await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/api/users/sign_in`,
      data: input,
      withCredentials: true,
    }).then(res => {
      console.log(res)
      Router.push(`/page`)
    }).catch(err => {
      console.log(err)
    })
    
  }

  return (
    <form>
      <label htmlFor="email">email</label>
      <input id="email" value={input.email} type="text" onChange={handleOnChange} placeholder="Enter email..." name="username"></input>

      <label htmlFor="password">Password</label>
      <input id="password" value={input.password} type="password" onChange={handleOnChange} placeholder="Enter password..." name="password"></input>
      <button onClick={submit}>login</button>
      <p>{input.email}</p>
      <p>{input.password}</p>
    </form>
  )  
}

export default Login;