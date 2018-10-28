import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Recipe from './Recipe';

// describe('Recipe tests', ()=>{

// test przeszedł 11:51, 27.10.2018 r.
it('includes renders Recipe component with props', () => {
    const recipeProps = {
        title: 'recipe',
        directions: 'some directions',
        ingredients: 'some ingredients',
        onButtonDeleteClick: (e: any) => { },
        onButtonEditClick: (e: any) => { },
    }
    const recipe = shallow(<Recipe {...recipeProps} />);
    // console.log(recipe.debug());
    // console.log(recipe.instance().props);
    // expect(recipe.props()).toContain('ingredients');
    expect(recipe.prop('ingredients')).toEqual('some ingredients');
    expect(recipe.prop('directions')).toEqual('some directions');

});

// test przeszedł 11:53, 27.10.2018 r.
it('includes renders Recipe component with props', () => {
    const recipeProps = {
        title: 'recipe',
        ingredients: 'some ingredients',
        directions: 'some directions',
        onButtonDeleteClick: (e: any) => { },
        onButtonEditClick: (e: any) => { },
    }
    const recipeMounted = mount(<Recipe {...recipeProps} />);
    // console.log(recipe.html());
    expect(recipeMounted.containsMatchingElement(<p className='preLine'>some directions</p>)).toEqual(true)
    expect(recipeMounted.containsMatchingElement(<p>some ingredients</p>)).toEqual(true)
});


