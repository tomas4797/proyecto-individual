import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../componentes/MostrarRecetas.module.css";
import { connect } from "react-redux";
import { getRecipes } from "../store/actions/index";
import { Link } from "react-router-dom";

function MostrarRecetas({ recipes, filteredRecipes, getRecipes }) {
  const renderRecipes = (ARRAYRECETAS) => {
    if (!Array.isArray(ARRAYRECETAS)) {
      return <h1>No Existe la receta</h1>;
    } else {
      return (
        <div className={styles.divMain}>
          {ARRAYRECETAS?.map((recipe) => {
            return (
              <div className={styles.divCentral}>
                <div className={styles.divCard}>
                  <Link className={styles.link} to={`/recipe/${recipe.id}`}>
                    <div className={styles.titles}>{recipe.title}</div>
                  </Link>

                  <img
                    src={recipe.image}
                    alt="Imágen no encontrada"
                    className={styles.cardImg}
                  />

                  <h5>Diet Types</h5>

                  {recipe.diets
                    ? recipe.diets?.map((recipe) => {
                        return <p>{recipe}</p>;
                      })
                    : recipe.types?.map((r) => {
                        return <p>{r.name}</p>;
                      })}
                </div>
              </div>
            );
          }).slice(currentPage, currentPage + 10)}
        </div>
      );
    }
  };

  const [currentPage, setcurrentPage] = useState(0);
  const nextPage = () => {
    setcurrentPage(currentPage + 10);
  };
  const prevPage = () => {
    if (currentPage > 0) setcurrentPage(currentPage - 10);
  };

  const numberPage = currentPage / 10 + 1;
// eslint-disable-next-line
  function getRecipesFunction() {
    getRecipes();
  }

  useEffect(() => {
    getRecipesFunction();
  }, [getRecipesFunction]);

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
