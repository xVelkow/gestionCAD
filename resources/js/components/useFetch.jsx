import { useEffect, useState } from "react"
import axios from "axios";

const useFetch = (method, request) =>{
    const [data,setData] = useState([]);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        switch(method){
            case 'GET':
                axios.get(`http://127.0.0.1:8000/api/${request}`)
                .then(response=>{
                    if(response.statusText !== "OK" || typeof(response.data) !== 'object'){
                        throw Error('Could not fetch data');
                    } 
                    return response.data;
                })
                .then(data=>{
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err=>{
                    console.log(err.message);
                    setError(err.message);
                    setIsPending(false);
                })
                break;
            case 'POST':
                console.log('posit');
                break;
            case 'DELETE':
                console.log('delete');
                break;
            default:
                console.log('none');
        }
    },[]);
    return {data,isPending,error};
}
export default useFetch;