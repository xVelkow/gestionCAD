import axios from "axios";
import useEvent from "./useEvent";

const useAuth = (data) =>{
    axios.get('/sanctum/csrf-cookie').then(async () => {
        const formData = await new FormData();
        await formData.append('email',data.email);
        await formData.append('password',data.password);
        const response = await axios.post('/api/login',formData);
        response.data && useEvent('token',response.data.token)
    });
}
export default useAuth;