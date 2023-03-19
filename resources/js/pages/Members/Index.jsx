import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../components/useFetch";
import axios from "axios";

const Index = ({section}) =>{
    const [deleteTarget,setDeleteTarget] = useState(null);
    const [deleteChecker,setDeleteChecker] = useState(false);
    const {data = [],isPending,error} = useFetch('GET',section);
    const navigate = useNavigate();
    useEffect(()=>{
        if(deleteChecker){
            axios.delete(`http://127.0.0.1:8000/api/${section}/${deleteTarget}`)
            .then(response=>{
                if(response.statusText !== 'OK' || typeof(response.data) !== 'object'){
                    throw Error('Could not delete the member');
                }else{
                    switch(section){
                        case 'Members':
                            data.forEach((element,index) => {
                                element.cefMember === deleteTarget ?data.splice(index,1):null
                            });
                            break;
                        case 'Sessions':
                            //some code
                            break;
                        // the rest of cases
                    }
                    return response.data;
                }
            })
            .then(mydata=>{
                console.log(mydata.isGood);
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
                <Link to='/Dashboard' >Go to Dashboard</Link>
                <div className="container">
                    <table className="data-wrapper">
                        <thead className="data-header">
                            {/* Header columns for members */}
                            { section === 'Members' && 
                                <tr className="data-row">
                                    <th>Full Name</th>
                                    <th>Department</th>
                                    <th>Role</th>
                                    <th colSpan='3' className="data-action">Actions</th>
                                </tr>
                            }
                            {/* Header columns for Sessions */}
                            { section === 'Sessions' && 
                                <tr className="data-row">
                                    <th>Session</th>
                                    <th colSpan='3' className="data-action">Actions</th>
                                </tr>
                            }
                        </thead>
                        <tbody className="data-body">
                            {/* Members body : 71-93 */}
                            { section === 'Members' &&
                                data.map(member=>{return(
                                    <tr className="data-row" key={member.cefMember}>
                                        <td>{member.fullNameMember}</td>
                                        <td>{member.departmentMember}</td>
                                        <td>{member.roleMember}</td>
                                        <td><button onClick={()=>navigate(`/Dashboard/Members/${member.cefMember}`)}>More</button></td>
                                        <td><button onClick={()=>navigate(`${member.cefMember}/Edit`)}>Edit</button></td>
                                        <td>
                                            <button onClick={
                                                ()=>{
                                                    setDeleteTarget(member.cefMember);
                                                    setDeleteChecker(true);
                                                }
                                            }>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )})
                            }
                            {/* End of members body : 71-93 */}
                            {/* Sessions body 98-118 */}
                            { section === 'Sessions' &&
                                data.map(session=>{return(
                                    <tr className="data-row" key={session.idSession}>
                                        <td>{session.nameSession}</td>
                                        <td><button onClick={()=>navigate(`/Dashboard/Members/${session.idSession}`)}>More</button></td>
                                        <td><button onClick={()=>navigate(`${session.idSession}/Edit`)}>Edit</button></td>
                                        <td>
                                            <button onClick={
                                                ()=>{
                                                    setDeleteTarget(session.idSession);
                                                    setDeleteChecker(true);
                                                }
                                            }>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )})
                            }
                            {/* End of sessions body 98-118 */}
                        </tbody>
                    </table>
                </div>
            </>}

            {/* Could not find the needed data */}
            { (data.length === 0 && !isPending) &&
            <>
                <h1>There is no {section}</h1>
            </>
            }
        </> 
    )
}
export default Index;