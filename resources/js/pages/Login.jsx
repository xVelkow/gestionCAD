import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg'
const Login = () =>{
    const [input,setInput] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    
    useEffect(()=>{
        window.addEventListener('token',()=>{
            navigate('/Dashboard')
        })
        sessionStorage.getItem('token') && navigate('/Dashboard');
    },[])
    return(
        <>
        <img src={logo} width={'75pt'} style={{position: 'absolute', top: 0, left: 0, margin: '1em 0em 0 1em', cursor: 'pointer'}} />
        <div className="login">
            <div className="login-wrapper">
                <h2 className="login-title">Login</h2>
                <div className="input-wrapper">
                    <input 
                        type="text" className="input-field" 
                        value={input.email} 
                        onChange={e=>{setInput(prev=>({...prev,email: e.target.value}))}}
                        autoComplete="off" 
                        required
                    />
                    <label className="input-content">
                        <span className="input-name">E-mail</span>
                    </label>
                </div>
                <div className="input-wrapper">
                    <input 
                        type="text" className="input-field" 
                        value={input.password} 
                        onChange={e=>{setInput(prev=>({...prev,password: e.target.value}))}}
                        autoComplete="off" 
                        required
                    />
                    <label className="input-content">
                        <span className="input-name">Password</span>
                    </label>
                </div>
                <button
                    className="action-button send-button login-button"
                    onClick={()=>{
                        useAuth(input);
                    }}
                >Connect</button>
            </div>
        </div>
    </>
    )
}
export default Login