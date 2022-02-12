import axios from "axios";

export function getRecipes(query) {
  return function (dispatch) {
    if (!query) {
      return axios.get("/recipes").then((response) => {
        console.log (response.data,"AAAAAAAAAAAAAAAAAAAAAAAAAA IF")
        dispatch({
          type: "GET_RECIPES",
          payload: response.data.results, 
        });
      });
    } else {
      return axios
        .get("/recipes?query=" + query)
        .then((response) => {
          console.log (response.data,"AAAAAAAAAAAAAAAAAAAAAAAAAA ELSE")
          
          dispatch({
            type: "GET_RECIPES",
            payload: response.data, 
          });
        });
    }
  };
}

export function getID(id) {
  return function (dispatch) {
    return axios.get(`/recipes/` + id).then((response) => {
      
      dispatch({
        type: "GET_ID",
        payload: response.data,
      });
    });
  };
}

export function getDiets() {
  return function (dispatch) {
    return axios.get("/types").then((receta) => {
      dispatch({ type: "GET_TYPES", payload: receta.data });
    });
  };
}

export function submit(input) {
  return function (dispatch) {
    return fetch("/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(input),
    }).then((response) => {
      dispatch({
        type: "SUBMIT",
        payload: response.data,
      });
    });
  };
}

export function sortRecipe(payload) {
  //action que ordena
  return {
    type: "SORT_BY",
    payload: payload, //ascendente o desc
  };
}

export function filterBy(payload) {
  //action que ordena
  return {
    type: "FILTER_BY",
    payload: payload, //ascendente o desc
  };
}
export function SortBy(payload) {
  //action que ordena
  return {
    type: "SORT",
    payload: payload, //min or max
  };
}
export function filter(value) {
  return {
    type: "FILTER",
    payload: value,
  };
}
