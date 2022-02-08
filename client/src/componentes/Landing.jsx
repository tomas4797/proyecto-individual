import { React } from 'react'
import { link } from 'react-router-dom';


export default function LandingPage(){
      return(
        <div>
            <h1>Welcome to henry food app</h1>
            <link to = '/home'>
                <button>Ingresar</button>
            </link>
        </div>

      )

}