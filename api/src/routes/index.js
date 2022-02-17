
const { Router, query } = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Diet, Recipe, Op } = require ('../db');
const { v4: uuidv4 } = require('uuid');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    // const { query } = req.query
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=80781cf3ee384e35984663a61ff0eb0e&addRecipeInformation=true&number=20`);
    console.log (apiUrl.data.results[0])
    const apiInfo = await apiUrl.data.results.map ( el =>{
        return {
            id: el.id,
            name: el.title,
            summary: el.summary,
            score: el.spoonacularScore,
            healthScore: el.healthScore,
            steps: el.steps,
            diets: el.diets,
            img: el.image
            
        };
    });
    return apiInfo;
};

async function getInfo  (id) {

    let { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=80781cf3ee384e35984663a61ff0eb0e&addRecipeInformation=true`)
     
    return  {
            id: data.id,
            name: data.title,
            image: data.image,
            summary: data.summary,
            score: data.spoonacularScore,
            healthScore: data.healthScore,
            steps: data.instructions,
            dishTypes: data.dishTypes,
            diets: data.diets

        };

//     (recipe => {
//         return recipe.data
//     // })
//     // .catch(e => {
//     //     console.log(e)
//     // })
}

async function dataBaseInfo (id) {
    const dbInfo = await Recipe.findByPk(
        id,
            {
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                },
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through:{
                        attributes: []
                    }
                }
            }
    )
    const auxReceta = {
        id: dbInfo.id,
        name: dbInfo.name,
        image: dbInfo.image,
        summary: dbInfo.summary,
        score: dbInfo.score,
        healthScore: dbInfo.healthScore,
        steps: dbInfo.steps,
        types: dbInfo.diets.map(dieta => dieta.name)
    }
    return auxReceta;
}


const getDbInfo = async () => {
    const recipe = await Recipe.findAll({
        attributes: ['id','name','image'],
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    console.log (recipe)
    const results = recipe.map ((recip) =>(
        {
            id: recip.id,
            name: recip.name,
            image: recip.image,
            score: recip.score,
            diets: recip.diets.map(dieta => dieta.name)
        }
    ))
    return results 
}

router.get('/Types', async (req, res,) => {
    const types = await Diet.findAll()
    res.status(200).send(types);
})


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
        // res.status(404).send('No existe la receta');
    } else {
        res.status(200).send(recipetotal)

    }
    
})

router.post ('/recipe', async (req, res) => {
    let { title, summary, score, healthScore, steps, diet} = req.body
    console.log(req.body)
    const recipe = await Recipe.create ({
        
        id: uuidv4 (), 
        name:title,
        summary,
        score,
        healthScore,
        steps,
        image:"https://img-global.cpcdn.com/recipes/ffe5f61ff77da264/680x482cq70/guiso-facil-y-rapido-foto-principal.jpg"

    })
    if (!Array.isArray(diet)) {
        diet = [diet];
    };

    const dietDb = await Diet.findAll({
        where: {
            name: {
                [Op.in]: diet,
            },
        },
    });

    await recipe.setDiets(dietDb);
    res.status(200).json(recipe);
})

// router.get ('/diet', async (req, res) =>{
//     const dietApi = await axios.get ('https://api.spoonacular.com/recipes/complexSearch?apiKey=76f94d613f0e484cad1ca3abb924e6e2&addRecipeInformation=true&number=10')
//     const diet = dietApi.data.map (el => el.diet)
//     const occEach = diet.map (el => {
//         for (let i=0; i > el.length; i++) return el [i]})
//         occEach.forEach(el =>{
//             diet.findOrCreate({
//                 where: { name: el } 
//             })
//         })
//         const allOccupations = await Occupation.findAll();
//         res.send (allOccupations);
//     })

    router.post ('/Recipe', async (req, res) => {
        let {
            id,
            name,
            summary,
            score,
            healthScore,
            steps,
            createdInDb,
            diets,
            img
        } = req.body

        let recipeCreated = await Recipe.create ({
            id,
            name,
            summary,
            score,
            healthScore,
            steps,
            img,
            createdInDb
        });

        let dietDb = await Diet.findAll({
            where: { name: Diet }
        })
        recipeCreated.addDiet(dietDb)
        res.send ('receta creada con exito')
    });

    router.get ('/recipe/:id', async (req, res) => {
        const id = req.params.id;
        if (!isNaN(id)){
            const respApi = await getInfo (id)
            return res.json (respApi) 
        } else {
            const respApi = await dataBaseInfo (id)
            return res.json (respApi)
        }

        const recipeTotal = await getAllRecipe()
        if (id){
            let recipeId = await recipeTotal.filter(el => el.id === id)
            recipeId.length?
            res.status(200).json(recipeId):
            res.status(404).send('No se encontro esa receta')
        }
    })




module.exports = router; 
