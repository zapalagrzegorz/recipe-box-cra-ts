import * as React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: any) => ({
    button: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
});

class SaveDialogButtonUnstyled extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { saveRecipe, classes } = this.props;
        return (
            <Button
                variant="contained"
                type="button"
                color="primary"
                className={classes.button}
                onClick={saveRecipe}
            >Save</Button>
        );
    }
}

export let SaveDialogButton = withStyles(styles)(SaveDialogButtonUnstyled);

