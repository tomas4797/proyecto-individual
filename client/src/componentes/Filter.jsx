import React, { useEffect } from "react";
import {
  getRecipes,
  sortRecipe,
  getDiets,
  filterBy,
  SortBy,
  filter,
} from "../store/actions/index";
import { connect } from "react-redux";
import styles from "../componentes/Filter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function Filter(props) {
  const dispatch = useDispatch();

  //obtenemos todos los tipos de dieta
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // los llevamos a una constante
  const diets = useSelector((state) => state.diets);
  const recipes = useSelector((state) => state.recipes);

  let [selectedDiet, setSelectedDiet] = useState("");

  let [dietToFilterBy, setDietToFilterBy] = useState([]);

  function handleClick() {
    let filteredRecipes = [];
    recipes?.forEach((r) => {
      if (r.id.length > 6) {
        r.diets.map((d) =>
          d.name === selectedDiet ? filteredRecipes.push(r) : null
        );
      } else {
        if (r.diets.includes(selectedDiet)) {
          filteredRecipes.push(r);
        } else {
          return null;
        }
      }
    });

    dispatch(filter(filteredRecipes));
  }

  function handleChangeDiet(e) {
    setSelectedDiet(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDietToFilterBy([...dietToFilterBy, selectedDiet]);
    handleClick();
  }

  const handleSelect = (e) => {
    e.preventDefault();
    props.sortRecipe(e.target.value);
  };

  const handleMax = (e) => {
    e.preventDefault();
    props.SortBy(e.target.value);
  };
// eslint-disable-next-line
  function getDietsFunction() {
    props.getDiets();
  }

  useEffect(() => {
    getDietsFunction();
  }, []);

  return (
    <div className={styles.selects}>
      <div>
        <select
          className={styles.option}
          id="alfabetico"
          onChange={(e) => handleSelect(e)}
        >
          <option className={styles.option} value="ascendente">
            A-Z
          </option>
          <option className={styles.option} value="descendente">
            Z-A
          </option>
        </select>
      </div>
      <div>
        <select
          className={styles.option}
          id="min"
          onChange={(e) => handleMax(e)}
        >
          <option className={styles.option} value="min to max">
            Lower scores first
          </option>
          <option className={styles.option} value="max to min">
            Higher scores first
          </option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
      <div>
        <select
          className={styles.option}
          onChange={handleChangeDiet}
          name="diets"
          value={selectedDiet}
        >
          <option>All</option>
          {diets.map((e) => (
            <option value={e.name} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <button className={styles.buscadorMain} type="submit">
          Filtrar
        </button>
      </div>
      
      </form>
      
    </div>
  );
}

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    diets: state.diets,
    filtrados: state.filtrados,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipes: (title) => dispatch(getRecipes(title)),
    sortRecipe: (string) => dispatch(sortRecipe(string)),
    getDiets: () => dispatch(getDiets()),
    filterBy: (string) => dispatch(filterBy(string)),
    SortBy: (string) => dispatch(SortBy(string)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

