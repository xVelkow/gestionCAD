import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { elementTypeAcceptingRef } from "@mui/utils";
const Create = ({section}) =>{
	const [checked,setChecked] = useState(false);
	
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
	const needSlice = ['Members'];
	const [object,setObject] = useState({})
	const [isReady,setIsReady] = useState(false);
	const [isDone,setIsDone] = useState(false);
	const [showCase,setShowCase] = useState({state:''});
    // const check = () =>{
	// 	if(cef,fullName){
	// 		const formData = new FormData();
	// 		formData.append('id',cef);
	// 		formData.append('fullNameMember',fullName);
	// 		formData.append('groupMember',group);
	// 		formData.append('emailMember',email);
	// 		formData.append('departmentMember',department);
	// 		formData.append('roleMember',role);
	// 		setChecked(true);
	// 		return formData;
	// 	}
	// }
	// const check = ()=>{
	// 	// console.log(object[obj[0][1][1][0]])
	// 	obj.forEach(sections=>{
	// 		section !== sections[0] 
	// 		? null
	// 		: sections.forEach(specificSection=>{
	// 			!needSlice.includes(section)
	// 			? section === specificSection ? null : isEmpty(object[specificSection],specificSection)
	// 			: section === specificSection ? null : specificSection.forEach(side=>{
	// 				side === 'START' ? null : side.forEach(element=>{
	// 					isEmpty(object[element],element)
	// 				})
	// 			})
	// 		})
	// 	})
	// }
	// const isEmpty = (target,label)=>{
	// 	target == ''? console.log(`${label} field is empty`) : console.log('good')
	// }
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
	// const check = () =>{}
	const check = async () =>{
		const allEmpty = await Object.values(object).every(v=>v == '');
		if(allEmpty){
			// console.log('all are empty')
			setShowCase({
				state: 'alert-fail',
				message: 'Please fill the fields first'
			});
		}else{
			const isEmpty = await Object.values(object).some(v=>v == '');
			if(isEmpty){
				// console.log('some fields are empty')
				setShowCase({
					state: 'alert-fail',
					message: 'Input fields should not be empt'
				});
			}else{
				// console.log('all fields are filled')
				// setShowCase({
				// 	state: 'success',
				// 	message: 'Added Successfully'
				// });
				switch(section){
					case 'Members':
						if(object.Cef.match(/^[0-9]{13}$/)){
							const domain = /@ofppt-edu.ma$/;
							const domainTest = domain.test(object.Email.toLowerCase());
							if(domainTest){
								if(object.Email.match(/\@/g).length === 1){
									setShowCase({state:'alert-success',message:'Added successfully'});
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
				}
			}
		}
		setTimeout(()=>{
			setShowCase(showCase=>({...showCase,state:''}));
		},2000);
	}
	const handle= (e)=>{
		setObject(object=>({
			...object,
			[e.target.name] : e.target.value
		}))
	}

	// const check = ()=>{
	// 	obj.forEach(element => {
	// 		element[0] !== section ? null : element.forEach(specificElement => {
	// 			if(specificElement !== section){
	// 				if(typeof(specificElement) !== 'object'){
	// 					if(object[specificElement] == '' || object[specificElement] == undefined){
	// 						console.log('bad')
	// 						setIsReady(false);
	// 						return false;
	// 					}else{
	// 						console.log('good')
	// 						setIsReady(true);
	// 					}
	// 				}else{
	// 					specificElement.forEach(target => {
	// 						if(target !== 'START'){
	// 							target.forEach(specificTarget => {
	// 								if(specificTarget === ''){
	// 									console.log('not run')
	// 									setIsReady(false);
	// 									return false;
	// 								}else{
	// 									console.log('not run')

	// 									setIsReady(true);
	// 								}
	// 							});
	// 						}
	// 					});
	// 				}
	// 			} 
	// 		});
	// 	});
	// }
	// useEffect(()=>{
	// 	if(checked){
	// 		const formData = check();
	// 		axios.post('http://127.0.0.1:8000/api/Members',formData)
	// 		.then(res=>{
	// 			if(res.statusText !== "OK" || typeof(res.data) !== 'object'){
	// 				throw Error('Could not send data');
	// 			}else{
	// 				return res.data
	// 			}
	// 		})
	// 		.then(data=>{
	// 			console.log(data);
	// 			setCef('');
	// 			setFullName('');
	// 			setChecked(false);
	// 		})
	// 		.catch(err=>{
	// 			console.clear();
	// 			console.log(err.response);
	// 			setChecked(false);
	// 		});
	// 	}
	// },[checked])
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
			  				<button type='reset' className='action-button cancel-button'>Cancel</button>
			  				<button type='submit' className='action-button send-button' onClick={check}>Create</button>
			  			</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Create;