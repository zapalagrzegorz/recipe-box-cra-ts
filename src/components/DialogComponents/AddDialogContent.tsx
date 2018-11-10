// / <reference path="../../../node_modules/@material-ui/core/index.d.ts" />

import * as React from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CancelDialogButton } from './CancelDialogButton';
// import { SaveDialogButton } from '../SaveDialogButton';
import { PropTypes } from 'node_modules/@material-ui/core/index';
import Button from '@material-ui/core/Button';



interface IAddDialogContentProps {
    hideDialog: Function,
    saveRecipe: Function
}

export interface IDialogContentState {
    changedRecipeName: string,
    changedIngredients: string,
    changedDirections: string
}

export class AddDialogContent extends React.Component<IAddDialogContentProps, IDialogContentState>  {

    constructor(props: IAddDialogContentProps) {
        super(props);
        this.state = {
            changedRecipeName: "",
            changedIngredients: "",
            changedDirections: ""
        }
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
        const { saveRecipe } = this.props;

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
                        value={this.state.changedRecipeName}
                    />
                    <TextField
                        {...textFieldProp}
                        label="Ingredients"
                        id="ingredients"
                        name="changedIngredients"
                        value={this.state.changedIngredients}
                    />
                    <TextField
                        {...textFieldProp}
                        label="Directions"
                        id="directions"
                        name="changedDirections"
                        value={this.state.changedDirections}
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
                        hideDialog={this.props.hideDialog} />
                </DialogActions>
            </div>
        );
    }
}