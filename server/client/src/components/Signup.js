import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const history=useHistory();
  const [user,setUser]=useState({
    name:'',email:'',phone:'',work:'',password:'',Cpassword:''
  });
let name,value;

const handleInputs=(e)=>{
  console.log(e);
  name= e.target.name;
  value=e.target.value;
  
  setUser({...user,[name]:value})
}

const postData=async(e)=>{
   e.preventDefault();
   const {name,email,phone,work,password,Cpassword}= user;

  const res =await fetch("/register",{
    method:'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      name,email,phone,work,password,Cpassword
    })
  });
  const data=await res.json();
 if(data.status===422 || !data){
   window.alert("Invalid Registration");
   console.log("Invalid Registration");
 }else{
  window.alert(" Registration success");
  console.log("Registration success");
  history.push("/login");
 }
  }
  return (
   <>
 <section className='signup'>
<div className='container mt-5'>
  <div className='signup-content'>
    <div className='signup-form'>
      <h2 className='form-title'>Sign-up</h2>
      <form method='POST' className='register-form' id='register-form'>

        <div className='form-group'>
          <label htmlFor='name'>
            <p> Name</p>
          </label>
          <input type='text' name='name' id='name'  value={user.name} onChange={handleInputs} placeholder='your name' />
        </div>

        <div className='form-group'>
          <label htmlFor='name'>
            <p> Email</p>
          </label>
          <input type='email' name='email' id='email'  value={user.email} onChange={handleInputs} placeholder='your email' />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>
            <p> phone</p>
          </label>
          <input type='text' name='phone' id='phone'  value={user.phone} onChange={handleInputs} placeholder='your phone' />
        </div>

        <div className='form-group'>
          <label htmlFor='work'>
            <p> Work</p>
          </label>
          <input type='text' name='work' id='work'  value={user.work} onChange={handleInputs} placeholder='your profession' />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>
            <p> password</p>
          </label>
          <input type='password' name='password' id='password'  value={user.password} onChange={handleInputs} placeholder='your password' />
        </div>

        <div className='form-group'>
          <label htmlFor='name'>
            <p>Confirm password</p>
          </label>
          <input type='password' name='Cpassword' id='Cpassword'  value={user.Cpassword} onChange={handleInputs} placeholder='confirm password' />
        </div>

        <div className='form-group form-button'>
          <input type='submit' name='signup' id='signup' className='form-submit' value='register' onClick={postData} />
        </div>
      </form>
    </div>
  </div>
</div>
 </section>
   </>
  )
}

export default Signup