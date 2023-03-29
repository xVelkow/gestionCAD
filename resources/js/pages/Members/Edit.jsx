import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from '../../components/useFetch';
const Edit = ({section}) =>{
    const navigate = useNavigate();
    const {id} = useParams();

	const obj = [
		['Members',[
			'START',['Cef','Name','Group']
			],
			[
				'START',['Email','Department','Role']
			]
		],
		['Sessions','Reference']
	];
	const [checked,setChecked] = useState(false);
	const needSlice = ['Members']; // whatever section needs to slice form
	const [object,setObject] = useState({})
	const [isReady,setIsReady] = useState(false);
  	const [showCase,setShowCase] = useState({state:''});
	const {data = {},isPending,error} = useFetch(`${section}/${id}`);
	// handle inputs
	const fillInputs = () =>{
		switch(section){
			case 'Members':
				setObject({
					Cef: data.id,
					Name: data.fullNameMember,
					Group: data.groupMember,
					Email: data.emailMember,
					Department: data.departmentMember,
					Role: data.roleMember
				});
				break;
			case 'Sessions':
				setObject({
					Reference: data.refSession
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
	const check = async () =>{
		const allEmpty = await Object.values(object).every(v=>v == '');
		if(allEmpty){
			setShowCase({
				state: 'alert-fail',
				message: 'Please fill the fields first'
			});
		}else{
			const isEmpty = await Object.values(object).some(v=>v == '');
			if(isEmpty){
				setShowCase({
					state: 'alert-fail',
					message: 'Input fields should not be empt'
				});
			}else{
				switch(section){
					case 'Members':
						if(object.Cef.match(/^[0-9]{13}$/)){
							const domain = /@ofppt-edu.ma$/;
							const domainTest = domain.test(object.Email.toLowerCase());
							if(domainTest){
								if(object.Email.match(/\@/g).length === 1){
									setChecked(true);
									setIsReady(true);
								}else{
									setShowCase({state:'alert-fail',message:'Email should contain only one @'});
								}
							}else{
								setShowCase({state:'alert-fail',message:'Email should end with @ofppt-edu.ma'});
							}
						}else{
							setShowCase({state:'alert-fail',message:'Cef should contain exactly 13 digits'});
						}
						break;
					case 'Sessions':
						const pattern = /^\d{4}-\d{4}$/;
						if(pattern.test(object.Reference)){
							const [sec1, sec2] = object.Reference.split('-');
							if((+sec1) + 1 === (+sec2)){
								setChecked(true);
								setIsReady(true);
							}else{
							setShowCase({state:'alert-fail',message:'Example: 2022-2023'});
							}
						}
						else{
							setShowCase({state:'alert-fail',message:'Example: 2022-2023'});
						}
						break;
				}
			}
		}
		setTimeout(()=>{
			setShowCase(showCase=>({...showCase,state:''}));
		},2000);
	}
	// formData
	const send = () =>{
		if(isReady){
			const formData = new FormData();
			formData.append('_method', 'PATCH');
			switch(section){
				case 'Members':
					formData.append('id',object.Cef);
					formData.append('fullNameMember',object.Name);
					formData.append('groupMember',object.Group);
					formData.append('emailMember',object.Email);
					formData.append('departmentMember',object.Department);
					formData.append('roleMember',object.Role);
					break;
				case 'Sessions':
					formData.append('refSession',object.Reference);
					break;
				}
				return formData;
		}
	}

	useEffect(()=>{
		const formData = send();
		if(checked){
			axios.post(`http://127.0.0.1:8000/api/${section}/${id}`,formData)
			.then(res=>{
				if(res.statusText !== "OK" || typeof(res.data) !== 'object'){
					throw Error('Could not send data');
				}else{
					switch(section){
						case 'Members':
							navigate(`/Dashboard/${section}/${object.Cef}`);
							break;
						case 'Departments':
						case 'Events':
						case 'Planning':
						case 'Sessions':
							navigate(`/Dashboard/${section}/${data.id}`);
							break;
					}
				}
			})
			.catch(err=>{
				console.clear();
				console.log(err.response);
				setIsReady(false);
				setChecked(false);
			});
		}
	},[checked])
	return(
		<>
		<div className={`alert ${showCase.state}`}>
			{showCase.message}
		</div>
		<div className="global-holder">
			
			<div className='form-container'>
				<div className={needSlice.includes(section) ? "form-holder" : "form-holder1"}>
					<h2 className="form-title">Create new {section}</h2>
					<div className={needSlice.includes(section) ? "form-wrapper" : null}>
						{
							obj.map(elements=>{return(
								elements[0] !== section ? null : elements.map((element,index)=>{return(
									index === 0 
									? null 
									: typeof(element) !== 'object'
									? 
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
										<div className="form-slicer">
												{target.map(labelValue=>{return( // for select options put the selected inputs in an object and use includes as a condition after this block
													<div key={labelValue} className="input-wrapper">
													
														 <input 
														name={labelValue}
														key={`${labelValue}.inputField`} 
														type="text" className="input-field" 
														id="cef" value={object[labelValue] || ''} 
														// onChange={(e)=>setObject(object=>({
														// 	...object,
														// 	[labelValue] : e.target.value
														// }))} 
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
		</div>
	</>
	);
}
export default Edit;