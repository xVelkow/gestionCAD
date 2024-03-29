import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDestroy from "../hooks/useDestroy";
import NavBar from "../components/NavBar";
import deleteSvg from '../assets/delete.png';
import editSvg from '../assets/edit.svg';
import showSvg from '../assets/show.png';
import notfound from "../assets/404.svg";
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
                                                style={{cursor: 'pointer'}}
                                                width={'20pt'}
                                                onClick={()=>navigate(`/Dashboard/${section}/${element.id}`)}/>
                                        </center></td>
                                        <td key='edit'><center>
                                            <img
                                                src={editSvg}
                                                style={{cursor: 'pointer'}}
                                                width={'20pt'}
                                                onClick={()=>navigate(`${element.id}/Edit`)}
                                            /></center>
                                        </td>
                                        <td key='delete'><center>
                                            <img
                                                src={deleteSvg}
                                                style={{cursor: 'pointer'}}
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
            <div
                style={{
                    display:"flex",
                    justifyContent:"center",
                    marginTop: "3em"
                }}
            >
                
                <div style={{
                    height:"23em",
                    display:"flex",
                    flexDirection: "column",
                    justifyContent:"center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: "30em",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                }}>
                    <h1
                        style={{color: "#407bff"}}
                    >There are no {section}</h1>
                    <img src={notfound} width={'200pt'} alt="" />
                    <button
                        style={{
                            marginLeft: ".4em",
                            padding: ".8em 1.6em",
                            border: "none",
                            backgroundColor: "#407bff",
                            color: "#fff",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                        onClick={()=>navigate('create')}
                    >Create new {section}</button>
                </div>
            </div>
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