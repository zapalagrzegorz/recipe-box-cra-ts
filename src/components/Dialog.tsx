/// <reference path="./interfaces.d.ts" />

import * as React from 'react';

import DialogMaterial from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DeleteDialogContent } from './DialogComponents/DeleteDialogContent';
import { EditDialogContent } from './DialogComponents/EditDialogContent';
import { AddDialogContent } from './DialogComponents/AddDialogContent';
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

        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    saveRecipe(args: Array<any>) {
        function _parseRefInputs(arr : Array<any>) : object {
            const returnObject = {};
            args.forEach(function (inputDOM) {
                const input = inputDOM.current;
                switch (input.id) {
                    case ('name'):
                        returnObject['name'] = input.value;
                        break;
                    case ('ingredients'):
                        returnObject['ingredients'] = input.value;    
                        break
                    case ('directions'):
                        returnObject['ingredients'] = input.value;
                        break;
                }
                
            });
            return returnObject; 
        }

        // JSON.parse(JSON.stringify(x)) zwraca deep cloned object
        let recipesList = JSON.parse(JSON.stringify(this.props.recipesList));

        const { changedIngredients, changedRecipeName, changedDirections } = this.state;

        const { oldRecipeName, oldRecipeIngredients, oldRecipeDirections, recipeKey } = this.props

        let newRecipe = { name: "", ingredients: "", directions: "" };

        if (Array.isArray(args)) {
            newRecipe = {...newRecipe, ..._parseRefInputs(args)};
        } else {
            if (changedRecipeName) {
                newRecipe.name = changedRecipeName;
            } else {
                newRecipe.name = oldRecipeName;
            }
    
            if (changedIngredients) {
                newRecipe.ingredients = changedIngredients;
            } else {
                newRecipe.ingredients = oldRecipeIngredients;
            }
    
            if (changedDirections) {
                newRecipe.directions = changedDirections;
            } else {
                newRecipe.directions = oldRecipeDirections;
            }
        }

        /* nowy przepis ma pusty klucz (props.recipeName). Jeżeli to nie jest nowy wpis,
        to nie rozróżniać  każego przypadku tj. sprawdzania co sie zmieniło to ingredients czy directions czy name, 
        to skasować stary wpis i podać nowy, zamiast podmian właściwości, a potem zawsze tworzymy nowy */
        if (oldRecipeName) {
            // TODO powinien być jakiś .filter
            delete recipesList[recipeKey];
        }

        recipesList[newRecipe.name] = newRecipe;

        localStorage.setItem('recipesList', JSON.stringify(recipesList));

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
                    handleInputChange={this.handleInputChange}
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
                    handleInputChange={this.handleInputChange}
                    saveRecipe={this.saveRecipe} />}
            </DialogMaterial>
        );
    }
}
