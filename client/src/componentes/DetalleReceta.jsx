import React, { useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getID } from '../store/actions/index'
import parse from 'html-react-parser';
import styles from '../componentes/DetalleReceta.module.css';
import Nav from '../componentes/Nav'

function DetalleReceta({ recipeDetail, getID, match }) {
    console.log (match)

    const { id } = useParams()
    // let dietas = recipeDetail.types
    // console.log("asdasdksadsaldjsaljalsd", dietas)
// eslint-disable-next-line
    function getIDFunction(id) {
        getID(id)
    }

    useEffect(() => {
        // getIDFunction(id)
        getID(id)
    }, [id])


    if (typeof recipeDetail.id === "number") {
        return (
            <div className={styles.divPrincipal}>
                {console.log(recipeDetail)}
                <div className={styles.nav}>
                    <Nav />
                </div>
                <div className={styles.divMain}>
                    <div className={styles.name}>
                        <p>{recipeDetail.name}</p>
                    </div>
                    <br />
                    <br />
                    <div className={styles.img}>

                        <img src={recipeDetail.image} alt="Imagen no encontrada" />
                    </div>
                    <br />
                    <br />
                    <p>Score</p>
                    <div className={styles.score}>{recipeDetail.score}</div>
                    <br />
                    <br />
                    <p>Health Score</p>
                    <div className={styles.healthScore}>{recipeDetail.healthScore}</div>
                    <br />
                    <br />
                    <p>DIET TYPES</p>
                    <p>{recipeDetail.diets.join(" ")}</p>
                
                    {/* {recipeDetail.diets && recipeDetail.diets.map(recipe => {
                        
                        return <p>{recipe}</p>
                    })} */}
                    <br />
                    <br />
                    <p>DISH TYPES</p>
                    <p>{recipeDetail.dishTypes.join(" ")}</p>
                    {/* {recipeDetail.dishTypes && recipeDetail.dishTypes.map(plato => {
                        return <p>{plato}</p>
                    })} */}
                    <br />
                    <br />
                    <p>SUMMARY</p>
                    <br />
                    <div className={styles.summary}>
                        <div>
                            {recipeDetail.summary && parse(recipeDetail.summary)}
                        </div>
                    </div>
                    <br />
                    <br />
                    <p>INSTRUCTIONS</p>
                    <br />
                    <div className={styles.instructions}>
                        <div>
                            {recipeDetail.instructions && parse(recipeDetail.instructions)}
                        </div>
                    </div>

                </div>
            </div>
        ) 
    } else {
        return (
            <div className={styles.divPrincipal}>
                {console.log(recipeDetail, "asdadsasdasdasdasd")}
                <div className={styles.nav}>
                    <Nav />
                </div>
                <div className={styles.divMain}>
                    <div className={styles.name}>
                        <p>{recipeDetail.name}</p>
                    </div>
                    <br />
                    <br />
                    <div className={styles.imgg}>

                        <img src={recipeDetail.image } alt="Imagen no encontrada" />
                    </div>
                    <br />
                    <br />
                    <p>Score</p>
                    <div className={styles.score}>{recipeDetail.score}</div>
                    <br />
                    <br />
                    <p>Health Score</p>
                    <div className={styles.healthScore}>{recipeDetail.healthScore}</div>
                    <br />
                    <br />
                    <p>DIET TYPES</p>
                    
                    {/* {console.log(recipeDetail)} */}
                    {recipeDetail.types && recipeDetail.types.map((recipe,i) => {
                        return <p key = {i}>{recipe}</p>
                    })}
                    <br />
                    <br />
                    <br />
                    <br />
                    <p>SUMMARY</p>
                    <br />
                    <div className={styles.summary}>
                        <p>
                            {recipeDetail.summary && parse(recipeDetail.summary)}
                        </p>
                    </div>
                    <br />
                    <br />
                    <p>INSTRUCTIONS</p>
                    <br />
                    <div className={styles.instructions}>
                        <p>

                            {recipeDetail.steps && parse(recipeDetail.steps)}
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        recipeDetail: state.recipeDetail,
        

    }
}
const mapDispatchtoProps = dispatch => {
    return {
        getID: id => {
            dispatch(getID(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(DetalleReceta)