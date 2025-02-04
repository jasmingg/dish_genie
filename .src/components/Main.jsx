import React from "react"
import IngredientsList from "./IngredientsList"
import DishGenie from "./DishGenie"
import 'ldrs/infinity'
import axios from 'axios'


export default function Main(props) {
    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipe, setRecipe] = React.useState("")
    const [loadingScreen, setLoading] = React.useState(false) 
    const [removeButtonOptions, setRemove] = React.useState([false, 0, "Clear Recipe", "#900D09"])

    const recipeSection = React.useRef()


    React.useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
            }
        }
        , [recipe]
        )

        const getRecipe = async () => {
            setLoading(true);
            try {
                const response = await axios.post('/.netlify/functions/generate-recipe', {
                    ingredientsArr: ingredients
                });
                setRecipe(response.data.recipe); // Set the recipe from server response
            } catch (error) {
                console.error(`Error fetching recipe: ${error}`);
                setRecipe('Error fetching recipe.');
            }
            setLoading(false);
            clearRecipe();
        };
        

    
    function addIngredient(event) {
        event.preventDefault()
        const newIngredient = event.target.ingredient.value
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        event.target.reset()
    }

    function clearRecipe () {
        if (removeButtonOptions[1] === 2) {
            console.log(props.refHeader.current)
            if (props.refHeader.current) {
                props.refHeader.current.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            setTimeout(() => {
                setRemove([false, 0, 'Clear Recipe', "#900D09"])
                setIngredients([])
                setRecipe('')
            }, 500); // Delay to ensure smooth scroll happens before resetting recipe + ingredients
        }
        else if (removeButtonOptions[1] === 0) {
            setRemove([true, 1, 'Clear Recipe', "#900D09"])
        }
        else {
            setRemove([true, 2, 'Clear Recipe?', "red"])
        }
    }

    
    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button className='addButton'>Add ingredient</button>
            </form>

            {ingredients.length > 0 ?
                <IngredientsList
                    refRecipeButton={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    removeButtonOptions={removeButtonOptions}
                    clearRecipe={clearRecipe}
                />
                : <p className="emptyIngredients">Add at least 3 ingredients to get started with a recipe 
                    *ੈ𑁍༘⋆°❀⋆.ೃ࿔*:･ ݁</p>
            }

            {loadingScreen ? <l-infinity
                                className=''
                                size="55"
                                stroke="4"
                                stroke-length="0.15"
                                bg-opacity="0.1"
                                speed="1.3"
                                color="black" 
                                > </l-infinity>
                            : null}
            {recipe && <DishGenie recipe={recipe}/>}
        </main>
    )
}