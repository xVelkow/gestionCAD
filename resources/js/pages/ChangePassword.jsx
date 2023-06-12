import { useEffect, useState } from "react"
import useValidate from "../hooks/useValidate"
import useFormData from "../hooks/useFormData";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
const ChangePassword = () =>{
    const navigate = useNavigate()
    const [object,setObject] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showCase, setShowCase] = useState({state:''})
    const [checked, setChecked] = useState(false);
    const check = () =>{
        const validation = useValidate('Password',object)
        validation.then(response=>{
            setShowCase({...response[0]})
            setChecked(response[1]);
            setTimeout(()=>{
				setShowCase(showCase=>({...showCase, state:''}));
			},2000);
        })
    }

    useEffect(()=>{
        const formData = useFormData('PATCH','Password',object);
        if(checked){
			axios.post(`http://127.0.0.1:8000/api/changePassword/${sessionStorage.getItem('id')}`,formData,{
				headers:{
					Authorization: `Bearer ${sessionStorage.getItem('token')}`
				}
			})
			.then(res=>{
				if(res.statusText !== "OK" || typeof(res.data) !== 'object'){
					throw Error('Could not send data');
				}else{
					console.log(res.data)
                    setChecked(false);
                    navigate('/Dashboard')
				}
			})
			.catch(err=>{
				// console.clear();
				console.log(err.response);
				setChecked(false);
			});
		}
    },[checked])

    return(
        <>
        <div className={`alert ${showCase.state}`}>
			{showCase.message}
		</div>
        {/* <NavBar /> */}
        <div className="login">
            <div className="login-wrapper">
                <h2 className="login-title" style={{fontSize: '1.35rem'}}>Change password</h2>
                <div>
                    <div className="input-wrapper">
                        <input 
                            type="text" className="input-field" 
                            value={object.newPassword} 
                            onChange={e=>{setObject(prev=>({...prev,newPassword: e.target.value}))}}
                            autoComplete="off" 
                            required
                        />
                        <label className="input-content">
                            <span className="input-name">New Password</span>
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <input 
                            type="text" className="input-field" 
                            value={object.confirmPassword} 
                            onChange={e=>{setObject(prev=>({...prev,confirmPassword: e.target.value}))}}
                            autoComplete="off" 
                            required
                        />
                        <label className="input-content">
                            <span className="input-name">Confirm Password</span>
                        </label>
                    </div>
                </div>
                <button
                    className="action-button send-button login-button"
                    onClick={()=>check()}
                >Update</button>
            </div>
        </div>
    </>
    );
}
export default ChangePassword;