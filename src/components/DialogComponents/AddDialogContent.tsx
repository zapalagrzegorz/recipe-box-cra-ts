// / <reference path="../../../node_modules/@material-ui/core/index.d.ts" />

import * as React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CancelDialogButton } from './CancelDialogButton';
import { SaveDialogButton } from '../SaveDialogButton';
import { PropTypes } from 'node_modules/@material-ui/core/index';


interface IAddDialogContentProps  { 
    hideDialog: Function, 
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>, 
    saveRecipe: Function 
}

export const AddDialogContent = ({ hideDialog, handleInputChange, saveRecipe }: IAddDialogContentProps
     ) => {
    const textFieldProp = {
        label: "Name",
        type: "text",
        fullWidth: true,
        defaultValue: "",
        onChange: handleInputChange,
        margin : 'normal' as PropTypes.Margin
    }
    return (
        <div>
            <DialogContent>
                <TextField
                    autoFocus
                    {...textFieldProp}
                    id="name"
                    name="changedRecipeName"
                />
                <TextField
                    {...textFieldProp}
                    label="Ingredients"
                    id="ingredients"
                    name="changedIngredients"
                />
                <TextField
                    {...textFieldProp}
                    label="Directions"
                    id="directions"
                    name="changedDirections"
                />
            </DialogContent>
            <DialogActions>
                <SaveDialogButton
                    id="addDialogContentSave"
                    saveRecipe={saveRecipe} />
                <CancelDialogButton
                    hideDialog={hideDialog} />
            </DialogActions>
        </div>
    )
}