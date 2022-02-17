import React from 'react'
import styles from '../componentes/Nav.module.css'

function nav() {
    return (
        <div>
           
            <ul className={styles.nav}>
                <li>
                    <a href='/main'>
                        Home
                    </a>
                </li>
              
                <li><a href="/createrecipe">Create Recipe</a></li>
            </ul>   
        </div>
    )
}

export default (nav)