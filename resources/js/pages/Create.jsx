import { useEffect, useState } from "react";
import axios from "axios";
import useFormData from "../hooks/useFormData";
import useValidate from "../hooks/useValidate";
import NavBar from "../components/NavBar";

import Form from "../components/Form";
const Create = ({section}) =>{
	const [checked,setChecked] = useState(false);
	const [object,setObject] = useState({})
  	const [showCase,setShowCase] = useState({state:''});
	
	const check = ()=>{
		const showObj = useValidate(section,object,'added');
		showObj.then(res=>{
			const [showObj, checked] = res;
			setChecked(checked);
			setShowCase({...showObj})
			setTimeout(()=>{
				setShowCase(showCase=>({...showCase, state:''}));
			},2000);
		})
	}

	// send data
	useEffect(()=>{
		const formData = useFormData('POST',section,object);
		if(checked){
			axios.post(`http://127.0.0.1:8000/api/${section}`,formData,{
				headers:{
					Authorization: `Bearer ${sessionStorage.getItem('token')}`
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
				
			<Form 
				section={section} 
				object={object}
				setObject={setObject}
				check={check}
				checked={checked}
				page='create'
			/>

		</>
	);
}
export default Create;