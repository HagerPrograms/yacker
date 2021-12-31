import { useState } from "react";
import cookie from "js-cookie";

function LoginForm(props){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('')

  function onEmailChange(event) {
    if(error){
      errorClear()
    }
    setEmail(() => {return event.target.value})
  }

  function onPasswordChange(event){
    if(error){
      errorClear()
    }
    setPassword(() => {return event.target.value})
  }

  function errorClear(){
    setError('');
  }

  function successClear(){
    setSuccess('');
  }

  function successHandler(){
    setSuccess(() => {
      return <>
        <div className="success-message">
          Login successful!
        </div>
      </>
    })
  }

  function errorHandler(msg){
    setError(() => {
    return <>
    <div className="error-message">
      {msg}
    </div>
    </>})
  }

  async function login(e, credentials){
    const data = await LoginHandler(e, credentials)
    
    console.log(data);
    
    if(data.error){
      errorHandler(data.error)
      successClear()
    } else {
    errorClear();
    successHandler();
    }
  }
  
  return (
      <>
      <div className="login-container">
        <h3 id="login-header">Admin login:</h3>
        <hr id="login-form-divider"></hr>
        <div className='form-container'>
          <form method="POST" className="login-form" onSubmit={e => login(e, {email, password})}>
              <label htmlFor="email">Email:</label>
              <input value={email} onChange={onEmailChange} type="email" id="email" name="name" required></input>
              <label htmlFor="password">Password:</label>
              <input value={password} onChange={onPasswordChange} type="password" id="password" name="password" required></input>
              <input type="submit" value="Login" id="login-button"></input>
          </form>
          {error}
          {success}
        </div>
      </div>
      </>
  )
}

async function LoginHandler(event, authData){
  
  event.preventDefault();
  
  const graphqlQuery = {
    query: `
    { 
      login(email: "${authData.email}", password:"${authData.password}"){
        token
        email
      }
    }
    `
  };


  const payload = await fetch('http://yacker.co:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphqlQuery)
  })

  const resData = await payload.json();

  if(resData.data){
    cookie.set("logintoken", resData.data.login.token)
    return resData.data.login
  }
  
  console.log("RESDATA:", resData.errors[0])

  return {
    error: resData.errors[0].message
  }
  

}


export default LoginForm;