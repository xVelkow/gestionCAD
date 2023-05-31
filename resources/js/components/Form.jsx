import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import sectionFields from "../modules/sectionFields";
import roles from "../modules/roles";
import needSlice from "../modules/needSlice";
import selection from "../modules/selection";
import useFill from "../hooks/useFill";

import useFetch from "../hooks/useFetch";
const Form = ({section, object, check, checked, setObject, data = undefined, page}) =>{
	const departments = useFetch('Departments');
	const sessions = useFetch('Sessions');
	let i = 0;
	const navigate = useNavigate()
	const [stateRoles,setStateRoles] = useState(roles);
	const [stateDepartments, setStateDepartments] = useState([])
	useFill(checked,setObject, section, data)
	const handle= (e)=>{
		setObject(object=>({
			...object,
			[e.target.name] : e.target.value
		}))
	}

	let x;
	let y;
	useEffect(()=>{
		if(object.Department === 'Presidency'){
			x = roles.filter(role=> ['President','Vice-president'].includes(role))
			setStateRoles(x)
		}else{
			x = roles.filter(role=> ['Member','Manager'].includes(role))
			setStateRoles(x)
		}
		if(object.Session){
			y = departments.data.filter(department=>department.sessionDepartment == object.Session);
			setStateDepartments(y)
		}
	},[object])
	useEffect(()=>{
		setStateDepartments(departments.data)
	},[])
	return(
        <>
            <div className='form-container'>
				<div className={needSlice.includes(section) ? "form-holder" : "form-holder1"}>
					<h3 className="form-title">Create new {section}</h3>
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
										onChange={(e)=>setObject(prev=>({...prev,'Session': e.target.value}))}
										>
											<option selected={!checked}>Choose a {element}</option>
											{sessions.data.map(session=><option key={session.id} value={session.refSession} selected={typeof(data) === 'object'?((session.refSession === object.Session)?true:false):false}>{session.refSession}</option>)}
										</select>
										{
										section === 'Posts' && 
											<input
												type='file'
												multiple
												onChange={(e)=>setObject(object=>({...object,'images': e.target.files}))}
												style={{marginBottom:'1em', width: '17em'}}
											/>
										}
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
												{target.map((labelValue,index)=>{return( // for select options put the selected inputs in an object and use includes as a condition after this block
													selection.includes(labelValue)
													?
													<div key={`${labelValue}-${index}`} className="selection-holder">
														<select 
														onChange={(e)=>setObject(prev=>({...prev,[labelValue]: e.target.value}))}
														>
															<option value='' selected={!checked}>Choose a {labelValue}</option>
															{
																labelValue === 'Session' &&
																sessions.data.map(session=><option key={session.id} value={session.refSession} selected={typeof(data) === 'object'?(session.refSession === data.sessionMember)? true : false:false}>{session.refSession}</option>)
															}
															{
																labelValue === 'Department' &&
																stateDepartments.map(department=><option key={department.id} value={department.nameDepartment} selected={typeof(data) === 'object'?((data.departmentMember === department.nameDepartment)? true:false):false}>{department.nameDepartment}</option>)
															}
															{
																labelValue === 'Role' &&
																stateRoles.map((role,index)=><option key={index} value={role} selected={typeof(data) ===  'object'?((role === data.roleMember)? true: false):false}>{role}</option>)
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
						<button type='submit' className='action-button send-button' onClick={check}>{page === 'create'? 'Create': 'Update'}</button>
					</div>
				</div>
			</div>
        </>
    )
}
export default Form;