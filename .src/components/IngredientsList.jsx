import { forwardRef } from 'react'

const IngredientsList = forwardRef((props, ref) =>  {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient} className="capitalizeList">{ingredient}</li>
    ))

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length >= 3 && <div className="get-recipe-container">
                <div ref={props.refRecipeButton}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                {props.removeButtonOptions[0] ? 
                                                <button onClick={props.clearRecipe}
                                                    className='remove-button' 
                                                    style={{background: props.removeButtonOptions[3],
                                                            transition: 'background 0.3s ease'
                                                    }}>
                                                        {props.removeButtonOptions[2]}
                                                </button> : 
                                                <button 
                                                    className='get-recipe'
                                                    onClick={props.getRecipe}>
                                                            Get a recipe
                                                </button>}
            </div>}
        </section>
    )
    }
)

export default IngredientsList