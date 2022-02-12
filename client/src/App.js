import './App.css';
import { Route, Routes } from 'react-router-dom'
import Landing from './componentes/Landing' 
import React from 'react';
import Form from './componentes/Form'
import Main from './componentes/Main'
import DetalleReceta from './componentes/DetalleReceta';


function App() {
        return(
        <Routes>

        <Route exact path = '/' element={<Landing/>} />
        <Route path = '/Main' element = { <Main />}  />
        <Route path = '/CreateRecipe' component = { Form }/>
        <Route path='/recipe/:id' component={ DetalleReceta }/>

        {/* <Route path = '/CreateRecipe' component = {Form} />
        <Route path = '/recipe/:id' component = {detalleReceta} /> */}


        </Routes>
       ) 
}

export default App;
