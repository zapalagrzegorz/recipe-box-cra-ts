import * as React from 'react';

import DialogMaterial from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IRecipeList } from "./ListRecipes";
import { DeleteDialogContent } from './DialogComponents/DeleteDialogContent';
import { EditDialogContent } from './DialogComponents/EditDialogContent';
import { AddDialogContent, IDialogContentState } from './DialogComponents/AddDialogContent';

interface IDialogProps {
    readonly dialogType: string,
    readonly oldRecipeName: string,
    readonly oldRecipeIngredients: string,
    readonly oldRecipeDirections: string,
    readonly recipesList: IRecipeList,
    readonly recipeKey: string,
    readonly isModalOpen: boolean,
    hideDialog(): void,
    updateRecipesList(): void
}


export class Dialog extends React.Component<IDialogProps, {}> {

    filterObjectByKey = (list: any, deleteFlag: boolean, key: string): object => {
        if (deleteFlag) {
            const { [key]: _, ...updatedList } = list;
            return updatedList;
        } else {
            return list;
        }
    };

    saveRecipe = (args: IDialogContentState): void => {

        // nie klonuj tylko filtruj do nowego obiektu TODO
        // JSON.parse(JSON.stringify(x)) zwraca deep cloned object
        let recipesList = JSON.parse(JSON.stringify(this.props.recipesList));

        const { changedIngredients, changedRecipeName, changedDirections } = args;

        const { oldRecipeName, oldRecipeIngredients, oldRecipeDirections, recipeKey } = this.props

        let updatedRecipe = { name: "", ingredients: "", directions: "" };

        if (changedRecipeName) {
            updatedRecipe.name = changedRecipeName;
        } else {
            updatedRecipe.name = oldRecipeName;
        }

        if (changedIngredients) {
            updatedRecipe.ingredients = changedIngredients;
        } else {
            updatedRecipe.ingredients = oldRecipeIngredients;
        }

        if (changedDirections) {
            updatedRecipe.directions = changedDirections;
        } else {
            updatedRecipe.directions = oldRecipeDirections;
        }


        /* 
        1. nowy przepis ma pusty klucz (props.recipeName). 
        2. Jeżeli nie jest to nowy wpis, to nie rozróżniać każego przypadku tj. sprawdzania co się zmieniło to ingredients czy directions czy name, 
        to skasować stary wpis i podać nowy, zamiast podmian właściwości, a potem zawsze tworzymy nowy */
        // https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
        const updatedRecipeList = ((oldRecipeName) => {
            if (oldRecipeName) {
                const { [recipeKey]: _, ...updatedRecipesList } = recipesList;
                return updatedRecipesList;
            } else {
                return recipesList;
            }
        })(oldRecipeName);

        this.filterObjectByKey(recipesList, !!oldRecipeName, recipeKey)

        updatedRecipeList[updatedRecipe.name] = updatedRecipe;

        localStorage.setItem('recipesList', JSON.stringify(updatedRecipeList));

        this.props.updateRecipesList();
        this.props.hideDialog();
    }

    deleteRecipe = (event: React.MouseEvent<HTMLElement>): void => {
        const updatedRecipeList = this.filterObjectByKey(this.props.recipesList, true, this.props.recipeKey);

        localStorage.setItem('recipesList', JSON.stringify(updatedRecipeList));

        this.props.updateRecipesList();

        this.props.hideDialog();
    }

    render() {

        return (
            <DialogMaterial
                open={this.props.isModalOpen}
                onClose={this.props.hideDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="form-dialog-title"
                    style={{ textTransform: 'uppercase', textAlign: 'center' }}
                >
                    {this.props.dialogType}
                </DialogTitle>
                {this.props.dialogType === 'add' && <AddDialogContent
                    hideDialog={this.props.hideDialog}
                    saveRecipe={this.saveRecipe} />}

                {this.props.dialogType === 'delete' && <DeleteDialogContent
                    recipeName={this.props.oldRecipeName}
                    dialogIngredients={this.props.oldRecipeIngredients}
                    directions={this.props.oldRecipeDirections}
                    deleteRecipe={this.deleteRecipe}
                    hideDialog={this.props.hideDialog} />}

                {this.props.dialogType === 'edit' && <EditDialogContent
                    recipeName={this.props.oldRecipeName}
                    dialogIngredients={this.props.oldRecipeIngredients}
                    directions={this.props.oldRecipeDirections}
                    hideDialog={this.props.hideDialog}
                    saveRecipe={this.saveRecipe} />}
            </DialogMaterial>
        );
    }
}
