import { useState } from 'react';


export default function Register() {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const registerUser = (e) => {
        e.preventDefault();
        console.log('Form submitted:', data);
    }


  return (
    <div>
        <form onSubmit={registerUser} style={{textAlign: "left"}}>
 
            <label> Name </label>
            <input type="text" name="name" placeholder="name" value = {data.name} onChange = {(e) => setData({...data, name: e.target.value})}/>
            <br />

            <label> Email </label>
            <input type="email" name="email" placeholder="email" value = {data.email} onChange = {(e) => setData({...data, email: e.target.value})} />
            <br />

            <label> Password </label>
            
            <input type="password" name="password" placeholder="password" value = {data.password} onChange = {(e) => setData({...data, password: e.target.value})} />
            <input type="submit" value="Register" />
            

        </form>
    </div>

  )
}
