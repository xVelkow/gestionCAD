import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
const Routing = () =>{
    return(
        <>
            <Routes>
                <Route path='/Dashboard' element={<Dashboard />} />
            </Routes>
        </>
    );
}
export default Routing;