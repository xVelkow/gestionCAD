import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Index from "./pages/Index";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Informations from "./pages/Informations";
import React, { useEffect } from "react";
import ChangePassword from "./pages/ChangePassword";
const Routing = () =>{
    const models = ['Members','Sessions','Plannings','Posts','Departments'];
    const navigate = useNavigate();
    useEffect(()=>{
        window.addEventListener('storage',()=>{
            sessionStorage.clear()
            navigate('/login')
        })
    })
    return(
        <>
            <Routes>
                <Route path='/Login' element={<Login />}/>
                { sessionStorage.getItem('token')
                && 
                <React.Fragment>
                    <Route path='/Dashboard' element={<Dashboard />} />
                    {sessionStorage.getItem('role') === 'super-admin' || 
                    <React.Fragment>
                        <Route path='/Informations' element={<Informations />} />
                        <Route path="/ChangePassword" element={<ChangePassword />} />
                    </React.Fragment>
                    }
                </React.Fragment>}
                {
                    (
                        sessionStorage.getItem('token')
                        &&
                        sessionStorage.getItem('department').toLocaleLowerCase() === 'communication'
                    ) &&
                    ['Departments','Members'].map(route=>{return(
                        <React.Fragment key={route}>
                            <Route key={`${route}-index`} path={`/Dashboard/${route}`} element={<Index section={route} />} />
                            <Route key={`${route}-show`} path={`/Dashboard/${route}/:id`} element={<Show section={route} />} />
                            <Route key={`${route}-create`} path={`/Dashboard/${route}/Create`} element={<Create section={route} />} />
                            <Route key={`${route}-edit`} path={`/Dashboard/${route}/:id/Edit`} element={<Edit section={route} />} />
                        </React.Fragment>
                    )})
                }
                {
                    (
                        sessionStorage.getItem('token')
                        &&
                        sessionStorage.getItem('department').toLocaleLowerCase() === 'social media'
                    ) &&
                        <React.Fragment>
                            <Route path={`/Dashboard/Posts`} element={<Index section='Posts' />} />
                            <Route path={`/Dashboard/Posts/:id`} element={<Show section='Posts' />} />
                            <Route path={`/Dashboard/Posts/Create`} element={<Create section='Posts' />} />
                            <Route path={`/Dashboard/Posts/:id/Edit`} element={<Edit section='Posts' />} />
                        </React.Fragment>
                }
                {
                    (
                        sessionStorage.getItem('token')
                        &&
                        ['president','super-admin'].includes(sessionStorage.getItem('role').toLocaleLowerCase())
                    ) &&
                    models.map(route=>{return(
                        <React.Fragment key={route}>
                            <Route key={`${route}-index`} path={`/Dashboard/${route}`} element={<Index section={route} />} />
                            <Route key={`${route}-show`} path={`/Dashboard/${route}/:id`} element={<Show section={route} />} />
                            <Route key={`${route}-create`} path={`/Dashboard/${route}/Create`} element={<Create section={route} />} />
                            <Route key={`${route}-edit`} path={`/Dashboard/${route}/:id/Edit`} element={<Edit section={route} />} />
                        </React.Fragment>
                    )})
                }
                {
                    (
                        sessionStorage.getItem('token')
                        &&
                        sessionStorage.getItem('role').toLocaleLowerCase() === 'vice-president'
                    ) &&
                    ['Members','Sessions','Posts','Departments'].map(route=>{return(
                        <React.Fragment key={route}>
                            <Route key={`${route}-index`} path={`/Dashboard/${route}`} element={<Index section={route} />} />
                            <Route key={`${route}-show`} path={`/Dashboard/${route}/:id`} element={<Show section={route} />} />
                            <Route key={`${route}-create`} path={`/Dashboard/${route}/Create`} element={<Create section={route} />} />
                            <Route key={`${route}-edit`} path={`/Dashboard/${route}/:id/Edit`} element={<Edit section={route} />} />
                        </React.Fragment>
                    )})
                }
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </>
    );
}
export default Routing;