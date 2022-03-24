import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
const Login = () => {
  const history=useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const loginUser = async (e)=>{
    e.preventDefault();
    const res = await fetch('/signin',{
      method :"POST",
      headers :{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
      
    });
    const data=await res.json();
 if(res.status===400 || !data){
   window.alert("Invalid Credentials");
   
 }else{
  window.alert("Login succesfully");
  history.push("/");
 }
  }
  return (
    <>
    <section className='sign-in'>
<div className='container mt-5'>
  <div className='signin-content'>
    <div className='signin-form'>
      <h2 className='form-title'>Sign-up</h2>
      <form method='POST' className='register-form' id='register-form'>

     

        <div className='form-group'>
          <label htmlFor='name'>
            <p> Email</p>
          </label>
          <input type='email' name='email' id='email'  placeholder='your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>


        <div className='form-group'>
          <label htmlFor='password'>
            <p> password</p>
          </label>
          <input type='password' name='password' id='password'  placeholder='your password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        <div className='form-group form-button'>
          <input type='submit' name='signin' id='signin' className='form-submit' value='Log In' onClick={loginUser} />
        </div>
      </form>
    </div>
  </div>
</div>
 </section>
    </>
  )
}

export default Login