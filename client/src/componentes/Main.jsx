import React from "react"
import MostrarRecetas from '../componentes/MostrarRecetas';
import Nav from '../componentes/Nav';
import Buscador from '../componentes/Buscador';
import Filter from '../componentes/Filter';
import styles from '../componentes/Main.module.css';




export default function Main (){
    return (
        <div className={styles.divMain}>
            <nav className={styles.nav}>
                <Nav/>
            </nav>
            <div className={styles.buscador}>
                <Buscador/>
            </div>
            {console.log ("entre a main")}
            <br />
            <Filter/>
            <br />
            <div className={styles.main}>
                <MostrarRecetas/>
            </div>

        </div>
    )
}

