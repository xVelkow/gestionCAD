const useEvent = (key, value) =>{
    sessionStorage.setItem(key,value);
    const event = new Event('token');
    window.dispatchEvent(event);
}
export default useEvent