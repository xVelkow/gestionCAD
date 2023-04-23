import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from '../hooks/useFetch';
import useFormData from "../hooks/useFormData";
import useValidate from "../hooks/useValidate";
import NavBar from "../components/NavBar";
import sectionFields from "../modules/sectionFields";

const Edit = ({section}) =>{
    const navigate = useNavigate();
    const {id} = useParams();
	const selection = ['Department','Role','Session'];
	const options = ['op1','op2', 'op3'];


	const departments = useFetch('Departments');
	const sessions = useFetch('Sessions');

	const roles = ['Member','Manager','Vice-president','President'];

	// useEffect(()=>{
	// 	localStorage.getItem('token') ?? navigate('/login')
	// },[])

	const [checked,setChecked] = useState();
	const needSlice = ['Members']; // whatever section needs to slice form
	const [object,setObject] = useState({})
  	const [showCase,setShowCase] = useState({state:''});
	const {data = {},isPending,error} = useFetch(`${section}/${id}`);
	useEffect(()=>{
		(!isPending && !error && data.length === 0) && navigate(`/Dashboard/${section}`)
		console.log(data)
		console.log(sessions)
	},[isPending,data])

	// handle inputs
	const fillInputs = () =>{
		switch(section){
			case 'Members':
				setObject({
					Cef: data.id,
					Name: data.fullNameMember,
					Group: data.groupMember,
					Email: data.email,
					Department: data.departmentMember,
					Role: data.roleMember
				});
				break;
			case 'Sessions':
				setObject({
					Reference: data.refSession
				});
				break;
			case 'Plannings':
				setObject({
					Title: data.titlePlanning,
					Description: data.descriptionPlanning
				});
				break;
			case 'Posts':
				setObject({
					Title: data.titlePost,
					Description: data.descriptionPost
				});
				break;
			case 'Departments':
				setObject({
					Name: data.nameDepartment,
					Description: data.descriptionDepartment
				});
				break;
		}
	}
	// display data
	useEffect(()=>{
		fillInputs();
	},[data])
	// handle inputs
	const handle= (e)=>{
		setObject(object=>({
			...object,
			[e.target.name] : e.target.value
		}))
	}
	// validation
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
// update data
	useEffect(()=>{
		const formData = useFormData('PATCH',section,object);
		if(checked){
			axios.post(`http://127.0.0.1:8000/api/${section}/${id}`,formData,{
				headers:{
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res=>{
				if(res.statusText !== "OK" || typeof(res.data) !== 'object'){
					throw Error('Could not send data');
				}else{
					switch(section){
						case 'Members':
							navigate(`/Dashboard/${section}/${object.Cef}`);
							break;
						case 'Departments':
						case 'Posts':
						case 'Plannings':
						case 'Sessions':
							navigate(`/Dashboard/${section}/${data.id}`);
							break;
					}
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
		{ (!isPending && error) &&
			<>
				<h1>{error}</h1>
			</>
		}
		{	isPending &&
			<>
				<h1>loading</h1>	
			</>
		}
		{ (!!data && !isPending) &&
			<>
				<NavBar />
				<div className={`alert ${showCase.state}`}>
					{showCase.message}
				</div>
				<div className="global-holder">

					<div className='form-container'>
						<div className={needSlice.includes(section) ? "form-holder" : "form-holder1"}>
							<h2 className="form-title">Edit {section.slice(0,-1)}</h2>
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
													{sessions.data.map(session=><option value={session.refSession} selected={session.refSession === data[`session${section.substring(0,section.length-1)}`]? true: false}>{session.refSession}</option>)}												</select>
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
																	<option>Choose a {labelValue}</option>
																	{
																		labelValue === 'Department' &&
																		departments.data.map(department=><option value={department.nameDepartment} selected={data.departmentMember === department.nameDepartment? true:false}>{department.nameDepartment}</option>)
																	}
																	{
																		labelValue === 'Role' &&
																		roles.map(role=><option value={role} selected={role === data.roleMember? true: false}>{role}</option>)
																	}
																	{
																		labelValue === 'Session' &&
																		sessions.data.map(session=><option value={session.refSession} selected={session.refSession === data.sessionMember? true : false}>{session.refSession}</option>)
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
								  <button type='submit' className='action-button send-button' onClick={check}>Edit</button>
							  </div>
						</div>
					</div>
				</div>
			</>
		}	
	</>
	);
}
export default Edit;