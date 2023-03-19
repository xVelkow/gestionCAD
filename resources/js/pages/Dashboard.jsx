import { Link } from "react-router-dom";


const Dashboard = () =>{
    return(
        <>
            <h1>Dashboard</h1>
            <Link to='/Dashboard/Members'>go to Members</Link>
        </>
    );
}
export default Dashboard;