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
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>,
    saveRecipe: Function
}

/* Intentionally test uncontrolled components with refs */
export class AddDialogContent extends React.Component<IAddDialogContentProps, any>  {
    inputNameRef: React.RefObject<{}>;
    inputIngredientsRef: React.RefObject<{}>;
    inputDirectionsRef: React.RefObject<{}>;
    constructor(props: IAddDialogContentProps) {
        super(props);
        this.inputNameRef = React.createRef();
        this.inputIngredientsRef = React.createRef();
        this.inputDirectionsRef = React.createRef();
    }

    render() {
        const {saveRecipe} = this.props;
        
        const textFieldProp = {
            label: "Name",
            type: "text",
            fullWidth: true,
            defaultValue: "",
            onChange: this.props.handleInputChange,
            margin: 'normal' as PropTypes.Margin
        }
        return (
            <div>
                <DialogContent>
                    <TextField
                        inputRef={this.inputNameRef}
                        autoFocus
                        {...textFieldProp}
                        id="name"
                        name="changedRecipeName"
                    />
                    <TextField
                        {...textFieldProp}
                        inputRef={this.inputIngredientsRef}
                        label="Ingredients"
                        id="ingredients"
                        name="changedIngredients"
                    />
                    <TextField
                        {...textFieldProp}
                        inputRef={this.inputDirectionsRef}
                        label="Directions"
                        id="directions"
                        name="changedDirections"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        id="addDialogContentSave"
                        variant="contained"
                        type="button"
                        color="primary"
                        onClick={() => saveRecipe([this.inputNameRef, this.inputIngredientsRef, this.inputDirectionsRef])}
                    >Save</Button>

                    <CancelDialogButton
                        hideDialog={this.props.hideDialog} />
                </DialogActions>
            </div>
        );
    }
}