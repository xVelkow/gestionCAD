const useEvent = (key, value) =>{
    localStorage.setItem(key,value);
    const event = new Event('token');
    window.dispatchEvent(event);
}
export default useEvent