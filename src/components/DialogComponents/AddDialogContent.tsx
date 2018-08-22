import * as React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CancelDialogButton } from './CancelDialogButton';
import { SaveDialogButton } from '../SaveDialogButton';


export const AddDialogContent = ({ hideDialog, handleInputChange, saveRecipe } : { hideDialog: any, handleInputChange: any, saveRecipe: any }) => {
    return (
        <div>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="normal"
                    label="Name"
                    type="text"
                    id="name"
                    fullWidth
                    name="changedRecipeName"
                    defaultValue=""
                    onChange={handleInputChange}
                />;
                <TextField
                    margin="normal"
                    label="Ingredients"
                    type="text"
                    id="ingredients"
                    name="changedIngredients"
                    defaultValue=""
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    label="Directions"
                    type="text"
                    id="directions"
                    name="changedDirections"
                    defaultValue=""
                    onChange={handleInputChange}
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