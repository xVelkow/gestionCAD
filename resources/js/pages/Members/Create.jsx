import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFormData from "../../components/useFormData";
import useValidate from "../../components/useValidate";
const Create = ({section}) =>{
	const navigate = useNavigate();
	const obj = [
		['Members',
			[
				'START',['Cef','Name','Group']
			],
			[
				'START',['Email','Department','Role']
			]
		],
		['Sessions','Reference'],
		['Plannings','Title','Description'],
		['Posts','Title','Description']
	];
	
	const [checked,setChecked] = useState(false);
	const needSlice = ['Members']; // whatever section needs to slice form
	const [object,setObject] = useState({})
  	const [showCase,setShowCase] = useState({state:''});

	// fill object
	useEffect(()=>{
		obj.map(sections=>{
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

	// validation
	// const check = async () =>{
	// 	const allEmpty = await Object.values(object).every(v=>v == '');
	// 	if(allEmpty){
	// 		setShowCase({
	// 			state: 'alert-fail',
	// 			message: 'Please fill the fields first'
	// 		});
	// 	}else{
	// 		const isEmpty = await Object.values(object).some(v=>v == '');
	// 		if(isEmpty){
	// 			setShowCase({
	// 				state: 'alert-fail',
	// 				message: 'Input fields should not be empty'
	// 			});
	// 		}else{
	// 			switch(section){
	// 				case 'Members':
	// 					if(object.Cef.match(/^[0-9]{13}$/)){
	// 						const domain = /@ofppt-edu.ma$/;
	// 						const domainTest = domain.test(object.Email.toLowerCase());
	// 						if(domainTest){
	// 							if(object.Email.match(/\@/g).length === 1){
	// 								setChecked(true);
	// 								setIsReady(true);
	// 							}else{
	// 								setShowCase({state:'alert-fail',message:'Email should contain only one @'});
	// 							}
	// 						}else{
	// 							setShowCase({state:'alert-fail',message:'Email should end with @ofppt-edu.ma'});
	// 						}
	// 					}else{
	// 						setShowCase({state:'alert-fail',message:'Cef should contain exactly 13 digits'});
	// 					}
	// 					break;
	// 				case 'Sessions':
	// 					const pattern = /^\d{4}-\d{4}$/;
	// 					if(pattern.test(object.Reference)){
	// 						const [sec1, sec2] = object.Reference.split('-');
	// 						if((+sec1) + 1 === (+sec2)){
	// 							setChecked(true);
	// 							setIsReady(true);
	// 						}else{
	// 						setShowCase({state:'alert-fail',message:'Example: 2022-2023'});
	// 						}
	// 					}
	// 					else{
	// 						setShowCase({state:'alert-fail',message:'Example: 2022-2023'});
	// 					}
	// 					break;
	// 				case 'Plannings':
	// 					setChecked(true);
	// 					setIsReady(true);
	// 					break;
	// 			}
	// 		}
	// 	}
	// 	setTimeout(()=>{
	// 		setShowCase(showCase=>({...showCase,state:''}));
	// 	},2000);
	// }
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
			axios.post(`http://127.0.0.1:8000/api/${section}`,formData)
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
export default Create;