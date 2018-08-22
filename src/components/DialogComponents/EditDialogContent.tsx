import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CancelDialogButton } from './CancelDialogButton';
import { SaveDialogButton } from '../SaveDialogButton';


export const EditDialogContent = ({ recipeName, dialogIngredients, directions, hideDialog, handleInputChange, saveRecipe } : {recipeName: any, dialogIngredients: any, directions:any, hideDialog: any, handleInputChange:any, saveRecipe:any}) => {
    return (
        <div>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="normal"
                    label="Name"
                    type="text"
                    id="name"
                    name="changedRecipeName"
                    defaultValue={recipeName}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    label="Ingredients"
                    type="text"
                    id="ingredients"
                    name="changedIngredients"
                    defaultValue={dialogIngredients}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    label="Directions"
                    type="text"
                    id="directions"
                    name="changedDirections"
                    defaultValue={directions}
                    onChange={handleInputChange}
                    multiline
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <SaveDialogButton
                    saveRecipe={saveRecipe} />
                <CancelDialogButton
                    hideDialog={hideDialog} />
            </DialogActions>
        </div>
    );
}