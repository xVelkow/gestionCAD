import n404 from '../assets/404.svg'
const NotFound = () =>{
    const style = {
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
    }
    return(
        <div style={style}>
            <h1 style={{color: '#407bff'}}>Oups... Are you lost?</h1>
            <img src={n404} style={{width: '250pt'}} alt="" />
            <a href="/" style={{color: '#407bff', fontWeight: 500, textDecoration: 'none'}}>Go back home</a>
        </div>
    );
}
export default NotFound;