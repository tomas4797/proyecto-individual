import axios from "axios";

export function getRecipes(query) {
  return function (dispatch) {
    if (!query) {
      return axios.get("/recipes").then((response) => {
        console.log (response.data,"AAAAAAAAAAAAAAAAAAAAAAAAAA IF")
        dispatch({
          type: "GET_RECIPES",
          payload: response.data, 
        });
      });
    } else {
      return axios
        .get("/recipes?name=" + query)
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
    return axios.get(`/recipe/` + id).then((response) => {
      console.log(response.data)
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
      console.log(receta.data)
      dispatch({ type: "GET_TYPES", payload: receta.data });
    });
  };
}
// headers: {
//   "Content-Type": "application/json;charset=utf-8",
// },
// body: JSON.stringify(input),
export function submit(input) {
  return function (dispatch) {
    return axios.post("/recipe",input 
     
      
    ).then((response) => {
      dispatch({
        type: "SUBMIT",
        payload: response.data,
      });
    });
  };
}

export function sortRecipe(payload) {
  //action que ordena
  console.log("ENTRE A SORT RECIPE")
  return {
    type: "SORT_BY",
    payload: payload, //ascendente o desc
  };
}

export function filterBy(payload) {
  //action que ordena
  console.log("ENTRE A  FILTER BY")
  return {
    type: "FILTER_BY",
    payload: payload, //ascendente o desc
  };
}
export function SortBy(payload) {
  console.log("ENTRE A SORT BY")
  //action que ordena
  return {
    type: "SORT",
    payload: payload, //min or max
  };
}
export function filter(value) {
  console.log("ENTRE A FILTER")
  return {
    type: "FILTER",
    payload: value,
  };
}
