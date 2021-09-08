import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Login.module.css'

export default function LoginPage() {
  return (
    <>
    <div className="login-container">
      <h3 id="login-header">Admin login:</h3>
      <hr id="login-form-divider"></hr>
      <div className='form-container'>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="name" required></input>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required></input>
        <button id="login-button">Log in</button>
      </div>
    </div>
    
    <style global jsx>{`
      body{
        background: black;
      }
    `}</style>
    
    </>
  )
}
