import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';
import settings from '../assets/settings.svg'
const NavBar = () =>{
    const navigate = useNavigate();
    return(
        <>
            <nav className="navBar">
                <div className="left">
                    <img 
                    src={logo}
                    style={
                        {
                            height: '100%',
                            width: '50pt',
                            cursor: 'pointer'
                        }
                    }
                    onClick={()=>navigate('/')}/>
                    <div className="separator"></div>
                    <h3
                        style={{cursor: 'pointer'}}
                        onClick={
                            ()=>{navigate('/Dashboard')}
                        }
                    >Dashboard</h3>
                </div>
                <ul className="ull">
                    {
                        (
                            sessionStorage.getItem('department').toLocaleLowerCase() === 'communication'
                            ||
                            ['president','super-admin','vice-president'].includes(sessionStorage.getItem('role').toLocaleLowerCase())
                        )
                        &&
                        <>
                            <li><Link to='/Dashboard/Members'>Member</Link></li>
                            <li><Link to='/Dashboard/Departments'>Department</Link></li>
                        </>
                    }
                    {
                        (
                            sessionStorage.getItem('department').toLocaleLowerCase() === 'social media'
                            ||
                            ['president','super-admin','vice-president'].includes(sessionStorage.getItem('role').toLocaleLowerCase())
                        )
                        &&
                        <li><Link to='/Dashboard/Posts'>Post</Link></li>
                    }
                    {
                        ['president','super-admin'].includes(sessionStorage.getItem('role').toLocaleLowerCase())
                        &&   
                        <li><Link to='/Dashboard/Plannings'>Planning</Link></li>
                    }
                    {
                        ['president','super-admin','vice-president'].includes(sessionStorage.getItem('role').toLocaleLowerCase())
                        &&
                            <li><Link to='/Dashboard/Sessions'>Session</Link></li>
                    }
                </ul>
                <div style={{display: 'flex', gap:'1.5em', alignItems: 'center'}}>
                    {sessionStorage.getItem('role') === 'super-admin' || <img 
                        src={settings} 
                        style={{width: '20pt', cursor: 'pointer'}}
                        onClick={()=>navigate('/Informations')}
                    />}
                    <button
                        onClick={
                            ()=>axios.post(
                                '/api/logout',
                                null,
                                {
                                    headers:
                                    {
                                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                                    }
                                }
                                ).then(()=>{
                                    sessionStorage.clear();
                                    navigate('/login');
                                })}
                    >Logout</button>
                </div>
            </nav>
        </>
    );
}
export default NavBar;