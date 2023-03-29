const useDestroy = (section,deleteTarget) =>{
    axios.delete(`/api/${section}/${deleteTarget}`)
    .then(response=>{
        if(response.statusText !== 'OK' || typeof(response.data) !== 'object'){
            throw Error('Could not delete the member');
        }
    })
    .catch(err=>{
        console.log(err.message)
    })
}
export default useDestroy;