import './App.css';
import { Route } from 'react-router-dom'
import Landing from './componentes/Landing' 
import React from 'react';
import Main from './componentes/Main'


function App() {
        <React.Fragment>

        <Route exact path = '/'element={<Landing/>} />
        <Route path = '/recipe' element = { <Main />}  />
        {/* <Route path = '/CreateRecipe' component = {Form} />
        <Route path = '/recipe/:id' component = {detalleReceta} /> */}


        </React.Fragment>
}

export default App;
