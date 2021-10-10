import { useState } from "react";
import cookie from "js-cookie";

function LoginForm(props){
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onEmailChange(event) {
    setEmail(() => {return event.target.value})
  }

  function onPasswordChange(event){
    setPassword(() => {return event.target.value})
  }
  
  return (
      <>
      <div className="login-container">
        <h3 id="login-header">Admin login:</h3>
        <hr id="login-form-divider"></hr>
        <div className='form-container'>
          <form method="POST" className="login-form" onSubmit={e => LoginHandler(e, {email, password})}>
              <label htmlFor="email">Email:</label>
              <input value={email} onChange={onEmailChange} type="email" id="email" name="name" required></input>
              <label htmlFor="password">Password:</label>
              <input value={password} onChange={onPasswordChange} type="password" id="password" name="password" required></input>
              <input type="submit" value="Login" id="login-button"></input>
          </form>
        </div>
      </div>
      </>
  )
}

async function LoginHandler(event, authData){
  event.preventDefault();
  //console.log(`This is authData:`, authData)
  
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

  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphqlQuery)
  }).then(res => {
    return res.json();
  }).then(resData => {
    if(resData.errors && resData.errors[0].status === 422){
      throw new Error("Validation failed! Make sure the email is correct.");
    }
    if(resData.errors){
      throw new Error("User login failed.")
    }
    
    cookie.set("token", resData.data.login.token)
  })



}

export default LoginForm;