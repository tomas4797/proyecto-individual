import react from 'react';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getRecipe } from '../store/actions';

export default function Home(){
    const dispatch = useDispatch ()
    const allRecipe = useSelector((state) => state.Recipe)

    useEffect (() =>{
        dispatch(getRecipe())
    })


}



