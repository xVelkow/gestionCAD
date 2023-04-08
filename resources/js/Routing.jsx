import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Members/Create";
import Index from "./pages/Members/Index";
import Show from "./pages/Members/Show";
import Edit from "./pages/Members/Edit";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import React from "react";
const Routing = () =>{
    const models = ['Members','Sessions','Plannings','Posts','Departments'];
    return(
        <>
            <Routes>
                <Route path='/Login' element={<Login />} />
                <Route path='/Dashboard' element={<Dashboard />} />
                {
                    models.map(route=>{return(
                        <React.Fragment key={`${route}`}>
                            <Route key={`${route}-index`} path={`/Dashboard/${route}`} element={<Index section={route} />} />
                            <Route key={`${route}-show`} path={`/Dashboard/${route}/:id`} element={<Show section={route} />} />
                            <Route key={`${route}-create`} path={`/Dashboard/${route}/Create`} element={<Create section={route} />} />
                            <Route key={`${route}-edit`} path={`Dashboard/${route}/:id/Edit`} element={<Edit section={route} />} />
                        </React.Fragment>
                    )})
                }
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}
export default Routing;