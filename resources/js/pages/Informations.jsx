import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import roles from "../modules/roles";
import { useNavigate } from "react-router-dom";
import useValidate from '../hooks/useValidate';
import useFill from '../hooks/useFill';
import useFormData from "../hooks/useFormData";

const Informations = () =>{
	const navigate = useNavigate();
	const {data = {}, isPending, error} = useFetch(`Members/${sessionStorage.getItem('id')}`)
	const departments = useFetch('Departments')
	const sessions = useFetch('Sessions')

	const [object, setObject] = useState({});
	const [checked, setChecked] = useState(false)
	const [showCase, setShowCase] = useState({})
	useFill(checked, setObject, 'Members', data)
	const check = ()=>{
		const showObj = useValidate('Members',object);
		showObj.then(res=>{
			const [showObj, checked] = res;
			setChecked(checked);
			setShowCase({...showObj})
			setTimeout(()=>{
				setShowCase(showCase=>({...showCase, state:''}));
			},2000);
		})
	}

	const handle= (e)=>{
		setObject(object=>({
			...object,
			[e.target.name] : e.target.value
		}))
	}
	useEffect(()=>{

		const formData = useFormData('PATCH','Members',object);
		if(checked){
			axios.post(`http://127.0.0.1:8000/api/Members/${data.id}`,formData,{
				headers:{
					Authorization: `Bearer ${sessionStorage.getItem('token')}`
				}
			})
			.then(res=>{
				if(res.statusText !== "OK" || typeof(res.data) !== 'object'){
					throw Error('Could not send data');
				}else{
					navigate(`/Dashboard/Members/${object.Cef}`);
				}
			})
			.catch(err=>{
				console.clear();
				console.log(err.response);
				setChecked(false);
			});
		}
	},[checked])
    return(
        <>

			<NavBar />
			<div className={`alert ${showCase.state}`}>
				{showCase.message}
			</div>
            <div className="form-container">
                <div className="form-holder">
                <h2 className="form-title">Personal Informations</h2 >
                    <div className="form-wrapper">
                        <div className="form-slicer">
                            <div className="input-wrapper">										
 			                	<input 
			                		name='Cef'
			                		type="text" className="input-field" 
			                		id="cef" value={object.Cef} 
			                		onChange={e=>{handle(e)}}
			                		autoComplete="off" 
			                		required
			                	/>

 			                	<label htmlFor="" className="input-content">
 			                		<span className="input-name">Cef</span>
 			                	</label>
 		                    </div>
                            <div className="input-wrapper">										
 			                	<input 
			                		name='Name'
			                		type="text" className="input-field" 
			                		id="flname" value={object.Name} 
			                		onChange={e=>{handle(e)}}
			                		autoComplete="off" 
			                		required
			                	/>

 			                	<label htmlFor="" className="input-content">
 			                		<span className="input-name">Name</span>
 			                	</label>
 		                    </div>
                            <div className="input-wrapper">										
 			                	<input 
			                		name='Email'
			                		type="text" className="input-field" 
			                		id="email" value={object.Email} 
			                		onChange={e=>{handle(e)}}
			                		autoComplete="off" 
			                		required
			                	/>

 			                	<label htmlFor="" className="input-content">
 			                		<span className="input-name">Email</span>
 			                	</label>
 		                    </div>
							 <div className="input-wrapper">										
 			                	<input 
			                		name='Group'
			                		type="text" className="input-field" 
			                		id="group" value={object.Group} 
			                		onChange={e=>{handle(e)}}
			                		autoComplete="off" 
			                		required
			                	/>

 			                	<label htmlFor="" className="input-content">
 			                		<span className="input-name">Group</span>
 			                	</label>
 		                    </div>
                        </div>
                        <div className="" style={{display:'flex',flexDirection:'column',gap: "1.5em"}}>
                            <div className="selection-holder">										
 			                	<select name="" id="" disabled={true}>
									{departments.data.map(department=><option selected={department.nameDepartment === data.departmentMember? true :false}>{department.nameDepartment}</option>)}
								</select>
 		                    </div>
							<div className="selection-holder">										
 			                	<select name="" id="" disabled>
									{sessions.data.map(session=><option selected={session.refSession === data.sessionMember? true :false}>{session.refSession}</option>)}
								</select>
 		                    </div>
							 <div className="selection-holder">										
 			                	<select name="" id="" disabled>
									{roles.map(role=><option selected={role === data.roleMember? true :false}>{role}</option>)}
								</select>
 		                    </div>
							<h5 style={{textAlign: 'center', color: 'navy',cursor: 'pointer'}} onClick={()=>navigate('/ChangePassword')}>Change Password</h5>
                        </div>
                    </div>
                    <div className="form-actions" style={{marginTop: '3.5em'}}>
			    		<button className='action-button cancel-button'>Cancel</button>
			    		<button type='submit' className='action-button send-button' onClick={check}>Update</button>
			    	</div>
                </div>
            </div>
        </>
    );
}
export default Informations;