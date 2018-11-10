/// <reference path="./interfaces.d.ts" />

import * as React from 'react';

import DialogMaterial from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DeleteDialogContent } from './DialogComponents/DeleteDialogContent';
import { EditDialogContent } from './DialogComponents/EditDialogContent';
import { AddDialogContent, IDialogContentState } from './DialogComponents/AddDialogContent';
// import { array } from 'prop-types';

interface IDialogProps {
    dialogType: string,
    oldRecipeName: string,
    oldRecipeIngredients: string,
    oldRecipeDirections: string,
    hideDialog(): void,
    updateRecipesList(): void,
    recipesList: object,
    recipeKey: string,
    isModalOpen: boolean,
}
export class Dialog extends React.Component<IDialogProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            changedRecipeName: '',
            changedIngredients: '',
            changedDirections: '',
        };

        // this.handleInputChange = this.handleInputChange.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    // handleInputChange(event: any) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    // }

    saveRecipe(args: IDialogContentState) {

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
        const updatedRecipeList = ( (oldRecipeName) => {
            if (oldRecipeName) {
                const { [recipeKey]: _, ...updatedRecipesList } = recipesList;
                return updatedRecipesList;
            } else {
                return recipesList;
            }
        })(oldRecipeName);

        updatedRecipeList[updatedRecipe.name] = updatedRecipe;

        localStorage.setItem('recipesList', JSON.stringify(updatedRecipeList));

        this.props.updateRecipesList();
        this.props.hideDialog();
    }

    deleteRecipe() {

        let recipesList = JSON.parse(JSON.stringify(this.props.recipesList));

        delete recipesList[this.props.recipeKey];

        localStorage.setItem('recipesList', JSON.stringify(recipesList));

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
