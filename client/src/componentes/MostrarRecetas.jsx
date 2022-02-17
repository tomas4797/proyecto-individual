import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../componentes/MostrarRecetas.module.css";
import { connect } from "react-redux";
import { getRecipes } from "../store/actions/index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";



function MostrarRecetas({ recipes, filteredRecipes, getRecipes }) {
  const renderRecipes = (ARRAYRECETAS) => {
    if (!Array.isArray(ARRAYRECETAS)) {
      return <h1>No Existe la receta</h1>;
    } else {
      return (
        <div className={styles.divMain}>
          {ARRAYRECETAS?.map((recipe) => {
            return (
              <div key = { recipe.id } className={styles.divCentral}>
                <div className={styles.divCard}>
                  <Link className={styles.link} to={`/recipe/${recipe.id}`}>
                    <div className={styles.name}>{recipe.name}</div>
                  </Link>

                  <img
                    src={recipe.img? recipe.img : recipe.image}
                    
                    alt="Imágen no encontrada"
                    className={styles.cardImg}
                  />

                  <h5>Diet Types</h5>

                  {/* {recipe.diets
                    ? recipe.diets?.map((recipe,i) => {
                        return <p Key={`${i}-1`}>{recipe}</p>;
                      })
                    : recipe.types?.map((r,i) => {
                        return <p Key={`${i}-2`}>{r.name}</p>;
                      })} */}

                     <p> {recipe.diets?.join(" ")}</p>

                </div>
              </div>
            );
          }).slice(currentPage, currentPage + 9)}
        </div>
      );
    }
  };

  const [currentPage, setcurrentPage] = useState(0);
  const nextPage = () => {
    setcurrentPage(currentPage + 9);
  };
  const prevPage = () => {
    if (currentPage > 0) setcurrentPage(currentPage - 9);
  };

  const numberPage = currentPage / 9 + 1;
// eslint-disable-next-line
  function getRecipesFunction() {
    getRecipes();
  }

  useEffect(() => {
    getRecipesFunction();
  }, []);

  //   const filteredRecipes = useSelector((state) => state.filteredRecipes);

  return (
    <div >
      {filteredRecipes?.length > 0
        ? renderRecipes(filteredRecipes)
        : renderRecipes(recipes)}

      <div className={styles.pagination}>
        <li onClick={prevPage}>Prev</li>
        <p className={styles.pdepaginado}>{numberPage}</p>

        <li onClick={nextPage}>Next</li>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    filteredRecipes: state.filteredRecipes,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    getRecipes: (recipe) => {
      dispatch(getRecipes(recipe));
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(MostrarRecetas);


