import { useState } from 'react';

export default function Login() {

        const [data, setData] = useState({

            email: '',
            password: '',
        })

const loginUser = (e) => {
    e.preventDefault();
    console.log('Form submitted:', data);
}

  return (
   <div>
    <form onSubmit = {loginUser}>
    <label> Email </label>
        <input type = "email" name="email" placeholder="email" value = {data.email} onChange = {(e) => setData({...data, email: e.target.value})} />
        <br/>

        <label> Password </label>
        <input type="password" name="password" placeholder="password" value = {data.password} onChange = {(e) => setData({...data, password: e.target.value})} />

        <button type = 'submit'> Login</button>
    </form>
   </div> 
  )
}
