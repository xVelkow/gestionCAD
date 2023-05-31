import axios from "axios";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import useFetch from '../hooks/useFetch';
import search from '../assets/search.svg';
const Dashboard = () =>{
    const [checked, setChecked] = useState(false);
    const [sess,setSess] = useState()
    const [tab,setTab] = useState({
        departments: true,
        posts: false,
        members: false,
        planning: false,

})

const checkTab = (e) =>{
    setTab({
        departments: false,
        posts: false,
        members: false,
        planning: false,
        [e.target.id]: true
    })
}
const {data: sessions, isPending, error} = useFetch('Sessions')


// const [data,setData] = useState({});

const [members,setMembers] = useState([]);
const [departments,setDepartments] = useState([]);
const [plannings,setPlannings] = useState([]);
useEffect(()=>{
    if(checked){
        axios.get(`http://127.0.0.1:8000/api/getM/${sess}`).then(({data})=>{
            // setData(data.data)
            setMembers(data.data.members.filter(member=>member.sessionMember == sess));
            setDepartments(data.data.departments.filter(department=>department.sessionDepartment == sess));
            setPlannings(data.data.planning.filter(planning=>planning.sessionPlanning == sess));
        }).catch(err=>console.log(err))
        setChecked(false)
    }
},[checked])
    return(
        <>
            <NavBar />
            <nav className="tab">
                <ul>
                    <li id='departments' className={tab.departments && 'tab-item-on'} onClick={checkTab}>Departments</li>
                    <li id='posts' className={tab.posts && 'tab-item-on'} onClick={checkTab}>Posts</li>
                    <li id='members' className={tab.members && 'tab-item-on'} onClick={checkTab}>Members</li>
                    <li id='planning' className={tab.planning && 'tab-item-on'} onClick={checkTab}>Plannings</li>
                    <li style={{display: 'flex', gap: '.7em'}}>
                        <select name="" id="" onChange={(e)=>setSess(e.target.value)}>
                            <option value="">Choose a session</option>
                            {sessions.map(session=><option>{session.refSession}</option>)}
                        </select>
                        <img src={search} width={'25pt'} onClick={()=>setChecked(true)}/>
                        </li>
                    
                </ul>
                <div>
                    {
                        (tab.departments && departments) &&
                        <div style={{display: 'flex', gap: '2em', flexWrap: 'wrap', padding: '0 1em', paddingBottom: '1em', boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)"}}>
                        {departments.map(department=>{return(
                            <div className="card" style={{width: '18em'}}>
                                <div class="card-body">
                                <h5 class="card-title">{department.nameDepartment}</h5>
                                <p class="card-text">{department.descriptionDepartment}</p>
                            </div>
                        </div>
                        )})}
                        </div>
                    }
                    {
                        tab.posts &&
                        <h1>posts</h1>
                    }
                    {
                        (tab.members && members) &&
                        <div style={{display: 'flex', gap: '2em', flexWrap: 'wrap', padding: '0 1em', paddingBottom: '1em', boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)"}}>
                        {members.map(member=>{return(
                            member.id != 0 &&
                            <div className="card" style={{width: '18em'}}>
                                <div class="card-body">
                                    <h5 class="card-title">{member.fullNameMember}</h5>
                                    <p class="">{member.email}</p>
                                    <p class="">Department : <span className="h6">{member.departmentMember}</span></p>
                                </div>
                            </div>
                        )})}
                        </div>
                    }
                    {
                        (tab.planning && plannings) &&
                        <div style={{display: 'flex', gap: '2em', flexWrap: 'wrap', padding: '0 1em', paddingBottom: '1em', boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)"}}>
                        {plannings.map(planning=>{return(
                            <div className="card" style={{width: '18em'}}>
                                <div class="card-body">
                                    <h5 class="card-title">{planning.titlePlanning}</h5>
                                    <p class="">{planning.descriptionPlanning}</p>
                                </div>
                            </div>
                        )})}
                        </div>
                    }
                </div>
            </nav>  
        </>
    );
}
export default Dashboard;