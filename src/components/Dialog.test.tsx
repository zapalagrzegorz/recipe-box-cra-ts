import * as React from 'react';
// import { Button } from '@material-ui/core';
import { shallow, mount, 
    // render 
} from 'enzyme';
import { Dialog } from './Dialog';
import { AddDialogContent } from './DialogComponents/AddDialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import TextField from '@material-ui/core/TextField';
// import { CancelDialogButton } from './DialogComponents/CancelDialogButton';
import { SaveDialogButton } from './SaveDialogButton';
import { createShallow, 
    // createMount 
} from '@material-ui/core/test-utils';

// dialogType: string,
//     oldRecipeName: string,
//     oldRecipeIngredients: string,
//     oldRecipeDirections: string,
//     hideDialog() : void,
//     updateRecipesList() : void,
//     recipesList: object,
//     recipeKey : string,
//     isModalOpen: boolean,



it('passed props to Dialog', () => {
    const dialogProps = {
        dialogType: 'add',
        oldRecipeName: '',
        oldRecipeIngredients: '',
        oldRecipeDirections: '',
        hideDialog: () => { },
        updateRecipesList: () => { },
        recipesList: {},
        recipeKey: '',
        isModalOpen: true,
    }
    const dialog = mount(<Dialog {...dialogProps} />);
    expect(dialog.find(Dialog)).toHaveLength(1);
    expect(dialog.find(Dialog).prop('dialogType')).toBe('add');
    dialog.unmount();
    // console.log(dialog.debug());
    // expect(dialog.props() ('dialogType')).toBe('add');
});

it('has AddDialogContent component', () => {
    const dialogProps = {
        dialogType: 'add',
        oldRecipeName: '',
        oldRecipeIngredients: '',
        oldRecipeDirections: '',
        hideDialog: () => { },
        updateRecipesList: () => { },
        recipesList: {},
        recipeKey: '',
        isModalOpen: true,
    }
    // let mount = createMount();
    
    const wrapper = mount((<Dialog {...dialogProps} />));
    // console.log(dialog.debug());
    // wrapper.instance();
    // console.log(wrapper.state());
    expect(wrapper.find(AddDialogContent)).toHaveLength(1);
    expect(wrapper.find(SaveDialogButton)).toHaveLength(1);
    // console.log(dialog.find('input').length); // -> inputów 0
    // console.log(dialog.debug());
    // console.log(dialog.html()); -> null
    // expect(dialog.find(AddDialogContent)).toHaveLength(1);
});


// it('passed props to Dialog', () => {

// });

// describe('testing shallow MUI', () => {
//     // let shallow;

//     // beforeEach(() => {

//     // });

//     const dialogProps = {
//         dialogType: 'add',
//         oldRecipeName: null,
//         oldRecipeIngredients: null,
//         oldRecipeDirections: null,
//         hideDialog: () => { },
//         updateRecipesList: () => { },
//         recipesList: {},
//         recipeKey: null,
//         isModalOpen: true,
//     }

    // const dialogCommon = shallow(<Dialog {...dialogProps} />);
    // console.log('common:\n :'+ dialogCommon.debug());

    // let shallow = createShallow();
    // const dialog = createShallow(shallow, {dive:true})(<Dialog {...dialogProps} />);
    // console.log(dialog.debug());
    //tutaj bez różnicy
// });

    // expect(listRecipes.find('#addRecipeButton')).toHaveLength(1);
    // expect(listRecipes.state('isModalOpen')).toBeFalsy();

    // listRecipes.find('#addRecipeButton').simulate('click');
    // expect(listRecipes.state('isModalOpen')).toBeTruthy();
    // expect(listRecipes.find(Dialog)).toHaveLength(1);

