import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Index from "./pages/Index";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import React, { useEffect } from "react";
const Routing = () =>{
    const models = ['Members','Sessions','Plannings','Posts','Departments'];
    const navigate = useNavigate();
    useEffect(()=>{
        window.addEventListener('storage',()=>{
            localStorage.clear()
            navigate('/login')
        })
    })
    return(
        <>
            <Routes>
                <Route path='/Login' element={<Login />}/>
                { localStorage.getItem('token') && <Route path='/Dashboard' element={<Dashboard />} />}
                {
                    localStorage.getItem('token') &&
                    models.map(route=>{return(
                        <React.Fragment key={`${route}`}>
                            <Route key={`${route}-index`} path={`Dashboard/${route}`} element={<Index section={route} />} />
                            <Route key={`${route}-show`} path={`Dashboard/${route}/:id`} element={<Show section={route} />} />
                            <Route key={`${route}-create`} path={`Dashboard/${route}/Create`} element={<Create section={route} />} />
                            <Route key={`${route}-edit`} path={`Dashboard/${route}/:id/Edit`} element={<Edit section={route} />} />
                        </React.Fragment>
                    )})
                }
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </>
    );
}
export default Routing;