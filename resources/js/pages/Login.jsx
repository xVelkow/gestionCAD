import { useState } from "react";
import useAuth from "../components/useAuth";
const Login = () =>{
    const [input,setInput] = useState({email: '', password: ''})
    const handle = (e)=>{
        setInput(prevInput=>({...prevInput, [e.target.name]: e.target.value}))
    }
    return(
        <>
        <h1>login</h1>
            <div className="input-wrapper">
			    <input 
                    type="text" 
                    name="email"
                    className="input-field" 
                    id="email" 
                    value={input.email}
                    onChange={(e)=>handle(e)}
                    autoComplete="off" 
                    required
                    />

                    <label htmlFor="email" className="input-content">
                        <span className="input-name">Email</span>
                    </label>
                </div>
                <div className="input-wrapper">
			    <input 
                    type="password" 
                    name="password"
                    className="input-field" 
                    id="password" 
                    value={input.password}
                    onChange={(e)=>handle(e)}
                    autoComplete="off" 
                    required
                    />

                    <label htmlFor="password" className="input-content">
                        <span className="input-name">Password</span>
                    </label>
                </div>
                <button onClick={
                    ()=>useAuth(input)
                }>click me</button>
        </>
    );
}
export default Login;