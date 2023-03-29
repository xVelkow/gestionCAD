import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../components/useFetch";
import { useEffect, useState } from "react";
import useDestroy from "../../components/useDestroy";
const Show = ({section}) =>{
    const navigate = useNavigate();
    const {id} = useParams();
    const [deleteChecker,setDeleteChecker] = useState(false);
    const {data = {},isPending,error} = useFetch(`${section}/${id}`);
    
    // redirect when deleted
    useEffect(()=>{
        if(deleteChecker){
            navigate(`/Dashboard/${section}`);
        }
    },[deleteChecker])
    return(
        <>
            {isPending &&
                <>
                    <h1>Loading...</h1>
                </>
            }
            { (data.length !== 0 && !isPending) &&
                <>
                    <Link to={`/Dashboard/${section}`}>Go back</Link>
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
                                            <td key={element[1]}>{element[1]}</td>
                                        </tr>
                                    )})
                                }
                                </tbody>
                                <tfoot className="data-action">
                                    <tr className='data-row'>
                                        <td><button onClick={
                                                ()=>{
                                                    // setDeleteTarget(data.id);
                                                    setDeleteChecker(true);
                                                    useDestroy(section,data.id);
                                                }}>
                                                    Delete
                                            </button></td>
                                        <td><Link to={`Edit`} className='button edit-button'>edit</Link></td>
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