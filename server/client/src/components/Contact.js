import mongoose from 'mongoose';
import{useState,useRef, React} from 'react'

const Contact = () => {
  const nameInputRef=useRef();
    const emailInputRef=useRef();
    const messageInputRef=useRef();
    const [error, setError] = useState();

    function submitHandler(event){
      const enteredName= nameInputRef.current.value;
      const enteredrEmail=emailInputRef.current.value;
      const enteredMessage=messageInputRef.current.value;

        event.preventDefault();
        if (enteredName.trim().length === 0) {
          setError({
            title: 'Invalid  name',
            message: 'Please enter  name .',
          });
          return;
        }
        if (enteredrEmail.trim().length===0) {
          setError({
            title: 'Invalid Email',
            message: 'Please enter your email.',
          });
          return;
        }
        if (enteredMessage.trim().length===0) {
          setError({
            title: 'Invalid Message',
            message: 'Please enter your message.',
          });
          return;
    }

    const data={
      name:enteredName,
      email:enteredrEmail,
      message: enteredMessage
    };
    mongoose.connect('mongodb+srv://Nikhil:06081998xyz@cluster0.h6qo7.mongodb.net/contacts',
    {
         method: "POST",
         body:JSON.stringify(data),
         headers:{
           'Content-type':'application/json'
         }
    });
    alert('your form submitted');
  }
  return (
   <>
   <div className='contact-info'>
     <div className='container-fluid'>
       <div className='row'> 
         <div>
           <div> 
             <p>Phone - 9839148210</p>
           </div>

           <div> 
             <p>Email - nikhilk9450@gmail.com</p>
           </div>

           <div> 
             <p>Address - Varanasi,India </p>
           </div>

         </div>
       </div>

     </div>
   </div>
   <div className='contact_form'>
     <div className='row'>
       <div>
         <div>
           <div>
             Get in Touch
           </div>
           <form id='contact_form' onSubmit={submitHandler}>
             <div>
               <input type='text' id='cntact_form_name'  placeholder='Your name' required='true' ref={nameInputRef} />
               <input type='email' id='cntact_form_email' placeholder='Your Email' required='true' ref={emailInputRef} />
               <input type='number' id='cntact_form_phone'placeholder=' Phone' required='true' ref={messageInputRef} />

             </div>
             <div>
               <textarea id='' cols='30' rows='10' placeholder='your message' ></textarea>
             </div>
             <div>
               <button type='submit'>Send Message</button>
             </div>

           </form>
         </div>
       </div>

     </div>

   </div>
   </>
  )
}

export default Contact;