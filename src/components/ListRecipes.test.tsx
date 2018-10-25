import * as React from 'react';
import ListRecipes from './ListRecipes'
import Recipe from './Recipe';
import { Button } from '@material-ui/core';
import { shallow } from 'enzyme';


it('includes Button element', () => {
    const listRecipes = shallow(<ListRecipes />);
    expect(listRecipes.find(Button)).toHaveLength(1);
});

it('shows three <Recipe>\'s', () => {
    const listRecipes = shallow(<ListRecipes />);
    expect(listRecipes.find(Recipe)).toHaveLength(3);
});
