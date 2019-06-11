import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { CancelDialogButton } from './CancelDialogButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { IRecipeObj } from "../ListRecipes";

const typographyProps = {
    gutterBottom: true,
    paragraph: true
}

interface IDeleteDialogContentProps extends IRecipeObj {
    deleteRecipe(): void,
    hideDialog(): void,
}

export const DeleteDialogContent = (props: IDeleteDialogContentProps) => {
    const { name, ingredients, directions, deleteRecipe, hideDialog } = props;
    return (
        <div className="deleteDialogContent">
            <DialogContent>
                <Typography {...typographyProps}>
                    <strong>Title:</strong> {name}
                </Typography>
                <Typography {...typographyProps}>
                    <strong>Ingredients:</strong> {ingredients}
                </Typography>
                <Typography {...typographyProps}>
                    <strong>Directions:</strong> {directions}
                </Typography>
            </DialogContent>
            <DialogActions>
                <DeleteDialogButton deleteRecipe={deleteRecipe} />
                <CancelDialogButton hideDialog={hideDialog} />
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

const DeleteDialogButtonUnstyled = (props: IDeleteDialogButtonProps) => {
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