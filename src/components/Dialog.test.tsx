import * as React from 'react';
// import { Button } from '@material-ui/core';
import { mount, 
    // render 
} from 'enzyme';
import { Dialog } from './Dialog';
import { AddDialogContent } from './DialogComponents/AddDialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
// import { CancelDialogButton } from './DialogComponents/CancelDialogButton';
import { SaveDialogButton } from './SaveDialogButton';
/* import { createShallow, 
    // createMount 
} from '@material-ui/core/test-utils';
 */
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

it('saveRecipe in AddDialogComponent updates LocalStorage', () => {
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
    
    const wrapper = mount((<Dialog {...dialogProps} />));
    expect(wrapper.find(AddDialogContent)).toHaveLength(1);
    expect(wrapper.find(SaveDialogButton)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find('Input[id="name"]')).toHaveLength(1);
    
    /** 
    * inputy są  niekontrolowane. Ale też nie można ręcznie podmienić wartości.
    * Ponieważ metoda OnChange zmieniała stan komponentu rodzica, to po prostu ręcznie zmieniam ten stan
    **/
    // wrapper.find('input[id="name"]').simulate('input', {currentTarget: {value: 'new recipe name'}});
    wrapper.setState({changedRecipeName: "new recipe name"});
    
    wrapper.find(SaveDialogButton).simulate('click');

    expect(JSON.parse(localStorage.getItem("recipesList")!))
        .toMatchObject({"new recipe name": {"name":"new recipe name","ingredients":"","directions":""}});
});