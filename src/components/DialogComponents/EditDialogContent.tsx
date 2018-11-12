import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CancelDialogButton } from './CancelDialogButton';
import { IDialogContentState } from '../Dialog';
import { PropTypes, Button } from '@material-ui/core/index';
import { IRecipeObj } from "../ListRecipes";

interface IEditDialogProps extends IRecipeObj {
    hideDialog(): void,
    saveRecipe(state: IDialogContentState): void
}

export class EditDialogContent extends React.Component<IEditDialogProps, IDialogContentState> {
    state: IDialogContentState = {
        changedName: this.props.name,
        changedIngredients: this.props.ingredients,
        changedDirections: this.props.directions
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const newState = {};
        newState[name] = value
        this.setState(newState)
        // not possible at 3.1.3 TS:
        // this.setState({
        //     [name]: value
        // });
    }
    render() {
        const { saveRecipe, hideDialog } = this.props;
        const { changedName, changedIngredients, changedDirections } = this.state;
        const textFieldProp = {
            type: "text",
            fullWidth: true,
            onChange: this.handleInputChange,
            margin: 'normal' as PropTypes.Margin,
        }
        return (
            <React.Fragment>
                <DialogContent>
                    <TextField
                        {...textFieldProp}
                        autoFocus
                        label="Name"
                        id="name"
                        name="changedRecipeName"
                        value={changedName}
                    />
                    <TextField
                        {...textFieldProp}
                        label="Ingredients"
                        id="ingredients"
                        name="changedIngredients"
                        value={changedIngredients}
                    />
                    <TextField
                        {...textFieldProp}
                        label="Directions"
                        id="directions"
                        name="changedDirections"
                        value={changedDirections}
                        multiline={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        id="editDialogContentSave"
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={() => saveRecipe(this.state)}
                    >Save</Button>
                    <CancelDialogButton
                        hideDialog={hideDialog} />
                </DialogActions>
            </React.Fragment >
        );
    }
}