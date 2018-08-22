

import * as React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

/* nadpisywanie styli dla MUI */
const styles = (theme : any)  => ({
    button: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
    },
});

export const CancelDialogButtonUnstyled = (props: any) => {
    const { classes, hideDialog } = props;
    return (
        <Button
            variant="contained"
            type="button"
            className={classes.button}
            onClick={hideDialog}
        >Cancel</Button>
    );
}

export let CancelDialogButton = withStyles(styles)(CancelDialogButtonUnstyled);