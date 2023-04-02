import { Link } from "react-router-dom";


const Dashboard = () =>{
    return(
        <>
            <h1>Dashboard</h1>
            <ul>
                <li><Link to='/Dashboard/Members'>go to Members</Link></li>
                <li><Link to='/Dashboard/Sessions'>go to Sessions</Link></li>
                <li><Link to='/Dashboard/Plannings'>go to Plannings</Link></li>
                <li><Link to='/Dashboard/Posts'>go to Posts</Link></li>
            </ul>
        </>
    );
}
export default Dashboard;