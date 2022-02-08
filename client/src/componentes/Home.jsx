import react from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getRecipe } from '../store/actions';
import { Link } from 'react-router-dom'

export default function Home(){
    const dispatch = useDispatch ()
    const allRecipe = useSelector((state) => state.Recipe)

    useEffect (() =>{
        dispatch(getRecipe())

    },[])

    function handleClick(e){
    e.preventDefault();
    dispatch(getRecipe());
    }
    
    return (
        <div>
            <Link to = '/Recipe'>crear Receta</Link>
            <h1> App de Recetas</h1>
            <button onClick = {e => {handleClick(e)}}>
                volver a cargar todas las Recetas
            </button>
            <div>
                <select>
                    <option value = 'asc'>Acscendente</option>
                    <option value = 'desc'>Descendente</option>
                </select>
                <select>
                    <option>Todos</option>
                    <option>Todos</option>
                    <option>Todos</option>
                    <option>Todos</option>
                    <option>Todos</option>
                </select>
            </div>
        </div>
    )


}



