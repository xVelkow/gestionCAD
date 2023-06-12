import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFetch from '../hooks/useFetch';
import useFormData from "../hooks/useFormData";
import useValidate from "../hooks/useValidate";
import NavBar from "../components/NavBar";

import Form from "../components/Form";

const Edit = ({section}) =>{
    const navigate = useNavigate();
    const {id} = useParams();


	const departments = useFetch('Departments');
	const sessions = useFetch('Sessions');


	// useEffect(()=>{
	// 	localStorage.getItem('token') ?? navigate('/login')
	// },[])

	const [checked,setChecked] = useState();
	const [object,setObject] = useState({})
  	const [showCase,setShowCase] = useState({state:''});
	const {data = {},isPending,error} = useFetch(`${section}/${id}`);
	useEffect(()=>{
		(!isPending && !error && data.length === 0) && navigate(`/Dashboard/${section}`)
	},[isPending,data])
	// validation
	const check = ()=>{
		if(section === "Posts" && object.Image == undefined){
			setObject(prev=>({...prev, Image: data.imagePost}))
		}
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
					Authorization: `Bearer ${sessionStorage.getItem('token')}`
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
		{ isPending &&
            <div className="loader" style={{marginTop: '6em'}}>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        }
		{ (!!data && !isPending) &&
			<>
				<NavBar />
				<div className={`alert ${showCase.state}`}>
					{showCase.message}
				</div>
				<Form
					section={section} 
					sessions={sessions}
					departments={departments}
					object={object}
					setObject={setObject}
					check={check}
					checked={checked}
					data={data}
					page='edit'
				/>
			</>
		}	
	</>
	);
}
export default Edit;