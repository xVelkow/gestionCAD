import reda from '../assets/reda.jfif'
import imad from '../assets/imad.jfif'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
const Landing = () =>{
    const navigate = useNavigate();
    return(
    <div style={{}}>
        <img src={logo} width={'75pt'} style={{position: 'absolute', top: 0, left: 0, margin: '1em 2em'}} />
        <button style={{position: 'absolute', right: 0, top: 0, margin: '1em 2em 0 0', backgroundColor: '#407bff', border: 'none', padding: '.4em 1.2em', color: 'white', borderRadius: '4px'}}
            onClick={()=>navigate('/login')}
        >Login</button>
        <center style={{margin: '3em 0'}}><h1 style={{fontWeight: 700}}>GestionCAD</h1></center>
        <div style={{display: 'flex',gap: '3em', justifyContent: 'center',alignItems: 'center',height: '65vh'}}>
            <div class="card" style={{width: "18rem"}}>
                <img class="card-img-top" src={reda} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Reda MAKTOUM</h5>
                    <p class="card-text"><strong>Group : </strong>DEVOWFS202</p>
                    <a target='_blank' href="https://www.linkedin.com/in/reda-maktoum/" class="btn btn-primary">Profile</a>
                </div>
            </div>

            <div class="card" style={{width: "18rem"}}>
                <img class="card-img-top" src={imad} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">Imad GUIDOUH</h5>
                    <p class="card-text"><strong>Group : </strong>DEVOWFS202</p>
                    <a target='_blank' href="https://www.linkedin.com/in/imad-guidouh-306724235/" class="btn btn-primary">Profile</a>
                </div>
            </div>
        </div>

    </div>
    )
}
export default Landing;