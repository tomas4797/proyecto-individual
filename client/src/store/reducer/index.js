const initialState = {
    recipe : []
    
}






function rootReducer (state = initialState,action){
    switch (action.type){
        case 'GET_RECIPE':
            return{
                ...state,
                recipe:action.payload
            }
    }

}

export default rootReducer;