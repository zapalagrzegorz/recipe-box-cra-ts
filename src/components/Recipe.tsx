/// <reference path="./interfaces.d.ts" />

import * as React from 'react';

/* material ui */
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

interface IRecipeProps {
    title: string,
    ingredients: string,
    directions: string,
    onButtonEditClick(event: any) : void
    onButtonDeleteClick(event: any) : void,
    classes? : any
}

const styles = (theme: any) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

function RecipeUnstyled(props: IRecipeProps) {
    const { classes } = props;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
             expandIcon={<ExpandMoreIcon />}
             >
                <Typography className={classes.heading}>{props.title} </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
                    <p className='strong'>Ingredients:</p>
                    <p>{props.ingredients}</p>
                    <p className='strong' style={{}}>Directions:</p>
                    <p className='preLine'>{props.directions}</p>
                    <Button 
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={props.onButtonEditClick}
                    >
                        <Typography variant="button"> Edit </Typography>
                        <EditIcon />
                    </Button>
                    <Button variant="outlined"
                        color="secondary"
                        className={classes.button}
                        onClick={props.onButtonDeleteClick}
                    >
                        <Typography variant="button"> Delete </Typography>
                        <DeleteForeverIcon />
                    </Button>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default withStyles(styles)(RecipeUnstyled);


