import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { CancelDialogButton } from './CancelDialogButton';
import { IDialogContentState } from './AddDialogContent';
import { PropTypes, Button } from '@material-ui/core/index';

interface IEditDialogProps {
    recipeName: string,
    dialogIngredients: string,
    directions: string,
    hideDialog: any,
    saveRecipe: Function
}

export class EditDialogContent extends React.Component<IEditDialogProps, IDialogContentState> {
    constructor(props: IEditDialogProps) {
        super(props);
        this.state = {
            changedRecipeName: this.props.recipeName,
            changedIngredients: this.props.dialogIngredients,
            changedDirections: this.props.directions
        }
    }
    // todo set it outside
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