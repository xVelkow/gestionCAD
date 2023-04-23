import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFormData from "../hooks/useFormData";
import useValidate from "../hooks/useValidate";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import sectionFields from "../modules/sectionFields";
const Create = ({section}) =>{
	const navigate = useNavigate();
	const departments = useFetch('Departments');
	const sessions = useFetch('Sessions');

	const roles = ['Member','Manager','Vice-president','President'];

	const needSlice = ['Members']; // whatever section needs to slice form
	const selection = ['Department','Role','Session'];
	const options = ['op1','op2', 'op3'];
	const [checked,setChecked] = useState(false);
	const [object,setObject] = useState({})
  	const [showCase,setShowCase] = useState({state:''});

	// fill object
	useEffect(()=>{
		sectionFields.map(sections=>{
			sections[0] !== section
			? null
			: sections.map(elements=>{
				typeof(elements) !== 'object'
				? elements === section 
				? null 
				: setObject(object=>({
					...object,
					[elements]: '',
				}))
				: elements.map(element=>{
					element === 'START'
					? null
					: element.map(target=>{
						setObject(object=>({
							...object,
							[target]: '',
						}))
					})
				})
			})
		})
	},[]);	

	const check = ()=>{
		const showObj = useValidate(section,object);
		showObj.then(res=>{
			const [showObj, checked] = res;
			setChecked(checked);
			setShowCase({...showObj})
			setTimeout(()=>{
				setShowCase(showCase=>({...showCase, state:''}));
			},2000);
		})
	}

	// handle inputs
	const handle= (e)=>{
		setObject(object=>({
			...object,
			[e.target.name] : e.target.value
		}))
	}

	// send data
	useEffect(()=>{
		const formData = useFormData('POST',section,object);
		if(checked){
			axios.post(`http://127.0.0.1:8000/api/${section}`,formData,{
				headers:{
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res=>{
				if(res.statusText !== "OK" || typeof(res.data) !== 'object'){
					throw Error('Could not send data');
				}else{
					return res.data
				}
			})
			.then(data=>{
				console.log(data);
				setChecked(false);
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
				
			<div className='form-container'>
				<div className={needSlice.includes(section) ? "form-holder" : "form-holder1"}>
					<h2 className="form-title">Create new {section}</h2>
					<div className={needSlice.includes(section) ? "form-wrapper" : null}>
						{
							sectionFields.map(elements=>{return(
								elements[0] !== section ? null : elements.map((element,index)=>{return(
									index === 0 
									? null 
									: typeof(element) !== 'object'
									?
									selection.includes(element)
									?
									<div className="selection-holder">
										<select 
										onChange={(e)=>setObject(prev=>({...prev,[element]: e.target.value}))}
										>
											<option value="">Choose a {element}</option>
											{sessions.data.map(session=><option value={session.refSession}>{session.refSession}</option>)}
										</select>
										<br />
									</div>
									:
									<div key={element} className="input-wrapper">
									
										<input 
										key={`${element}.inputField`} 
										type="text" 
										className="input-field" 
										id="cef" 
										value={object[element] || ''} 
										onChange={(e)=>setObject(object=>({
											...object,
											[element] : e.target.value
										}))} 
										autoComplete="off" 
										required
										/>

										<label key={`${element}.labelField`} htmlFor="" className="input-content">
											<span key={`${element}.textField`} className="input-name">{element}</span>
										</label>
									</div>
									: element.map(target=>{return(
										typeof(target) === 'object' &&
										<div key={`${target}-Slicer`} className="form-slicer">
												{target.map(labelValue=>{return( // for select options put the selected inputs in an object and use includes as a condition after this block
													selection.includes(labelValue)
													?
													<div className="selection-holder">
														<select 
														onChange={(e)=>setObject(prev=>({...prev,[labelValue]: e.target.value}))}
														>
															<option value="">Choose a {labelValue}</option>
															{
																labelValue === 'Department' &&
																departments.data.map(department=><option value={department.nameDepartment}>{department.nameDepartment}</option>)
															}
															{
																labelValue === 'Role' &&
																roles.map(role=><option value={role}>{role}</option>)
															}
															{
																labelValue === 'Session' &&
																sessions.data.map(session=><option value={session.refSession}>{session.refSession}</option>)
															}
														</select>
														<br />
													</div>
													:
													<div key={labelValue} className="input-wrapper">
													
 														<input 
														name={labelValue}
														key={`${labelValue}.inputField`} 
														type="text" className="input-field" 
														id="cef" value={object[labelValue] || ''} 
														onChange={e=>{handle(e)}}
														autoComplete="off" 
														required
														/>

 														<label key={`${labelValue}.labelField`} htmlFor="" className="input-content">
 															<span key={`${labelValue}.textField`} className="input-name">{labelValue}</span>
 														</label>
 													</div>
												)})}
										</div>

									)})
							)})
							)})
						}
					</div>
					<div className={needSlice.includes(section) ? "form-actions" : "form-actions1"}>
						<button className='action-button cancel-button' onClick={()=>{navigate(`/Dashboard/${section}`)}}>Cancel</button>
						<button type='submit' className='action-button send-button' onClick={check}>Create</button>
					</div>
				</div>
			</div>

		</>
	);
}
export default Create;