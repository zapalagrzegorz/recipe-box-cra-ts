import * as React from 'react';
// import { Button } from '@material-ui/core';
import {
    mount,
    // render 
} from 'enzyme';
import { Dialog, IDialogProps } from './Dialog';
import { AddDialogContent } from './DialogComponents/AddDialogContent';
import { EditDialogContent } from './DialogComponents/EditDialogContent';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
// import { CancelDialogButton } from './DialogComponents/CancelDialogButton';
// import { SaveDialogButton } from './SaveDialogButton';
/* import { createShallow, 
    // createMount 
} from '@material-ui/core/test-utils';
 */




it('passed props to Dialog', () => {
    const dialogProps : IDialogProps = {
        dialogType: 'add',
        currentName: '',
        currentIngredients: '',
        currentDirections: '',
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
    const dialogProps : IDialogProps = {
        dialogType: 'add',
        currentName: '',
        currentIngredients: '',
        currentDirections: '',
        hideDialog: () => { },
        updateRecipesList: () => { },
        recipesList: {},
        recipeKey: '',
        isModalOpen: true,
    }

    const wrapper = mount((<Dialog {...dialogProps} />));
    expect(wrapper.find(Dialog)).toHaveLength(1);
    expect(wrapper.find(AddDialogContent)).toHaveLength(1);
    expect(wrapper.find('Button#addDialogContentSave')).toHaveLength(1);
    wrapper.unmount();
});

it('saves recipe via add modal window in Local Storage ', () => {
    const dialogProps = {
        dialogType: 'add',
        currentName: '',
        currentIngredients: '',
        currentDirections: '',
        hideDialog: () => { },
        updateRecipesList: () => { },
        recipesList: {},
        recipeKey: '',
        isModalOpen: true,
    }

    const wrapper = mount((<Dialog {...dialogProps} />));
    expect(wrapper.find(AddDialogContent)).toHaveLength(1);
    expect(wrapper.find('Button#addDialogContentSave')).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find('input[name="changedRecipeName"]')).toHaveLength(1);

    /** 
    * obsługa change/input przysparza wielu problemów
    **/
    wrapper.find('input[name="changedRecipeName"]').simulate('change',
        {
            target:
            {
                value: 'new recipe name',
                name: 'changedName'
            }
        }
    );
    // const addDialogContent = wrapper.find(AddDialogContent);
    // console.log(addDialogContent.state());

    wrapper.find('Button#addDialogContentSave').simulate('click');

    expect(JSON.parse(localStorage.getItem("recipesList")!))
        .toMatchObject({ "new recipe name": { "name": "new recipe name", "ingredients": "", "directions": "" } });
    wrapper.unmount();
});

it('updates recipe via edit modal window in Local Storage', () => {
    const dialogProps : IDialogProps = {
        dialogType: 'edit',
        currentName: 'testowy',
        currentIngredients: 'składniki testowe',
        currentDirections: 'polecenia testowe',
        hideDialog: () => { },
        updateRecipesList: () => { },
        recipesList: {},
        recipeKey: '',
        isModalOpen: true,
    }

    const wrapper = mount((<Dialog {...dialogProps} />));
    expect(wrapper.find(EditDialogContent)).toHaveLength(1);
    expect(wrapper.find('Button#editDialogContentSave')).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(3);
    expect(wrapper.find('input[name="changedRecipeName"]')).toHaveLength(1);

    /** 
    * obsługa change/input przysparza wielu problemów
    **/
    wrapper.find('input[name="changedRecipeName"]').simulate('change',
        {
            target:
            {
                value: 'new recipe name',
                name: 'changedName'
            }
        }
    );
    const editDialogContent = wrapper.find(EditDialogContent);
    console.log(editDialogContent.state());

    wrapper.find('Button#editDialogContentSave').simulate('click');

    expect(JSON.parse(localStorage.getItem("recipesList")!))
        .toMatchObject({
            "new recipe name":
            {
                "name": "new recipe name",
                "ingredients": "składniki testowe",
                "directions": "polecenia testowe"
            }
        });

    wrapper.unmount();
});