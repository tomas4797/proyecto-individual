const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Diet, Recipe } = require ('../db')

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=76f94d613f0e484cad1ca3abb924e6e2&addRecipeInformation=true&number=10`);
    const apiInfo = await apiUrl.data.results.map ( el =>{
        return {
            id: el.id,
            name: el.name,
            summary: el.summary,
            score: el.score,
            healthScore: el.healthScore,
            steps: el.steps,
            diets: el.diets,
            img: el.img
            
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllRecipe = async () => {
    let apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get ('/recipes', async (req, res) =>{
    const name = req.query.name
    let recipetotal = await getAllRecipe ();
    if (name){
        let recipeName = await recipetotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length
        res.status(200).send(recipeName)
        res.status(404).send('No existe la receta');
    } else {
        res.status(200).send(recipetotal)

    }
    
})


module.exports = router;
