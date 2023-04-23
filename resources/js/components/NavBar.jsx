import { Link, useNavigate } from "react-router-dom";
const NavBar = () =>{
    const navigate = useNavigate();
    return(
        <>
            <nav>
                <h3
                    style={{cursor: 'pointer'}}
                    onClick={
                        ()=>{navigate('/Dashboard')}
                    }
                >Dashboard</h3>
                <ul>
                    <li><Link to='/Dashboard/Members'>Member</Link></li>
                    <li><Link to='/Dashboard/Sessions'>Session</Link></li>
                    <li><Link to='/Dashboard/Posts'>Post</Link></li>
                    <li><Link to='/Dashboard/Departments'>Department</Link></li>
                    <li><Link to='/Dashboard/Meetings'>Meeting</Link></li>
                    <li><Link to='/Dashboard/Plannings'>Planning</Link></li>
                </ul>
                <button
                    onClick={
                        ()=>axios.post(
                            '/api/logout',
                            null,
                            {
                                headers:
                                {
                                    Authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            }
                            ).then(()=>{
                                localStorage.clear();
                                navigate('/login');
                            })}
                >Logout</button>
            </nav>
        </>
    );
}
export default NavBar;