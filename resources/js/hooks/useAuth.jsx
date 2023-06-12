import axios from "axios";
import useEvent from "./useEvent";
import { useState } from "react";

const useAuth = (data) =>{
    // const [endStatus, setEndStatus] = useState(false)
    let endStatus = false;
    axios.get('/sanctum/csrf-cookie').then(async () => {
        const formData = await new FormData();
        await formData.append('email',data.email);
        await formData.append('password',data.password);
        const response = await axios.post('/api/login',formData);
        if(response.data){
            response.data && useEvent('token',response.data.token);
            response.data && sessionStorage.setItem('department',response.data.user.departmentMember.toLocaleLowerCase());
            response.data && sessionStorage.setItem('role',response.data.user.roleMember.toLocaleLowerCase());
            response.data && sessionStorage.setItem('id',response.data.user.id);
        }else{
            alert("Credentials incorrect");
        }
    });
}
export default useAuth;