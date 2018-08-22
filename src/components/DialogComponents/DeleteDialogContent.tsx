import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { DeleteDialogButton } from './DeleteDialogButton';
import { CancelDialogButton } from './CancelDialogButton';


export const DeleteDialogContent = ({ recipeName, dialogIngredients, directions, deleteRecipe, hideDialog } : { recipeName : any, dialogIngredients: any, directions: any, deleteRecipe: any, hideDialog: any }) => {
    return (
        <div className="deleteDialogContent">
            <DialogContent>
                <Typography 
                    variant="subheading" 
                    gutterBottom={true} 
                    paragraph={true}
                >
                    <strong>Title:</strong> {recipeName}
                </Typography>
                <Typography 
                    variant="subheading" 
                    gutterBottom={true} 
                    paragraph={true}
                >
                    <strong>Ingredients:</strong> {dialogIngredients}
                </Typography>
                <Typography 
                    variant="subheading" 
                    gutterBottom={true} 
                    paragraph={true}
                >
                    <strong>Directions:</strong> {directions}
                </Typography>
            </DialogContent>
            <DialogActions>
                <DeleteDialogButton deleteRecipe={deleteRecipe} />
                <CancelDialogButton hideDialog={hideDialog}/>
        );
            </DialogActions>
        </div>
    );
}