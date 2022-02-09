import { React } from 'react'
import { Link } from 'react-router-dom';


export default function LandingPage(){
      return(
        <div>
        
            <h1>Bienvenido a las recetas de henry</h1>
            <Link to = '/Main'>
                <button>Ingresar</button>
            </Link>
        </div>

      )

}