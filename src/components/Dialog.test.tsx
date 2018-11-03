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
        saveRecipe: function() {

            // JSON.parse(JSON.stringify(x)) zwraca deep cloned object
            let recipesList = JSON.parse(JSON.stringify(this.recipesList));
            // const { changedIngredients, changedRecipeName, changedDirections } = this.state;
            // const { oldRecipeName, oldRecipeIngredients, oldRecipeDirections, recipeKey } = this.props
    
            let newRecipe = { name: "", ingredients: "", directions: "" };
    
            recipesList[newRecipe.name] = newRecipe;
    
    
            localStorage.setItem('recipesList', JSON.stringify(recipesList));
    
        },
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
    let recipesList: {};
    // function handleInputChange(event: any) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    // }
    const dialogProps = {
        hideDialog: () => { },
        handleInputChange: () => { },

        saveRecipe: function() {
            // recipesList = JSON.parse(JSON.stringify(recipesList));
            let newRecipe = { name: "", ingredients: "", directions: "" };    
            recipesList[newRecipe.name] = newRecipe;
            localStorage.setItem('recipesList', JSON.stringify(recipesList));
        },
    }
    
    const wrapper = mount((<AddDialogContent {...dialogProps} />));
    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find('Input[id="name"]')).toHaveLength(1);

    // wrapper.find('input[id="name"]').simulate('change', {currentTarget: {value: 'new recipe name'}});
    wrapper.find('input[id="name"]').getDOMNode().nodeValue =  'new recipe name';


    console.log(wrapper.find('input[id="name"]').setProps({value : "new recipe name"}));
    // let input = wrapper.find('input[id="name"]');
    // console.log(input..value)

    // console.log(wrapper.debug());
    expect(wrapper.find(SaveDialogButton)).toHaveLength(1);
    console.log(localStorage);
    // wrapper.find(SaveDialogButton).simulate('click');

    // tslint:disable-line
    // expect(wrapper.find('input[id="name"]').props().value).toContain('new recipe name');
    // expect(wrapper.find('input[id="name"]').value).toContain('new recipe name');

    // wrapper.find('#name[name="changedRecipeName"]').le
    // simulate('change', {target: {value: 'new recipe name'}});
    // console.log(dialog.debug());
    // wrapper.instance();
    // console.log(wrapper.state());
    // expect(wrapper.find(AddDialogContent)).toHaveLength(1);
    // console.log(dialog.find('input').length); // -> inputów 0
    // console.log(dialog.debug());
    // console.log(dialog.html()); -> null
    // expect(dialog.find(AddDialogContent)).toHaveLength(1);
});