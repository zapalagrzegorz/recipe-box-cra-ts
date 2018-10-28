// import * as React from 'react';
// import { Button } from '@material-ui/core';
// import { shallow} from 'enzyme';
// import { Dialog } from './Dialog';
// import { AddDialogContent } from './AddDialogContent';
// import { createShallow, createMount } from '@material-ui/core/test-utils';

// dialogType: string,
//     oldRecipeName: string,
//     oldRecipeIngredients: string,
//     oldRecipeDirections: string,
//     hideDialog() : void,
//     updateRecipesList() : void,
//     recipesList: object,
//     recipeKey : string,
//     isModalOpen: boolean,



// it('passed props to Dialog', () => {
    // const dialogProps = {
    //     dialogType: 'add',
    //     oldRecipeName: null,
    //     oldRecipeIngredients: null,
    //     oldRecipeDirections: null,
    //     hideDialog: () => { },
    //     updateRecipesList: () => { },
    //     recipesList: {},
    //     recipeKey: null,
    //     isModalOpen: true,
    // }
    // const AddDialogProps = { hideDialog: ()=>{} , handleInputChange: ()=>{}, saveRecipe: ()=>{} }
    // const addDialogContent = shallow(<AddDialogContent {...AddDialogProps} />);
    // expect(dialog.find(Dialog)).toHaveLength(1);
    // expect(dialog.find(Dialog).prop('dialogType')).toBe('add');

    // console.log(dialog.debug());
    // expect(dialog.props() ('dialogType')).toBe('add');
// });