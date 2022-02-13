// const initialState = {
//     recipe : []
    
// }






// function rootReducer (state = initialState,action){
//     switch (action.type){
//         case 'GET_RECIPES':
//             return{
//                 ...state,
//                 recipe:action.payload
//             }
//     }

// }

// export default rootReducer;


function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
      if (a[field] > b[field]) {
        return 1;
      }
      if (b[field] > a[field]) {
        return -1;
      }
      return 0;
    });
  }
  
  function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
      if (a[field] > b[field]) {
        return -1;
      }
      if (b[field] > a[field]) {
        return 1;
      }
      return 0;
    });
  }
  function filterBy(arr, field) {
    let filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].diets.length; j++) {
        if (arr[i].diets[j].name.includes(field)) {
          filteredArr.push(arr[i]);
        }
      }
    }
    return filteredArr;
  }
  
  const initialState = {
    recipes: [],
    recipeDetail: {},
    diets: [],
    filteredRecipes: [],
    submit: " ",
    filtrados: " ",
    
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_RECIPES":
        return {
          ...state,
          recipes: action.payload,
      
        };
        
  
      case "GET_ID":
        console.log("holi mami", action.payload);
        return {
          ...state,
          recipeDetail: action.payload,
        };
  
      case "SUBMIT":
        console.log("entre al submit");
        return {
          ...state,
          recipes: state.recipes.concat(action.payload),
        };
  
      case "GET_TYPES":
        return {
          ...state,
          diets: action.payload,
        };
  
      case "SORT_BY":
        let sortedArr =
          action.payload === "ascendente"
            ? sortAsc(state.recipes, "title")
            : sortDesc(state.recipes, "title");
  
        return {
          ...state,
          recipes: sortedArr,
        };
  
      case "FILTER_BY":
        return {
          ...state,
          filtrados:
            action.payload === "reset"
              ? " "
              : state.filtrados + " | " + action.payload,
          recipes: filterBy(state.recipes, action.payload),
        };
  
      case "SORT":
        return {
          ...state,
          // eslint-disable-next-line
          recipes: state.recipes.sort(function (a, b) {
            if (action.payload === "min to max") {
              return a.spoonacularScore - b.spoonacularScore;
            }
            if (action.payload === "max to min") {
              return b.spoonacularScore - a.spoonacularScore;
            }
          }),
        };
      case "FILTER":
        return {
          ...state,
          filteredRecipes: action.payload,
        };
      default:
        return state;
    }
  }
  
  export default rootReducer;
  