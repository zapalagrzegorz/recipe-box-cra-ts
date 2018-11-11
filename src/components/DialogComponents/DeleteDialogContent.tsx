import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { CancelDialogButton } from './CancelDialogButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const typographyProps = {
    variant: "subheading" as "subheading",
    gutterBottom: true,
    paragraph: true
}

interface IDeleteDialogContentProps {
    recipeName: string,
    dialogIngredients: string,
    directions: string,
    deleteRecipe(event: React.MouseEvent<HTMLElement>) : void,
    hideDialog(event: React.MouseEvent<HTMLElement>) : void,
}

export const DeleteDialogContent = (
    { 
        recipeName,
        dialogIngredients,
        directions,
        deleteRecipe,
        hideDialog 
    }: IDeleteDialogContentProps) => {
    return (
        <div className="deleteDialogContent">
            <DialogContent>
                <Typography
                    {...typographyProps}
                >
                    <strong>Title:</strong> {recipeName}
                </Typography>
                <Typography
                    {...typographyProps}
                >
                    <strong>Ingredients:</strong> {dialogIngredients}
                </Typography>
                <Typography
                    {...typographyProps}
                >
                    <strong>Directions:</strong> {directions}
                </Typography>
            </DialogContent>
            <DialogActions>
                <DeleteDialogButton deleteRecipe={deleteRecipe} />
                <CancelDialogButton hideDialog={hideDialog} />
                );
            </DialogActions>
        </div>
    );
}


interface IDeleteDialogButtonProps {
    deleteRecipe(event: React.MouseEvent<HTMLElement>): void,
}

/* nadpisywanie styli dla MUI */
const styles = (theme: any) => ({
    button: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
});

const DeleteDialogButtonUnstyled = (props : IDeleteDialogButtonProps) => {
    const { deleteRecipe } = props;
    return (
        <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={deleteRecipe}
        >I DO WANT TO IRREVERSIBLE DELETE RECIPE</Button>
    );
}

let DeleteDialogButton = withStyles(styles)(DeleteDialogButtonUnstyled);