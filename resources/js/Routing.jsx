import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Members/Create";
import Index from "./pages/Members/Index";
import Show from "./pages/Members/Show";
import Edit from "./pages/Members/Edit";
import NotFound from "./pages/NotFound";
const Routing = () =>{
    return(
        <>
            <Routes>
                <Route path='/Dashboard' element={<Dashboard />} />
                <Route path='/Dashboard/Members' element={<Index section='Members' />} />
                <Route path='/Dashboard/Members/:id' element={<Show section='Members' />} />
                <Route path='/Dashboard/Members/Create' element={<Create section='Members' />} />
                <Route path='/Dashboard/Members/:id/Edit' element={<Edit section='Members' />} />

                <Route path='/Dashboard/Sessions' element={<Index section='Sessions' />} />
                <Route path='/Dashboard/Sessions/:id' element={<Show section='Sessions' />} />
                <Route path='/Dashboard/Sessions/Create' element={<Create section='Sessions' />} />
                <Route path='/Dashboard/Sessions/:id/Edit' element={<Edit section='Sessions' />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}
export default Routing;