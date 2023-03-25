import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Edit = () =>{
    const navigate = useNavigate();
    const {id} = useParams();
    const [received, setReceived] = useState(false);
	const [checked,setChecked] = useState(false);

    const [cef,setCef] = useState('');
    const [fullName,setFullName] = useState('');
    const [group,setGroup] = useState('');
    const [email,setEmail] = useState('');
    const [department,setDepartment] = useState('');
    const [role,setRole] = useState('');
    
    const reset = ()=>{
        setCef('');
        setFullName('');
        setGroup('');
        setEmail('');
        setDepartment('');
        setRole('');
    }
    const check = () =>{
			const formData = new FormData();
            formData.append('_method', 'PATCH');
			formData.append('id',cef);
			formData.append('fullNameMember',fullName);
			formData.append('groupMember',group);
			formData.append('emailMember',email);
			formData.append('departmentMember',department);
			formData.append('roleMember',role);
			setChecked(true);
			return formData;
	}
    useEffect(()=>{
        if(!received){
            axios.get(`http://127.0.0.1:8000/api/Members/${id}`)
            .then(response=>{
                if(response.statusText !== 'OK' || typeof(response.data) !== 'object'){
                    throw Error('Could not get member\'s informations')
                }else{
                    return response.data;
                }
            })
            .then(data=>{
                setCef(data.id);
                setFullName(data.fullNameMember);
                setGroup(data.groupMember);
                setEmail(data.emailMember);
                setDepartment(data.departmentMember);
                setRole(data.roleMember);
                setReceived(true);
            }).catch(err=>{
                console.log(err.message);
            })
        }
    })
	useEffect(()=>{
		if(checked){
			const formData = check();
			axios.post(`http://127.0.0.1:8000/api/Members/${id}`,formData)
			.then(res=>{
				if(res.statusText !== "OK" || typeof(res.data) !== 'object'){
					throw Error('Could not send data');
				}else{
					navigate(`/Dashboard/Members/${cef}`);
				}
			})
			.catch(err=>{
				console.clear();
				setChecked(false);
			});
		}
	},[checked])
	return(
		<>
        <Link to='/Dashboard/Members'>go back</Link>
			<br />
			<div className='form-container'> 
				<div className="form-holder">
					<h2 className="form-title">Edit member</h2>
					<div className="form-wrapper">
						<div className="form-slicer">
							<div className="input-wrapper">
								<input type="text" className="input-field" id="fname" value={cef} onChange={(e)=>setCef(e.target.value)} autoComplete="off" required/>
								<label htmlFor="" className="input-content">
									<span className="input-name">Cef</span>
								</label>
							</div>
							<div className="input-wrapper">
								<input type="text" className="input-field" id="fname" value={fullName} onChange={(e)=>setFullName(e.target.value)} autoComplete="off" required/>
								<label htmlFor="" className="input-content">
									<span className="input-name">Full Name</span>
								</label>
							</div>
							<div className="input-wrapper">
								<input type="text" className="input-field" id="lname" value={group} onChange={(e)=>setGroup(e.target.value)} autoComplete="off" required/>
								<label htmlFor="" className="input-content">
									<span className="input-name">Group</span>
								</label>
							</div>
						</div>
						<div className="form-slicer">
							<div className="input-wrapper">
								<input type="text" className="input-field" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="off" required/>
								<label htmlFor="" className="input-content">
									<span className="input-name">E-mail</span>
								</label>
							</div>
							<div className="input-wrapper">
								<input type="text" className="input-field" id="department" value={department} onChange={(e)=>setDepartment(e.target.value)} autoComplete="off" required/>
								<label htmlFor="" className="input-content">
									<span className="input-name">Department</span>
								</label>
							</div>
							<div className="input-wrapper">
								<input type="text" className="input-field" id="role" value={role} onChange={(e)=>setRole(e.target.value)} autoComplete="off" required/>
								<label htmlFor="" className="input-content">
									<span className="input-name">Role</span>
								</label>
							</div>
						</div>
					</div>
					<div className="form-actions">
						<button type='reset' onClick={reset}>Cancel</button>
						<button type='submit' onClick={check}>Update</button>
					</div>
				</div>
			</div>
		</>
	);
}
export default Edit;