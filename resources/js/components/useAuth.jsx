import axios from "axios";

const useAuth = async (data) =>{
    const formData = await new FormData();
    await formData.append('email',data.email);
    await formData.append('password',data.password);
    const response = await axios.post('api/Login',formData);
    console.log(response.data);
}
export default useAuth;