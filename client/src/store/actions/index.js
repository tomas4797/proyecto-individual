import axios from "axios";

export function getRecipes (query) {
    return function (dispatch) {
        if (!query){
            return axios.get ("/recipes").then((Response) => {
                dispatch({
                    type: "GET_RECIPE",
                    payload: Response.data.result,
                });
            });
        }else{
            return axios
            .get("/recipes?query=" + query)
            .then((response) => {
                dispatch({
                    type: "GET_RECIPES",
                    payload: response.data,
                });
            });
        }
    };
}

export function getID (id) {
    return function (dispatch){
        return axios.get (`/recipes/` + id).then ((response) => {
            dispatch({
                type: "GET_ID",
                payload: response.data,
            });
        });
    };
}

export function getDiet(){
    return function (dispatch) {
        return axios.get ("/types").then ((receta) =>{
            dispatch ({ type: "GET_TYPES", payload: receta.data});
        });
    };
}

export function submit (input) {
    return function (dispatch) {
        return fetch ("/recipe", {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=utf-8"
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

    return {
        type: "SHORT_BY",
        payload: payload,
    };
}

export function filterBy (payload){

    return{
        type: "FILTER_BY",
        payload: payload,
    };
}

export function sortBy (payload) {
    return {
        type: "SORT",
        payload:payload,
    };
}

export function filter(value) {
    return{
        type: "FILTER",
        payload: value,
    };
}