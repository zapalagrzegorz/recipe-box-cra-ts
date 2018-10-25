interface IListRecipesState {
    dialogType: string,
    recipeName: string,
    recipeIngredients: string,
    recipeDirections: string,
    recipesListElements: JSX.Element[],
    recipesList : object,
    recipeKey : string,
    isModalOpen : boolean
}



interface IDialogProps {
    dialogType: string,
    oldRecipeName: string,
    oldRecipeIngredients: string,
    oldRecipeDirections: string,
    hideDialog() : void,
    updateRecipesList() : void,
    recipesList: object,
    recipeKey : string,
    isModalOpen: boolean,
}

interface IRecipeObj {
    name: string,
    ingredients: string,
    directions: string
}

