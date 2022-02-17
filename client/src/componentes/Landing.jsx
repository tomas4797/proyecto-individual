import { React } from 'react'
import styles from '../componentes/Landing.module.css'


export default function Landing() {

  return (
      <div className={styles.divMain}>
          <div className={styles.card}>
              {console.log ("Landing")}
              <h1>Bienvenido a las Recetas de Henry</h1>
          <a href="/Main" className={styles.btnStart}>
                  start
              </a>
          </div>
      </div>
  )
}
              

             
