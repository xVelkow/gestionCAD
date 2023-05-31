import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDestroy from "../hooks/useDestroy";
import NavBar from "../components/NavBar";
import deleteSvg from '../assets/delete.png';
import editSvg from '../assets/edit.svg';
import showSvg from '../assets/show.png';
const Index = ({section}) =>{
    const [deleteTarget,setDeleteTarget] = useState(null);
    const [deleteChecker,setDeleteChecker] = useState(false);
    const {data = {}, isPending, error} = useFetch(section);
    const navigate = useNavigate();

    // reloading data
    useEffect(()=>{
        if(deleteChecker){
            data.forEach((element,index)=> element.id === deleteTarget ? data.splice(index,1) : null);
            setDeleteChecker(false);
        }
    },[deleteChecker])
    return(
        <>
        <NavBar />

            {/* Waiting for the response */}
            { isPending &&
                <div className="loader">
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            }
            {/* Response ready */}
            { (data.length > 0 && !isPending) &&
            <>
                <div className="container">
                    <table className="data-wrapper">
                        <thead className="data-header">
                            <tr className="data-row">
                                <th colSpan={6} style={{textAlign: 'center'}}><Link to='Create' style={{textDecoration: 'none', color: 'white'}}>&gt; Create new {section} &lt;</Link></th>
                            </tr>
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
                                        <td key='show'><center>
                                            <img
                                                src={showSvg}
                                                width={'20pt'}
                                                onClick={()=>navigate(`/Dashboard/${section}/${element.id}`)}/>
                                        </center></td>
                                        <td key='edit'><center>
                                            <img
                                                src={editSvg}
                                                width={'20pt'}
                                                onClick={()=>navigate(`${element.id}/Edit`)}
                                            /></center>
                                        </td>
                                        <td key='delete'><center>
                                            <img
                                                src={deleteSvg}
                                                width={'25pt'}
                                                onClick={
                                                ()=>{
                                                    setDeleteTarget(element.id);
                                                    setDeleteChecker(true);
                                                    useDestroy(section,element.id);
                                                }}
                                            /></center>
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