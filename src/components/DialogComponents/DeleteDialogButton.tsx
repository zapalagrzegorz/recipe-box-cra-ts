
import * as React from 'react';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

/* nadpisywanie styli dla MUI */
const styles = (theme: any) => ({
    button: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
});

const DeleteDialogButtonUnstyled = (props : any) => {
    const { classes } = props;
    return (
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        type="button"
        onClick={props.deleteRecipe}
        >I DO WANT TO IRREVERSIBLE DELETE RECIPE</Button>
    );
}

export let DeleteDialogButton = withStyles(styles)(DeleteDialogButtonUnstyled);

