import * as React from 'react';
import ListRecipes from './ListRecipes'
import Recipe from './Recipe';
import { Button } from '@material-ui/core';
import { shallow } from 'enzyme';
import { Dialog } from './Dialog';

// testy propsów/state

it('includes Button element', () => {
    const listRecipes = shallow(<ListRecipes />);
    expect(listRecipes.find(Button)).toHaveLength(1);
});

it('shows three <Recipe>\'s', () => {
    const listRecipes = shallow(<ListRecipes />);
    expect(listRecipes.find(Recipe)).toHaveLength(3);
});

it('it handles state change - show 10 <Recipe>\'s', () => {
    let recipesListElements :JSX.Element[] = [];
    
    for(let i = 0; i < 10; i++) {
        recipesListElements.push(<Recipe
            key={Math.random()}
            title='title'
            ingredients='ingredients'
            directions='directions'
            onButtonEditClick={(e: any) => {} }
            onButtonDeleteClick={(e: any) => {}}
        />);
    }


    const listRecipes = shallow(<ListRecipes />);
    listRecipes.setState({recipesListElements})
    expect(listRecipes.find(Recipe)).toHaveLength(10);
});


// test przeszedł 11:56, 27.10.2018 r.
it('handles "Add recipe Button"', ()=>{
    const listRecipes = shallow(<ListRecipes />);
    expect(listRecipes.find('#addRecipeButton')).toHaveLength(1);
    expect(listRecipes.state('isModalOpen')).toBeFalsy();
    
    listRecipes.find('#addRecipeButton').simulate('click');
    expect(listRecipes.state('isModalOpen')).toBeTruthy();
    expect(listRecipes.find(Dialog)).toHaveLength(1);

})

