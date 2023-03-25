import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../components/useFetch";
import axios from "axios";

const Index = ({section}) =>{
    const [deleteTarget,setDeleteTarget] = useState(null);
    const [deleteChecker,setDeleteChecker] = useState(false);
    const {data = {},isPending,error} = useFetch('GET',section);
    const navigate = useNavigate();
    useEffect(()=>{
        if(deleteChecker){
            axios.delete(`/api/${section}/${deleteTarget}`)
            .then(response=>{
                if(response.statusText !== 'OK' || typeof(response.data) !== 'object'){
                    throw Error('Could not delete the member');
                }else{
                    data.forEach((element,index)=> element.id === deleteTarget ? data.splice(index,1) : null);
                    return response.data;
                }
            })
            .then(data=>{
                console.log(data.isGood);
                setDeleteTarget(null);
                setDeleteChecker(false);
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[deleteChecker]);
    return(
        <>
            {/* Waiting for the response */}
            { isPending &&
                <>
                    <h1>Loading</h1>
                </>
            }
            {/* Response ready */}
            { (data.length > 0 && !isPending) &&
            <>
                <ul>
                    <li><Link to='/Dashboard' >Go to Dashboard</Link></li>
                    <li><Link to='Create' >Create new {section}</Link></li>
                </ul>
                <div className="container">
                    <table className="data-wrapper">
                        <thead className="data-header">
                            <tr className="data-row" key='headers' >
                                {
                                    Object.keys(data[0]).map(key=>{return(
                                        key !== 'id'?<th key={key}>{key}</th>:null
                                    )})
                                }
                                <th colSpan='3' className="data-action">Action</th>
                            </tr>
                        </thead>
                        <tbody className="data-body">
                            {
                                data.map(element=>{return(
                                    <tr className="data-row" key={element.id}>
                                    {Object.values(element).map(value=>{return(
                                        element.id != value ? <td key={value}>{value}</td> : null
                                )})}
                                        <td key='show'><button onClick={()=>navigate(`/Dashboard/${section}/${element.id}`)}>More</button></td>
                                        <td key='edit'><button onClick={()=>navigate(`${element.id}/Edit`)}>Edit</button></td>
                                        <td key='delete'>
                                            <button onClick={
                                                ()=>{
                                                    setDeleteTarget(element.id);
                                                    setDeleteChecker(true);
                                                }}>
                                                    Delete
                                            </button>
                                        </td>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </div>
            </>
            }
            {/* Could not find the needed data */}
            { (data.length === 0 && !isPending && !error) &&
            <>
                <h1>There are no {section}</h1>
            </>
            }
            {/* Got some errors */}
            { error &&
            <>
                <h1>{error}</h1>
            </>
            }
        </> 
    )
}
export default Index;