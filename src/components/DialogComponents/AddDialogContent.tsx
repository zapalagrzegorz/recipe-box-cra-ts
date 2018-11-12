
import * as React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CancelDialogButton } from './CancelDialogButton';
import { PropTypes } from 'node_modules/@material-ui/core/index';
import Button from '@material-ui/core/Button';
import { IDialogContentState } from "../Dialog";

interface IAddDialogContentProps {
    hideDialog(): void,
    saveRecipe(state: IDialogContentState): void
}

export class AddDialogContent extends React.Component<IAddDialogContentProps, IDialogContentState>  {

    state: IDialogContentState = {
        changedName: "",
        changedIngredients: "",
        changedDirections: ""
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
        const {changedDirections, changedIngredients, changedName} = this.state;

        const textFieldProp = {
            type: "text",
            fullWidth: true,
            onChange: this.handleInputChange,
            margin: 'normal' as PropTypes.Margin
        }
        return (
            <div>
                <DialogContent>
                    <TextField
                        autoFocus
                        {...textFieldProp}
                        id="name"
                        label="Name"
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        id="addDialogContentSave"
                        className="buttonAddDialogContentSave"
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={() => saveRecipe(this.state)}
                    >Save</Button>

                    <CancelDialogButton
                        hideDialog={hideDialog} />
                </DialogActions>
            </div>
        );
    }
}