import React, { useState } from 'react'
import styles from '../componentes/Buscador.module.css'
import { connect } from 'react-redux';
import { getRecipes } from '../store/actions/index'

function Buscador({ getRecipes }) {
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (q) => {
    setBusqueda(q)
  }


  function buscar(busqueda) {
    getRecipes(busqueda)
  }

  // useEffect(() => {
  //   async function cargar(busqueda) {

  //     await buscar(busqueda)
  //   }
  //   cargar(busqueda)
  // }, [busqueda])

  function handleSubmit(event) {
    event.preventDefault();
    buscar(busqueda)
  }

  return (
    <div className={styles.buscadorMain}>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div className={styles.searchBox}>
          <input
            type="text"
            // value={busqueda}
            placeholder="Busca una receta"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

      </form>
      <form onSubmit={(e) => handleSubmit(e)}>

        <button type="submit" >Buscar</button>
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    recipes: state.recetasBuscadas
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipes: busqueda => dispatch(getRecipes(busqueda))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);