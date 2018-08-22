/// <reference path="./interfaces.d.ts" />

import * as React from 'react';

import DialogMaterial from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DeleteDialogContent } from './DialogComponents/DeleteDialogContent';
import { EditDialogContent } from './DialogComponents/EditDialogContent';
import { AddDialogContent } from './DialogComponents/AddDialogContent';

export class Dialog extends React.PureComponent<IDialogProps, any> {
    constructor(props : any) {
        super(props);
        this.state = {
            changedRecipeName: '',
            changedIngredients: '',
            changedDirections: '',
            dialogContent: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidUpdate(prevProps : any) {
        if (this.props.dialogType !== prevProps.dialogType || 
            this.props.oldRecipeName !== prevProps.oldRecipeName) {
            let dialogContent: JSX.Element;
            
            switch (this.props.dialogType) {

                case 'delete':
                    dialogContent = <DeleteDialogContent
                        recipeName={this.props.oldRecipeName}
                        dialogIngredients={this.props.oldRecipeIngredients}
                        directions={this.props.oldRecipeDirections}
                        deleteRecipe={this.deleteRecipe}
                        hideDialog={this.props.hideDialog} />
                    break;

                case 'edit':
                    dialogContent = (<EditDialogContent
                        recipeName={this.props.oldRecipeName}
                        dialogIngredients={this.props.oldRecipeIngredients}
                        directions={this.props.oldRecipeDirections}
                        hideDialog={this.props.hideDialog}
                        handleInputChange={this.handleInputChange}
                        saveRecipe={this.saveRecipe} />);
                    break;

                case 'add':
                    dialogContent = (<AddDialogContent
                        hideDialog={this.props.hideDialog}
                        handleInputChange={this.handleInputChange}
                        saveRecipe={this.saveRecipe} />);
                    break;
                default:
                    dialogContent = (<span></span>);
                    break;
            }
            this.setState({ dialogContent });
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleInputChange(event : any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    saveRecipe() {

        // JSON.parse(JSON.stringify(x)) zwraca deep cloned object
        let recipesList = JSON.parse(JSON.stringify(this.props.recipesList));
        const { changedIngredients, changedRecipeName, changedDirections } = this.state;
        const { oldRecipeName, oldRecipeIngredients, oldRecipeDirections, recipeKey } = this.props

        let newRecipe = { name: "", ingredients: "", directions: "" };

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

        /* nowy przepis ma pusty klucz (props.recipeName). Jeżeli to nie jest nowy wpis,
        to nie rozróżniać  każego przypadku tj. sprawdzania co sie zmieniło to ingredients czy directions czy name, 
        to skasować stary wpis i podać nowy, zamiast podmian właściwości, a potem zawsze tworzymy nowy */
        if (oldRecipeName) {
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

                {this.state.dialogContent}

            </DialogMaterial>
        );
    }
}
