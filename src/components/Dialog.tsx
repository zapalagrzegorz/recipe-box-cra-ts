import * as React from 'react';

import DialogMaterial from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IRecipeList } from "./ListRecipes";
import { DeleteDialogContent } from './DialogComponents/DeleteDialogContent';
import { EditDialogContent } from './DialogComponents/EditDialogContent';
import { AddDialogContent } from './DialogComponents/AddDialogContent';

export interface IDialogContentState {
    readonly changedName: string,
    readonly changedIngredients: string,
    readonly changedDirections: string
}
export interface IDialogProps {
    readonly dialogType: string,
    readonly currentName: string,
    readonly currentIngredients: string,
    readonly currentDirections: string,
    readonly recipesList: IRecipeList,
    readonly recipeKey: string,
    readonly isModalOpen: boolean,
    hideDialog(): void,
    updateRecipesList(): void
}

export class Dialog extends React.Component<IDialogProps, {}> {

    // https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
    filterObjectByKey = (list: any, key: string): IRecipeList => {
        const { [key]: _, ...updatedList } = list;
        return updatedList;
    };

    saveRecipe = (args: IDialogContentState): void => {

        const { currentName, currentIngredients, currentDirections, updateRecipesList,
            hideDialog, recipesList } = this.props
        const { changedName, changedIngredients, changedDirections } = args;
        let updatedRecipe = {
            [changedName]: {
                'name': currentName,
                'ingredients': currentIngredients,
                'directions': currentDirections
            }
        };

        if (changedName) {
            updatedRecipe[changedName]['name'] = changedName;
        }
        if (changedIngredients) {
            updatedRecipe[changedName]['ingredients'] = changedIngredients;
        }
        if (changedDirections) {
            updatedRecipe[changedName]['directions'] = changedDirections;
        }

        const updatedRecipesList = { ...recipesList, ...updatedRecipe };

        localStorage.setItem('recipesList', JSON.stringify(updatedRecipesList));

        updateRecipesList();
        hideDialog();
    }

    deleteRecipe = (): void => {
        const { recipesList, recipeKey, updateRecipesList, hideDialog } = this.props;

        const updatedRecipeList = this.filterObjectByKey(recipesList, recipeKey);

        localStorage.setItem('recipesList', JSON.stringify(updatedRecipeList));
        updateRecipesList();
        hideDialog();
    }

    render() {
        const { hideDialog, isModalOpen, dialogType, currentName, currentIngredients, currentDirections } = this.props;
        const recipeProps = {
            name: currentName,
            ingredients: currentIngredients,
            directions: currentDirections
        }
        const hideAndSaveProps = {
            hideDialog,
            saveRecipe: this.saveRecipe
        }
        return (
            <DialogMaterial
                open={isModalOpen}
                onClose={hideDialog}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="form-dialog-title"
                    style={{ textTransform: 'uppercase', textAlign: 'center' }}
                >
                    {dialogType}
                </DialogTitle>
                {dialogType === 'add' && <AddDialogContent
                    {...hideAndSaveProps} />}

                {dialogType === 'edit' && <EditDialogContent
                    {...recipeProps}
                    {...hideAndSaveProps} />}

                {dialogType === 'delete' && <DeleteDialogContent
                    {...recipeProps}
                    hideDialog={hideDialog}
                    deleteRecipe={this.deleteRecipe}
                />}
            </DialogMaterial>
        );
    }
}