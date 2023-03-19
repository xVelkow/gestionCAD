import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../components/useFetch";
const Show = () =>{
    const navigate = useNavigate();
    const {id} = useParams();
    const {data = [],isPending,error} = useFetch('GET',`Members/${id}`);
    // useEffect(()=>{
    // },[id,data])
    return(
        <>
            {isPending &&
                <>
                    <h1>Loading...</h1>
                </>
            }
            { (data.length !== 0 && !isPending) &&
                <>
                    <Link to='/Dashboard/Members'>Go back</Link>
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
                                    <tr className='data-row'>
                                        {true && <th>Cef</th>}
                                        {true && <td>{data.cefMember}</td>}
                                    </tr>
                                    <tr className='data-row'>
                                        <th>Full Name</th>
                                        <td>{data.fullNameMember}</td>
                                    </tr>
                                    <tr className='data-row'>
                                        <th>Group</th>
                                        <td>{data.groupMember}</td>
                                    </tr>
                                    <tr className='data-row'>
                                        <th>E-mail</th>
                                        <td>{data.emailMember}</td>
                                    </tr>
                                    <tr className='data-row'>
                                        <th>Department</th>
                                        <td>{data.departmentMember}</td>
                                    </tr>
                                    <tr className='data-row'>
                                        <th>Role</th>
                                        <td>{data.roleMember}</td>
                                    </tr>
                                </tbody>
                                <tfoot className="data-action">
                                    <tr className='data-row'>
                                        <td><Link className="button delete-button">delete</Link></td>
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