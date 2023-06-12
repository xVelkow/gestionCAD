import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import useDestroy from "../hooks/useDestroy";
import NavBar from "../components/NavBar";
import deleteImg from "../assets/delete.png"
import editImg from "../assets/edit.svg"

const Show = ({section}) =>{
    const navigate = useNavigate();
    const {id} = useParams();
    const [deleteChecker,setDeleteChecker] = useState(false);
    const {data = {},isPending,error} = useFetch(`${section}/${id}`);
    
    useEffect(()=>{
		(!isPending && !error && data.length === 0) && navigate(`/Dashboard/${section}`)
	},[isPending])

    // redirect when deleted
    useEffect(()=>{
        if(deleteChecker){
            navigate(`/Dashboard/${section}`);
        }
    },[deleteChecker])
    return(
        <>
        <NavBar />
        { isPending &&
            <div className="loader" >
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        }
            { (data.length !== 0 && !isPending) &&
                <>
                    <div className="table-holder">
                        <div className="container">
                            <table className="data-wrapper">
                                <thead className="data-header">
                                    <tr className='data-row'>
                                        <th>Category</th>
                                        <th>Information</th>
                                    </tr>
                                </thead>
                                <tbody className="data-body">
                                {
                                    Object.entries(data).map(element=>{return(
                                        <tr className='data-row' key={`${element[0]}-${element[1]}`}>
                                            <th key={element[0]}>{element[0]}</th>
                                            {element[0] === "imagePost" 
                                            ? <td><center><img src={`/images/${element[1]}`} width={'150pt'} /></center></td>
                                            : <td key={element[1]}>{element[1]}</td>}
                                        </tr>
                                    )})
                                }
                                </tbody>
                                <tfoot className="data-action">
                                    <tr className='data-row'>
                                        <td><img 
                                                src={deleteImg}
                                                width={'25pt'}
                                                style={{cursor:'pointer'}}
                                                onClick={
                                                ()=>{
                                                    setDeleteChecker(true);
                                                    useDestroy(section,data.id);
                                                }}/></td>
                                        <td><Link to={`Edit`} className='button edit-button'><img src={editImg} width={'20pt'}/></Link></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </>
            }
        </> 
    );
}
export default Show;