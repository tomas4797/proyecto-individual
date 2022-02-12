import React, { useState, useEffect } from "react";
import styles from '../componentes/Form.module.css';
import Nav from '../componentes/Nav';
import { getDiets, submit } from '../store/actions/index';
import { connect } from 'react-redux';


//ESTA FUNCIÓN COMPRUEBA QUE LA INFORMACIÓN INGRESADA EN LOS INPUT NUMBER SEA VÁLIDA
export function validate(input) {
    let errors = {};
    if (input.score > 100 || input.score < 0) {
        errors.score = 'Score must be set between 1 and 100';
    }

    if (!input.healthScore > 100 || input.healthScore < 0) {
        errors.healthScore = 'Health Score must be set between 0 and 100';
    }
    return errors;
};

export function CrearReceta(props) {
    //SE CREA ESTADO LOCAL CON TODOS LOS CAMPOS DE UNA RECETA
    const [input, setInput] = useState({
        title: '',
        summary: '',
        score: 0,
        healthScore: 0,
        steps: '',
        diets: [],
    });

    const [errors, setErrors] = useState({}); //ESTADO PARA LOS ERRORES
    // const [render, setRender] = useState(''); //ESTADO PARA EL MENSAJE DE ÉXITO AL CREAR RECETA

    const handleInputChange = function (e) {
        //ESTA FUNCIÓN HACE QUE LAS PROPIEDADES TOMEN EL NOMBRE DEL INPUT 
        //(QUE ES IGUAL AL NOMBRE DEL ATRIBUTO DEL OBJETO DE LA RECETA)
        // Y LES DA EL VALOR QUE INTRODUCIMOS EN EL INPUT
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value //MUESTRA LOS ERRORES SETEADOS AL PRINCIPIO
        }));

        setInput({
            ...input,
            [e.target.name]: e.target.value //EJ TITLE : PASTA (EL INPUT CON NAME:"TITLE" VA A TOMAR EL VALOR "PASTA" QUE SE ESCRIBIÓ EN ÉL)
        });
    };

    const handleCheck = function (e) {
        if (e.target.checked) {
            //SI SE MARCAN LOS CHECKS DE LOS TIPOS DE DIETA, SE PUSHEAN AL ARRAY DE DIETS
            setInput({ ...input, diets: [...input.diets, e.target.value] });
        } else {
            setInput({ ...input, diets: input.diets.filter((diet) => diet !== e.target.value) })
        };
    };

    const handleSubmit = function (e) {
        e.preventDefault();
        props.submit(input)
        alert('Your recipe has been added correctly!') //AGREGA ESTA STRING AL ESTADO Y LO RENDERIZA ANTES DEL BOTON SUBMIT
        setInput({ //ESTO HACE QUE LUEGO DE TOCAR SUBMIT LOS CAMPOS SE VACÍEN
            title: '',
            summary: '',
            score: 0,
            healthScore: 0,
            steps: '',
            diets: [],
        })
        console.log("e", e)
        console.log("input", input)
    }
    // eslint-disable-next-line
    useEffect(() => { //REVISAR FUNCIONAMIENTO DE USEEFFECT
        props.getDiets()
        // eslint-disable-next-line
    }, [])


    return (
        <div className={styles.divMain}>
            <nav className={styles.nav}>
                <Nav />
            </nav>
            <div className={styles.card}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1>Create Recipe</h1>
                    {/* LOS ATRIBUTOS NAME SON NECESARIOS PORQUE LE AVISAN AL ESTADO QUÉ PROPIEDAD MODIFICAR, 
                        EL VALOR TAMBIÉN PORQUE VAN A SETEAR EL ATRIBUTO */}
                    <div className={styles.title}>
                        <p>Title:</p>

                        <input type="text" placeholder="Name your recipe" name="title" onChange={handleInputChange} value={input.title} />

                        <br />

                        <p>Summary:</p>

                        <textarea type="text" placeholder="Tell us about this recipe" name="summary" onChange={handleInputChange} value={input.summary} />

                        <br />
                        <p>Score:</p>
                        <input type="number" name="score" onChange={handleInputChange} value={input.score} />
                        {errors.score && (
                            <p className="danger">{errors.score}</p>
                        )}
                        <br />
                        <p>Health score:</p>
                        <input type="number" name="healthScore" onChange={handleInputChange} value={input.healthScore} />
                        {errors.healthScore && (
                            <p>{errors.healthScore}</p>
                        )}
                        <br />
                        <p>Instructions:</p>
                        <textarea type="text" name="steps" onChange={handleInputChange} value={input.steps} placeholder="How to prepare it" />
                        <br />
                        <p>Diets:</p>
                        {props.diets && props.diets.map((diet) => {
                            return (
                                <ul className={styles.checkboxGrid}>
                                    <li>
                                        <input type="checkbox" name={diet.name} value={diet.name} onChange={(e) => handleCheck(e)} />

                                        <label>
                                            {diet.name}
                                        </label>
                                    </li>
                                    
                                </ul>
                            )
                        })}
                    </div>
                    <br />
                    {/* ESTO SOLO MUESTRA EL MENSAJE DE QUE LA RECETA SE ENVIÓ CON ÉXITO */}
                    {/* {render[0] &&
                        <div>{render}</div>
                    } */}



                    <button type='submit' className={styles.btnCrear}>Enviar</button>
                </form>
                <br />
            </div>
        </div>
    )
}

// TODO ESTO PARECE ESTAR BIEN 

function mapStateToProps(state) {
    return {
        diets: state.diets, //REVISAR POR QUÉ NO SE TRAEN LOS TIPOS DE DIETA
        submit: state.submit,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getDiets: () => dispatch(getDiets()),
        submit: (obj) => dispatch(submit(obj))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CrearReceta)