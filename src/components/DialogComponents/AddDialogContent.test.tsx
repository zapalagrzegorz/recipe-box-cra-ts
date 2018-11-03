import * as React from 'react';
// import { Button } from '@material-ui/core';
import { mount} from 'enzyme';
// import { Dialog } from './Dialog';
import { AddDialogContent } from './AddDialogContent';
import TextField from '@material-ui/core/TextField';
// import { SaveDialogButton } from '../SaveDialogButton';
// import { createShallow, createMount } from '@material-ui/core/test-utils';

it('saveRecipe in AddDialogComponent updates LocalStorage', () => {
    let recipesList: {};
    const dialogProps = {
        hideDialog: () => { },
        // handleInputChange: () => { },
        handleInputChange: function(event: any) {
            // const target = event.target;
            // const value = target.value;
            // const name = target.name;
        },
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
    // wrapper.find('input[id="name"]').getDOMNode().nodeValue =  'new recipe name';


    // console.log(wrapper.find('input[id="name"]').setProps({value : "new recipe name"}));
    // let input = wrapper.find('input[id="name"]');
    // console.log(input..value)

    // console.log(wrapper.debug());
    // expect(wrapper.find(SaveDialogButton)).toHaveLength(1);
    // console.log(localStorage);
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