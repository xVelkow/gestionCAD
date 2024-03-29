import axios from "axios";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import useFetch from '../hooks/useFetch';
import search from '../assets/search.svg';
import uploadImg from "../assets/upload.png"
import { saveAs, FileSaver } from "file-saver";
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
const [posts,setPosts] = useState([]);


useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/getM/${sess}`).then(({data})=>{
        setMembers(data.data.members);
        setDepartments(data.data.departments);
        setPlannings(data.data.planning);
        setPosts(data.data.posts);
        setChecked(false)
    }).catch(err=>console.log(err))
},[])
useEffect(()=>{
    if(checked){
        axios.get(`http://127.0.0.1:8000/api/getM/${sess}`).then(({data})=>{
            // setData(data.data)
            if(sess != "NONE"){
                setMembers(data.data.members.filter(member=>member.sessionMember == sess));
                setDepartments(data.data.departments.filter(department=>department.sessionDepartment == sess));
                setPlannings(data.data.planning.filter(planning=>planning.sessionPlanning == sess));
                setPosts(data.data.posts.filter(post=>post.sessionPost == sess));
            }else{
                setMembers(data.data.members);
        setDepartments(data.data.departments);
        setPlannings(data.data.planning);
        setPosts(data.data.posts);
            }
            
        }).catch(err=>console.log(err))
        setChecked(false)
    }
},[checked])
    return(
        <>
        <link rel="stylesheet" href="bootstrap.min.css"/>

            <NavBar />
            <nav className="tab">
                <ul>
                    <li id='departments' className={tab.departments && 'tab-item-on'} onClick={checkTab}>Departments</li>
                    <li id='posts' className={tab.posts && 'tab-item-on'} onClick={checkTab}>Posts</li>
                    <li id='members' className={tab.members && 'tab-item-on'} onClick={checkTab}>Members</li>
                    <li id='planning' className={tab.planning && 'tab-item-on'} onClick={checkTab}>Plannings</li>
                    <li style={{display: 'flex', gap: '.7em'}}>
                        <select name="" id="" onChange={(e)=>setSess(e.target.value)}>
                            <option value="NONE">Not Filtered</option>
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
                        (tab.posts && posts) &&
                        <div style={{display:'flex', flexWrap: 'wrap', gap: '1em', margin: '0 1em', paddingBottom: '1em'}}>
                        {posts.map(post=>{return(
                            <div className="card" style={{width: "14rem"}}>
                                <img className="card-img-top" src={`images/${post.imagePost}`} alt="Card image cap"/>
                                <div className="card-body">
                                    <h6 className="card-title">{post.titlePost}</h6>
                                    <p className="card-text" style={{fontSize:'.9rem'}}>{post.descriptionPost}</p>
                                </div>
                            </div>
                        )})}
                        </div>
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